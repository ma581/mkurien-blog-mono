import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { LikeCounter } from './likecounter';

export class MkurienBlogMonoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const likeCounter = new LikeCounter(this, 'LikeCounter', {
    });

    const api = new apigw.RestApi(this, 'blog-api');
    api.root.addMethod('ANY');

    const likes = api.root.addResource('likes');
    likes.addMethod('GET',  new apigw.LambdaIntegration(likeCounter.getLikesHandler));
    likes.addMethod('POST', new apigw.LambdaIntegration(likeCounter.incrementLikesHandler));  }
}
