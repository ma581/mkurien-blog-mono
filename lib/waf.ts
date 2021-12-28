import * as cdk from '@aws-cdk/core';
import * as waf from "@aws-cdk/aws-wafv2";

export interface WafConstructProps extends cdk.StackProps{
  gatewayARN: string
}
// https://github.com/cdk-patterns/serverless/blob/main/the-waf-apigateway/typescript/lib/the-waf-stack.ts
export class WafConstruct extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: WafConstructProps) {
    super(scope, id);

    const wafRules:Array<waf.CfnWebACL.RuleProperty>  = [];
    
    const awsCommonRuleSet:waf.CfnWebACL.RuleProperty  = {
      name: 'AWS-AWSManagedRulesCommonRuleSet',
      priority: 1,
      overrideAction: {none: {}},
      statement: {
        managedRuleGroupStatement: {
          name: 'AWSManagedRulesCommonRuleSet',
          vendorName: 'AWS',
        }
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'awsCommonRules',
        sampledRequestsEnabled: true
      }
    };
    wafRules.push(awsCommonRuleSet);
    
    const awsBotRuleSet:waf.CfnWebACL.RuleProperty  = {
      name: 'awsBotRuleSet',
      priority: 3,
      overrideAction: {none: {}},
      statement: {
        managedRuleGroupStatement: {
          name: 'AWSManagedRulesBotControlRuleSet',
          vendorName: 'AWS',
        }
      },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'awsReputation',
        sampledRequestsEnabled: true
      }
    };
    wafRules.push(awsBotRuleSet);

    // Create our Web ACL
    const webACL = new waf.CfnWebACL(this, 'WebACL', {
      defaultAction: {
        allow: {}
      },
      scope: 'REGIONAL',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'webACL',
        sampledRequestsEnabled: true
      },
      rules: wafRules
    });

    // Associate with our gateway
    new waf.CfnWebACLAssociation(this, 'WebACLAssociation', {
      webAclArn: webACL.attrArn,
      resourceArn: props.gatewayARN
    })
  }
}