import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import { Construct } from '@aws-cdk/core';

export interface ApiWithDomainProps {
    domainName: string
}

export class ApiWithDomain extends Construct  {

    public api: apigw.RestApi;

    constructor(scope: cdk.Construct, id: string, props: ApiWithDomainProps) {
        super(scope, id);
        const domainName = props.domainName;

        const cert = new acm.Certificate(this, `cert.${domainName}`, {
            domainName: domainName,
        });

        const hostedZone = new route53.PublicHostedZone(this, `hostedZone.${domainName}`, {
            zoneName: domainName
        });

        new route53.ARecord(this, `a-record.${domainName}`, {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias({
                bind() {
                    return {
                        dnsName: domainName, // Specify the applicable domain name for your API.,
                        hostedZoneId: hostedZone.hostedZoneId, // Specify the hosted zone ID for your API.
                    };
                },
            })
        });

        // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-apigateway-readme.html
        this.api = new apigw.RestApi(this, domainName, {
            domainName: {
                domainName: domainName,
                certificate: cert
            }
        });
    }
}