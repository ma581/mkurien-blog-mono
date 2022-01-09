import * as cdk from '@aws-cdk/core';
import { LikeCounter } from './likecounter';
import { ApiWithDomain } from './api';
import { Feedback } from './feedback';
import { WafConstruct } from './waf';
import { StaticSite } from './static-site';

export class MkurienBlogMonoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const rootDomain = 'mkurien.com';
    const apiDomainName = `api.${rootDomain}`;
    const frontEnd = `https://www.${rootDomain}`;
    const corsAllowList = [frontEnd, `https://www.dev.${rootDomain}`] //add 'http://localhost:3000' for local testing
    const apiConstruct = new ApiWithDomain(this, "api", {
      apiSubDomainName: apiDomainName,
      corsAllowList: corsAllowList 
    })
    const api = apiConstruct.api
    api.root.addMethod('ANY');

    new LikeCounter(this, 'LikeCounter', {
      api: api
    });

    new Feedback(this, 'Feedback', api);

    const apiARN = `arn:aws:apigateway:${this.region}::/restapis/${api.restApiId}/stages/${api.deploymentStage.stageName}`
    new WafConstruct(this, 'Waf', {gatewayARN: apiARN})

    const blah = new StaticSite(this, "mkurien-blog-frontend-static-web");
  }

}
