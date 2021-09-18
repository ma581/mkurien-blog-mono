import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { LikeCounter } from './likecounter';

export class MkurienBlogMonoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const likeCounter = new LikeCounter(this, 'LikeCounter', {
    });

    const backendGateway = new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: likeCounter.incrementLikesHandler
    });
  }
}
