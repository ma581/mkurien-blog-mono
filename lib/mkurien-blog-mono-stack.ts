import * as cdk from '@aws-cdk/core';
import { LikeCounter } from './likecounter';
import { ApiWithDomain } from './api';
import { Feedback } from './feedback';

export class MkurienBlogMonoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const rootDomain = 'mkurien.com';
    const apiDomainName = `api.${rootDomain}`;
    const frontEnd = `https://www.${rootDomain}`;

    const apiConstruct = new ApiWithDomain(this, "api", {
      apiSubDomainName: apiDomainName,
      corsAllowList: [frontEnd]
    })
    const api = apiConstruct.api
    api.root.addMethod('ANY');

    const likeCounter = new LikeCounter(this, 'LikeCounter', {
      corsAllowOrigin: frontEnd,
      api: api
    });

    const feedback = new Feedback(this, 'Feedback', api);
  }
}
