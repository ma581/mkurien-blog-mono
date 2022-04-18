import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export interface BabyNameRecommenderProps {
    api: apigw.RestApi
}

export class BabyNameRecommender extends cdk.Construct {
    public readonly getRecommendationsHandler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props: BabyNameRecommenderProps) {
        super(scope, id);

        this.getRecommendationsHandler = new lambda.DockerImageFunction(this, 'GetRecommendationsHandler', {
            code: lambda.DockerImageCode.fromImageAsset('lambda/babynamesrecommendations'),
            memorySize: 4096,
            timeout: cdk.Duration.seconds(15)
        });

        //Add REST endpoints with Lamdas
        const babyNameRecommendations = props.api.root.addResource('babyNameRecommendations');
        babyNameRecommendations.addMethod('GET', new apigw.LambdaIntegration(this.getRecommendationsHandler));
    }
}