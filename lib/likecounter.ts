import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export interface LikeCounterProps {
}

export class LikeCounter extends cdk.Construct {

    /** allows accessing the counter function */
    public readonly incrementLikesHandler: lambda.Function;
    public readonly getLikesHandler: lambda.Function;

    constructor(scope: cdk.Construct, id: string, props: LikeCounterProps) {
        super(scope, id);

        const table = new dynamodb.Table(this, 'Likes', {
            partitionKey: { name: 'articleId', type: dynamodb.AttributeType.NUMBER },

        });

        this.getLikesHandler = new lambda.Function(this, 'GetLikesHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'getLikes.handler',
            environment: {
                LIKES_TABLE_NAME: table.tableName
            }
        });


        this.incrementLikesHandler = new lambda.Function(this, 'LikeCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'likecounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: this.getLikesHandler.functionName,
                LIKES_TABLE_NAME: table.tableName
            }
        });

        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.getLikesHandler);
        table.grantReadWriteData(this.incrementLikesHandler);

        // grant the lambda role invoke permissions to the downstream function
        this.getLikesHandler.grantInvoke(this.incrementLikesHandler);
    }
}