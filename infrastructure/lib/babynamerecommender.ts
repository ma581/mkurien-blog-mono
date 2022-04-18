import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import * as s3 from '@aws-cdk/aws-s3';

export interface BabyNameRecommenderProps {
    api: apigw.RestApi
}

export class BabyNameRecommender extends cdk.Construct {
    public readonly getRecommendationsHandler: lambda.Function;
    private readonly clusteredNamesBucket: s3.Bucket;

    constructor(scope: cdk.Construct, id: string, props: BabyNameRecommenderProps) {
        super(scope, id);

        this.clusteredNamesBucket = new s3.Bucket(this, 'ClusteredNamesBucket', {
            publicReadAccess: false,
        });

        this.getRecommendationsHandler = new lambda.DockerImageFunction(this, 'GetRecommendationsHandler', {
            code: lambda.DockerImageCode.fromImageAsset('lambda/babynamesrecommendations'),
            memorySize: 4096,
            timeout: cdk.Duration.seconds(15),
            environment: {'BUCKET_NAME': this.clusteredNamesBucket.bucketName}
        });

        //Add REST endpoints with Lamdas
        const babyNameRecommendations = props.api.root.addResource('babyNameRecommendations');
        babyNameRecommendations.addMethod('GET', new apigw.LambdaIntegration(this.getRecommendationsHandler));

        // grant the lambda role read permissions
        this.clusteredNamesBucket.grantRead(this.getRecommendationsHandler);

        // populate bucket
        new s3deploy.BucketDeployment(this, 'DeployNames', {
            sources: [s3deploy.Source.asset('data/')],
            destinationBucket: this.clusteredNamesBucket,
        });
    }
}