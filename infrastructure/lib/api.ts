import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from "@aws-cdk/aws-route53-targets";
import { Construct } from '@aws-cdk/core';

export interface ApiWithDomainProps {
    apiSubDomainName: string
    corsAllowList: string[]
}

export class ApiWithDomain extends Construct {

    public api: apigw.RestApi;

    constructor(scope: cdk.Construct, id: string, props: ApiWithDomainProps) {
        super(scope, id);
        const domainName = props.apiSubDomainName;

        const cert = new acm.Certificate(this, `cert.${domainName}`, {
            domainName: domainName,
        });

        const hostedZone = new route53.PublicHostedZone(this, `hostedZone.${domainName}`, {
            zoneName: domainName
        });

        // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-apigateway-readme.html
        this.api = new apigw.RestApi(this, domainName, {
            domainName: {
                domainName: domainName,
                certificate: cert
            },
            defaultCorsPreflightOptions: {
                allowOrigins: props.corsAllowList,
                allowMethods: apigw.Cors.ALL_METHODS
            },
            deployOptions: {
                // Throttling for default methods
                methodOptions: {'/*/*': {
                    throttlingBurstLimit: 5,
                    throttlingRateLimit: 2,
                  }
                }
            },
        });

        new route53.ARecord(this, "apiDNS", {
            zone: hostedZone,
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(
                new route53Targets.ApiGateway(this.api)
            ),
        });
        // https://docs.aws.amazon.com/cdk/api/v1/docs/aws-apigateway-readme.html#rate-limited-api-key
        // https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.ThrottleSettings.html
    //     const plan = this.api.addUsagePlan('UsagePlan', {
    //         name: 'Easy',
    //         throttle: {
    //           rateLimit: 2,
    //           burstLimit: 5
    //         }
    //       });

    //       plan.addApiStage({
    //         stage: this.api.deploymentStage,
    //         throttle: [
    //           {
    //             method: echoMethod,
    //             throttle: {
    //               rateLimit: 10,
    //               burstLimit: 2
    //             }
    //           }
    //         ]
    //       });
    }
}