"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const apigw = require("@aws-cdk/aws-apigateway");
class Feedback extends cdk.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        const table = new dynamodb.Table(this, 'Feedback', {
            partitionKey: { name: 'feedbackId', type: dynamodb.AttributeType.NUMBER },
            sortKey: { name: 'articleId', type: dynamodb.AttributeType.NUMBER }
        });
        this.createFeedback = new lambda.Function(this, 'FeedbackHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'createFeedback.handler',
            code: lambda.Code.fromAsset('lambda/feedback'),
            environment: {
                FEEDBACK_TABLE_NAME: table.tableName
            }
        });
        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.createFeedback);
        // API REST endpoint to trigger lambda
        const feedbackResource = api.root.addResource('feedback');
        feedbackResource.addMethod('PUT', new apigw.LambdaIntegration(this.createFeedback));
    }
}
exports.Feedback = Feedback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmZWVkYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxpREFBaUQ7QUFHakQsTUFBYSxRQUFTLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFHdkMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxHQUFrQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQy9DLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO1lBQ3hFLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO1NBQ3BFLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUMvRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDO1lBQzlDLFdBQVcsRUFBRTtnQkFDVCxtQkFBbUIsRUFBRSxLQUFLLENBQUMsU0FBUzthQUN2QztTQUNKLENBQUMsQ0FBQztRQUVILDREQUE0RDtRQUM1RCxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTlDLHNDQUFzQztRQUN0QyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFELGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUNKO0FBM0JELDRCQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5cblxuZXhwb3J0IGNsYXNzIEZlZWRiYWNrIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gICAgY3JlYXRlRmVlZGJhY2s6IGxhbWJkYS5GdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBhcGk6IGFwaWd3LlJlc3RBcGkpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgICAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnRmVlZGJhY2snLCB7XG4gICAgICAgICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ2ZlZWRiYWNrSWQnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLk5VTUJFUn0sXG4gICAgICAgICAgICBzb3J0S2V5OiB7bmFtZTogJ2FydGljbGVJZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuTlVNQkVSfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY3JlYXRlRmVlZGJhY2sgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdGZWVkYmFja0hhbmRsZXInLCB7XG4gICAgICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdjcmVhdGVGZWVkYmFjay5oYW5kbGVyJyxcbiAgICAgICAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhL2ZlZWRiYWNrJyksXG4gICAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgICAgIEZFRURCQUNLX1RBQkxFX05BTUU6IHRhYmxlLnRhYmxlTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9ucyB0byBvdXIgdGFibGVcbiAgICAgICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuY3JlYXRlRmVlZGJhY2spO1xuICAgIFxuICAgICAgICAvLyBBUEkgUkVTVCBlbmRwb2ludCB0byB0cmlnZ2VyIGxhbWJkYVxuICAgICAgICBjb25zdCBmZWVkYmFja1Jlc291cmNlID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2ZlZWRiYWNrJyk7XG4gICAgICAgIGZlZWRiYWNrUmVzb3VyY2UuYWRkTWV0aG9kKCdQVVQnLCBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24odGhpcy5jcmVhdGVGZWVkYmFjaykpO1xuICAgIH1cbn0iXX0=