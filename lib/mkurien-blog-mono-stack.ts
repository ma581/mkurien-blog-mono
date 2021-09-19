import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import { LikeCounter } from './likecounter';
import { ApiWithDomain } from './api';

export class MkurienBlogMonoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const rootDomain = 'mkurien.com';
    const apiDomainName = `api.${rootDomain}`;
    const frontEnd = `https://www.${rootDomain}`;

    const likeCounter = new LikeCounter(this, 'LikeCounter', {
      corsAllowOrigin: frontEnd
    });

    const apiConstruct = new ApiWithDomain(this, "api", {
      apiSubDomainName: apiDomainName,
      corsAllowList: [frontEnd]
    })
    const api = apiConstruct.api

    api.root.addMethod('ANY');
    // api.domainName?.addBasePathMapping
    const likes = api.root.addResource('likes');
    likes.addMethod('GET', new apigw.LambdaIntegration(likeCounter.getLikesHandler));
    likes.addMethod('POST', new apigw.LambdaIntegration(likeCounter.incrementLikesHandler));
  }
}
