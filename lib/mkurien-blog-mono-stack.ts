import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { LikeCounter } from './likecounter';
import { ApiWithDomain } from './api';

export class MkurienBlogMonoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const likeCounter = new LikeCounter(this, 'LikeCounter', {
    });

    const apiDomainName = 'api.mkurien.com';

    const apiConstruct = new ApiWithDomain(this, "api", {
      domainName: apiDomainName
    })
    const api = apiConstruct.api

    api.root.addMethod('ANY');
    // api.domainName?.addBasePathMapping
    const likes = api.root.addResource('likes');
    likes.addMethod('GET', new apigw.LambdaIntegration(likeCounter.getLikesHandler));
    likes.addMethod('POST', new apigw.LambdaIntegration(likeCounter.incrementLikesHandler));
  }
}
