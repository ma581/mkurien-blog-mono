import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';

export class StaticSite extends cdk.Construct {

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            websiteIndexDocument: 'index.html',
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,        
        });

        new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3Deployment.Source.asset('./frontend/out')],
            destinationBucket: websiteBucket,
        });
    }
}