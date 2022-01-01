import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from "@aws-cdk/aws-route53-targets";

export class StaticSite extends cdk.Construct {

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            websiteIndexDocument: 'index.html',
            publicReadAccess: true,
        });

        new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3Deployment.Source.asset('./frontend/out')],
            destinationBucket: websiteBucket,
        });

        const domainName = 'dev.mkurien.com';

        const hostedZone = new route53.PublicHostedZone(this, `hostedZone.${domainName}`, {
            zoneName: domainName
        });

        // https://docs.aws.amazon.com/cdk/api/v1/docs/aws-cloudfront-readme.html
        // CloudFront distributions deliver your content from one or more origins; 
        // an origin is the location where you store the original version of your content. 
        // Origins can be created from S3 buckets or a custom origin (HTTP server).

        const myCertificate = new acm.DnsValidatedCertificate(this, 'mySiteCert', {
            domainName,
            region: 'us-east-1',
            hostedZone
        });

        const distribution = new cloudfront.Distribution(this, 'myDist', {
            defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
            domainNames: [domainName],
            certificate: myCertificate,
        });

        // Route53 alias record for the CloudFront distribution
        new route53.ARecord(this, "SiteAliasRecord", {
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(
                new route53Targets.CloudFrontTarget(distribution)
            ),
            zone: hostedZone,
        });
    }
}