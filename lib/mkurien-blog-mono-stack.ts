import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
import { LikeCounter } from './likecounter';

export class MkurienBlogMonoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const likeCounter = new LikeCounter(this, 'LikeCounter', {
    });

    const api_mkurien_dot_com = 'api.mkurien.com';
    const certForMkuriencom = new acm.Certificate(this, "cert-mkurien.com", {
      domainName: api_mkurien_dot_com,
    });
    // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-apigateway-readme.html
    const api = new apigw.RestApi(this, api_mkurien_dot_com, {
      domainName: {
        domainName: api_mkurien_dot_com,
        certificate: certForMkuriencom
      }
    });
    api.root.addMethod('ANY');
    const likes = api.root.addResource('likes');
    likes.addMethod('GET', new apigw.LambdaIntegration(likeCounter.getLikesHandler));
    likes.addMethod('POST', new apigw.LambdaIntegration(likeCounter.incrementLikesHandler));
  }
}
