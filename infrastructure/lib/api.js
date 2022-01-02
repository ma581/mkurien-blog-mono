"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiWithDomain = void 0;
const apigw = require("@aws-cdk/aws-apigateway");
const acm = require("@aws-cdk/aws-certificatemanager");
const route53 = require("@aws-cdk/aws-route53");
const route53Targets = require("@aws-cdk/aws-route53-targets");
const core_1 = require("@aws-cdk/core");
class ApiWithDomain extends core_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const domainName = props.apiSubDomainName;
        const cert = new acm.Certificate(this, `cert.${domainName}`, {
            domainName: domainName,
        });
        const hostedZone = new route53.PublicHostedZone(this, `hostedZone.${domainName}`, {
            zoneName: domainName
        });
        // https://docs.aws.amazon.com/cdk/api/latest/docs/aws-apigateway-readme.html
        this.api = new apigw.RestApi(this, domainName, {
            domainName: {
                domainName: domainName,
                certificate: cert
            },
            defaultCorsPreflightOptions: {
                allowOrigins: props.corsAllowList,
                allowMethods: apigw.Cors.ALL_METHODS
            },
            deployOptions: {
                // Throttling for default methods
                methodOptions: { '/*/*': {
                        throttlingBurstLimit: 5,
                        throttlingRateLimit: 2,
                    }
                }
            },
        });
        new route53.ARecord(this, "apiDNS", {
            zone: hostedZone,
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(this.api)),
        });
        // https://docs.aws.amazon.com/cdk/api/v1/docs/aws-apigateway-readme.html#rate-limited-api-key
        // https://docs.aws.amazon.com/cdk/api/v1/docs/@aws-cdk_aws-apigateway.ThrottleSettings.html
        //     const plan = this.api.addUsagePlan('UsagePlan', {
        //         name: 'Easy',
        //         throttle: {
        //           rateLimit: 2,
        //           burstLimit: 5
        //         }
        //       });
        //       plan.addApiStage({
        //         stage: this.api.deploymentStage,
        //         throttle: [
        //           {
        //             method: echoMethod,
        //             throttle: {
        //               rateLimit: 10,
        //               burstLimit: 2
        //             }
        //           }
        //         ]
        //       });
    }
}
exports.ApiWithDomain = ApiWithDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlEQUFpRDtBQUNqRCx1REFBdUQ7QUFDdkQsZ0RBQWdEO0FBQ2hELCtEQUErRDtBQUMvRCx3Q0FBMEM7QUFPMUMsTUFBYSxhQUFjLFNBQVEsZ0JBQVM7SUFJeEMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUF5QjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUUxQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsVUFBVSxFQUFFLEVBQUU7WUFDekQsVUFBVSxFQUFFLFVBQVU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGNBQWMsVUFBVSxFQUFFLEVBQUU7WUFDOUUsUUFBUSxFQUFFLFVBQVU7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsNkVBQTZFO1FBQzdFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDM0MsVUFBVSxFQUFFO2dCQUNSLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixXQUFXLEVBQUUsSUFBSTthQUNwQjtZQUNELDJCQUEyQixFQUFFO2dCQUN6QixZQUFZLEVBQUUsS0FBSyxDQUFDLGFBQWE7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFDdkM7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsaUNBQWlDO2dCQUNqQyxhQUFhLEVBQUUsRUFBQyxNQUFNLEVBQUU7d0JBQ3BCLG9CQUFvQixFQUFFLENBQUM7d0JBQ3ZCLG1CQUFtQixFQUFFLENBQUM7cUJBQ3ZCO2lCQUNGO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNoQyxJQUFJLEVBQUUsVUFBVTtZQUNoQixVQUFVLEVBQUUsVUFBVTtZQUN0QixNQUFNLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQ2xDLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQzFDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsOEZBQThGO1FBQzlGLDRGQUE0RjtRQUNoRyx3REFBd0Q7UUFDeEQsd0JBQXdCO1FBQ3hCLHNCQUFzQjtRQUN0QiwwQkFBMEI7UUFDMUIsMEJBQTBCO1FBQzFCLFlBQVk7UUFDWixZQUFZO1FBRVosMkJBQTJCO1FBQzNCLDJDQUEyQztRQUMzQyxzQkFBc0I7UUFDdEIsY0FBYztRQUNkLGtDQUFrQztRQUNsQywwQkFBMEI7UUFDMUIsK0JBQStCO1FBQy9CLDhCQUE4QjtRQUM5QixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLFlBQVk7UUFDWixZQUFZO0lBQ1osQ0FBQztDQUNKO0FBbEVELHNDQWtFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIGFjbSBmcm9tICdAYXdzLWNkay9hd3MtY2VydGlmaWNhdGVtYW5hZ2VyJztcbmltcG9ydCAqIGFzIHJvdXRlNTMgZnJvbSAnQGF3cy1jZGsvYXdzLXJvdXRlNTMnO1xuaW1wb3J0ICogYXMgcm91dGU1M1RhcmdldHMgZnJvbSBcIkBhd3MtY2RrL2F3cy1yb3V0ZTUzLXRhcmdldHNcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFwaVdpdGhEb21haW5Qcm9wcyB7XG4gICAgYXBpU3ViRG9tYWluTmFtZTogc3RyaW5nXG4gICAgY29yc0FsbG93TGlzdDogc3RyaW5nW11cbn1cblxuZXhwb3J0IGNsYXNzIEFwaVdpdGhEb21haW4gZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuXG4gICAgcHVibGljIGFwaTogYXBpZ3cuUmVzdEFwaTtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQXBpV2l0aERvbWFpblByb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgICAgIGNvbnN0IGRvbWFpbk5hbWUgPSBwcm9wcy5hcGlTdWJEb21haW5OYW1lO1xuXG4gICAgICAgIGNvbnN0IGNlcnQgPSBuZXcgYWNtLkNlcnRpZmljYXRlKHRoaXMsIGBjZXJ0LiR7ZG9tYWluTmFtZX1gLCB7XG4gICAgICAgICAgICBkb21haW5OYW1lOiBkb21haW5OYW1lLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBob3N0ZWRab25lID0gbmV3IHJvdXRlNTMuUHVibGljSG9zdGVkWm9uZSh0aGlzLCBgaG9zdGVkWm9uZS4ke2RvbWFpbk5hbWV9YCwge1xuICAgICAgICAgICAgem9uZU5hbWU6IGRvbWFpbk5hbWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2Nkay9hcGkvbGF0ZXN0L2RvY3MvYXdzLWFwaWdhdGV3YXktcmVhZG1lLmh0bWxcbiAgICAgICAgdGhpcy5hcGkgPSBuZXcgYXBpZ3cuUmVzdEFwaSh0aGlzLCBkb21haW5OYW1lLCB7XG4gICAgICAgICAgICBkb21haW5OYW1lOiB7XG4gICAgICAgICAgICAgICAgZG9tYWluTmFtZTogZG9tYWluTmFtZSxcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0ZTogY2VydFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGFsbG93T3JpZ2luczogcHJvcHMuY29yc0FsbG93TGlzdCxcbiAgICAgICAgICAgICAgICBhbGxvd01ldGhvZHM6IGFwaWd3LkNvcnMuQUxMX01FVEhPRFNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXBsb3lPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgLy8gVGhyb3R0bGluZyBmb3IgZGVmYXVsdCBtZXRob2RzXG4gICAgICAgICAgICAgICAgbWV0aG9kT3B0aW9uczogeycvKi8qJzoge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdHRsaW5nQnVyc3RMaW1pdDogNSxcbiAgICAgICAgICAgICAgICAgICAgdGhyb3R0bGluZ1JhdGVMaW1pdDogMixcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgcm91dGU1My5BUmVjb3JkKHRoaXMsIFwiYXBpRE5TXCIsIHtcbiAgICAgICAgICAgIHpvbmU6IGhvc3RlZFpvbmUsXG4gICAgICAgICAgICByZWNvcmROYW1lOiBkb21haW5OYW1lLFxuICAgICAgICAgICAgdGFyZ2V0OiByb3V0ZTUzLlJlY29yZFRhcmdldC5mcm9tQWxpYXMoXG4gICAgICAgICAgICAgICAgbmV3IHJvdXRlNTNUYXJnZXRzLkFwaUdhdGV3YXkodGhpcy5hcGkpXG4gICAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2Nkay9hcGkvdjEvZG9jcy9hd3MtYXBpZ2F0ZXdheS1yZWFkbWUuaHRtbCNyYXRlLWxpbWl0ZWQtYXBpLWtleVxuICAgICAgICAvLyBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vY2RrL2FwaS92MS9kb2NzL0Bhd3MtY2RrX2F3cy1hcGlnYXRld2F5LlRocm90dGxlU2V0dGluZ3MuaHRtbFxuICAgIC8vICAgICBjb25zdCBwbGFuID0gdGhpcy5hcGkuYWRkVXNhZ2VQbGFuKCdVc2FnZVBsYW4nLCB7XG4gICAgLy8gICAgICAgICBuYW1lOiAnRWFzeScsXG4gICAgLy8gICAgICAgICB0aHJvdHRsZToge1xuICAgIC8vICAgICAgICAgICByYXRlTGltaXQ6IDIsXG4gICAgLy8gICAgICAgICAgIGJ1cnN0TGltaXQ6IDVcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICB9KTtcblxuICAgIC8vICAgICAgIHBsYW4uYWRkQXBpU3RhZ2Uoe1xuICAgIC8vICAgICAgICAgc3RhZ2U6IHRoaXMuYXBpLmRlcGxveW1lbnRTdGFnZSxcbiAgICAvLyAgICAgICAgIHRocm90dGxlOiBbXG4gICAgLy8gICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBtZXRob2Q6IGVjaG9NZXRob2QsXG4gICAgLy8gICAgICAgICAgICAgdGhyb3R0bGU6IHtcbiAgICAvLyAgICAgICAgICAgICAgIHJhdGVMaW1pdDogMTAsXG4gICAgLy8gICAgICAgICAgICAgICBidXJzdExpbWl0OiAyXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICBdXG4gICAgLy8gICAgICAgfSk7XG4gICAgfVxufSJdfQ==