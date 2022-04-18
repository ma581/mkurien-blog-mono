import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';

export interface BabyNameRecommenderProps {
    api: apigw.RestApi
}

export class BabyNameRecommender extends cdk.Construct {
    public readonly getRecommendationsHandler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props: BabyNameRecommenderProps) {
        super(scope, id);

        this.getRecommendationsHandler = new lambda.Function(this, 'GetRecommendationsHandler', {
            runtime: lambda.Runtime.PYTHON_3_9,
            code: lambda.Code.fromAsset('lambda/babynamesrecommendations'),
            handler: 'getRecommendations.lambda_handler',
        });

        //Add REST endpoints with Lamdas
        const babyNameRecommendations = props.api.root.addResource('babyNameRecommendations');
        babyNameRecommendations.addMethod('GET', new apigw.LambdaIntegration(this.getRecommendationsHandler));
    }
}