import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';


export class Feedback extends cdk.Construct {
    createFeedback: lambda.Function;

    constructor(scope: cdk.Construct, id: string, api: apigw.RestApi) {
        super(scope, id);

        const table = new dynamodb.Table(this, 'Feedback', {
            partitionKey: { name: 'feedbackId', type: dynamodb.AttributeType.NUMBER},
            sortKey: {name: 'articleId', type: dynamodb.AttributeType.NUMBER}
        });
        
        this.createFeedback = new lambda.Function(this, 'FeedbackHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'createFeedback.handler',
            code: lambda.Code.fromAsset('lambda/feedback'),
            environment: {
                FEEDBACK_TABLE_NAME: table.tableName
            }
        });

        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.createFeedback);
    
        // API REST endpoint to trigger lambda
        const feedbackResource = api.root.addResource('feedback');
        feedbackResource.addMethod('PUT', new apigw.LambdaIntegration(this.createFeedback));
    }
}