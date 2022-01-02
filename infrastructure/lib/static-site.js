"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticSite = void 0;
const cdk = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const s3Deployment = require("@aws-cdk/aws-s3-deployment");
const cloudfront = require("@aws-cdk/aws-cloudfront");
const origins = require("@aws-cdk/aws-cloudfront-origins");
const acm = require("@aws-cdk/aws-certificatemanager");
const route53 = require("@aws-cdk/aws-route53");
const route53Targets = require("@aws-cdk/aws-route53-targets");
class StaticSite extends cdk.Construct {
    constructor(scope, id) {
        super(scope, id);
        const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            websiteIndexDocument: 'index.html',
            publicReadAccess: true,
        });
        const domainName = 'dev.mkurien.com';
        const hostedZone = new route53.PublicHostedZone(this, `hostedZone.${domainName}`, {
            zoneName: domainName
        });
        // https://docs.aws.amazon.com/cdk/api/v1/docs/aws-cloudfront-readme.html
        // CloudFront distributions deliver your content from one or more origins; 
        // an origin is the location where you store the original version of your content. 
        // Origins can be created from S3 buckets or a custom origin (HTTP server).
        const myCertificate = new acm.DnsValidatedCertificate(this, 'mySiteCert', {
            domainName,
            region: 'us-east-1',
            hostedZone
        });
        const distribution = new cloudfront.Distribution(this, 'myDist', {
            defaultBehavior: { origin: new origins.S3Origin(websiteBucket) },
            domainNames: [domainName],
            certificate: myCertificate,
        });
        // https://docs.aws.amazon.com/cdk/api/v1/docs/aws-s3-deployment-readme.html#cloudfront-invalidation
        new s3Deployment.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3Deployment.Source.asset('../frontend/out')],
            destinationBucket: websiteBucket,
            distribution,
        });
        // Route53 alias record for the CloudFront distribution
        new route53.ARecord(this, "SiteAliasRecord", {
            recordName: domainName,
            target: route53.RecordTarget.fromAlias(new route53Targets.CloudFrontTarget(distribution)),
            zone: hostedZone,
        });
    }
}
exports.StaticSite = StaticSite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXNpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWMtc2l0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsc0NBQXNDO0FBQ3RDLDJEQUEyRDtBQUMzRCxzREFBc0Q7QUFDdEQsMkRBQTJEO0FBQzNELHVEQUF1RDtBQUN2RCxnREFBZ0Q7QUFDaEQsK0RBQStEO0FBRS9ELE1BQWEsVUFBVyxTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBRXpDLFlBQVksS0FBb0IsRUFBRSxFQUFVO1FBQ3hDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxhQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdkQsb0JBQW9CLEVBQUUsWUFBWTtZQUNsQyxnQkFBZ0IsRUFBRSxJQUFJO1NBQ3pCLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLGlCQUFpQixDQUFDO1FBRXJDLE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxjQUFjLFVBQVUsRUFBRSxFQUFFO1lBQzlFLFFBQVEsRUFBRSxVQUFVO1NBQ3ZCLENBQUMsQ0FBQztRQUVILHlFQUF5RTtRQUN6RSwyRUFBMkU7UUFDM0UsbUZBQW1GO1FBQ25GLDJFQUEyRTtRQUUzRSxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3RFLFVBQVU7WUFDVixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDN0QsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNoRSxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDekIsV0FBVyxFQUFFLGFBQWE7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsb0dBQW9HO1FBQ3BHLElBQUksWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDckQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN2RCxpQkFBaUIsRUFBRSxhQUFhO1lBQ2hDLFlBQVk7U0FDZixDQUFDLENBQUM7UUFFSCx1REFBdUQ7UUFDdkQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUN6QyxVQUFVLEVBQUUsVUFBVTtZQUN0QixNQUFNLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQ2xDLElBQUksY0FBYyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUNwRDtZQUNELElBQUksRUFBRSxVQUFVO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWpERCxnQ0FpREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdAYXdzLWNkay9hd3MtczMnO1xuaW1wb3J0ICogYXMgczNEZXBsb3ltZW50IGZyb20gJ0Bhd3MtY2RrL2F3cy1zMy1kZXBsb3ltZW50JztcbmltcG9ydCAqIGFzIGNsb3VkZnJvbnQgZnJvbSAnQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQnO1xuaW1wb3J0ICogYXMgb3JpZ2lucyBmcm9tICdAYXdzLWNkay9hd3MtY2xvdWRmcm9udC1vcmlnaW5zJztcbmltcG9ydCAqIGFzIGFjbSBmcm9tICdAYXdzLWNkay9hd3MtY2VydGlmaWNhdGVtYW5hZ2VyJztcbmltcG9ydCAqIGFzIHJvdXRlNTMgZnJvbSAnQGF3cy1jZGsvYXdzLXJvdXRlNTMnO1xuaW1wb3J0ICogYXMgcm91dGU1M1RhcmdldHMgZnJvbSBcIkBhd3MtY2RrL2F3cy1yb3V0ZTUzLXRhcmdldHNcIjtcblxuZXhwb3J0IGNsYXNzIFN0YXRpY1NpdGUgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAgICAgY29uc3Qgd2Vic2l0ZUJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ1dlYnNpdGVCdWNrZXQnLCB7XG4gICAgICAgICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogJ2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgcHVibGljUmVhZEFjY2VzczogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZG9tYWluTmFtZSA9ICdkZXYubWt1cmllbi5jb20nO1xuXG4gICAgICAgIGNvbnN0IGhvc3RlZFpvbmUgPSBuZXcgcm91dGU1My5QdWJsaWNIb3N0ZWRab25lKHRoaXMsIGBob3N0ZWRab25lLiR7ZG9tYWluTmFtZX1gLCB7XG4gICAgICAgICAgICB6b25lTmFtZTogZG9tYWluTmFtZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vY2RrL2FwaS92MS9kb2NzL2F3cy1jbG91ZGZyb250LXJlYWRtZS5odG1sXG4gICAgICAgIC8vIENsb3VkRnJvbnQgZGlzdHJpYnV0aW9ucyBkZWxpdmVyIHlvdXIgY29udGVudCBmcm9tIG9uZSBvciBtb3JlIG9yaWdpbnM7IFxuICAgICAgICAvLyBhbiBvcmlnaW4gaXMgdGhlIGxvY2F0aW9uIHdoZXJlIHlvdSBzdG9yZSB0aGUgb3JpZ2luYWwgdmVyc2lvbiBvZiB5b3VyIGNvbnRlbnQuIFxuICAgICAgICAvLyBPcmlnaW5zIGNhbiBiZSBjcmVhdGVkIGZyb20gUzMgYnVja2V0cyBvciBhIGN1c3RvbSBvcmlnaW4gKEhUVFAgc2VydmVyKS5cblxuICAgICAgICBjb25zdCBteUNlcnRpZmljYXRlID0gbmV3IGFjbS5EbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZSh0aGlzLCAnbXlTaXRlQ2VydCcsIHtcbiAgICAgICAgICAgIGRvbWFpbk5hbWUsXG4gICAgICAgICAgICByZWdpb246ICd1cy1lYXN0LTEnLFxuICAgICAgICAgICAgaG9zdGVkWm9uZVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgY2xvdWRmcm9udC5EaXN0cmlidXRpb24odGhpcywgJ215RGlzdCcsIHtcbiAgICAgICAgICAgIGRlZmF1bHRCZWhhdmlvcjogeyBvcmlnaW46IG5ldyBvcmlnaW5zLlMzT3JpZ2luKHdlYnNpdGVCdWNrZXQpIH0sXG4gICAgICAgICAgICBkb21haW5OYW1lczogW2RvbWFpbk5hbWVdLFxuICAgICAgICAgICAgY2VydGlmaWNhdGU6IG15Q2VydGlmaWNhdGUsXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy8gaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2Nkay9hcGkvdjEvZG9jcy9hd3MtczMtZGVwbG95bWVudC1yZWFkbWUuaHRtbCNjbG91ZGZyb250LWludmFsaWRhdGlvblxuICAgICAgICBuZXcgczNEZXBsb3ltZW50LkJ1Y2tldERlcGxveW1lbnQodGhpcywgJ0RlcGxveVdlYnNpdGUnLCB7XG4gICAgICAgICAgICBzb3VyY2VzOiBbczNEZXBsb3ltZW50LlNvdXJjZS5hc3NldCgnLi4vZnJvbnRlbmQvb3V0JyldLFxuICAgICAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHdlYnNpdGVCdWNrZXQsXG4gICAgICAgICAgICBkaXN0cmlidXRpb24sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJvdXRlNTMgYWxpYXMgcmVjb3JkIGZvciB0aGUgQ2xvdWRGcm9udCBkaXN0cmlidXRpb25cbiAgICAgICAgbmV3IHJvdXRlNTMuQVJlY29yZCh0aGlzLCBcIlNpdGVBbGlhc1JlY29yZFwiLCB7XG4gICAgICAgICAgICByZWNvcmROYW1lOiBkb21haW5OYW1lLFxuICAgICAgICAgICAgdGFyZ2V0OiByb3V0ZTUzLlJlY29yZFRhcmdldC5mcm9tQWxpYXMoXG4gICAgICAgICAgICAgICAgbmV3IHJvdXRlNTNUYXJnZXRzLkNsb3VkRnJvbnRUYXJnZXQoZGlzdHJpYnV0aW9uKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHpvbmU6IGhvc3RlZFpvbmUsXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=