"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const MkurienBlogMono = require("../lib/mkurien-blog-mono-stack");
test('SQS Queue Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MkurienBlogMono.MkurienBlogMonoStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource("AWS::SQS::Queue", {
        VisibilityTimeout: 300
    }));
});
test('SNS Topic Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MkurienBlogMono.MkurienBlogMonoStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource("AWS::SNS::Topic"));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWt1cmllbi1ibG9nLW1vbm8udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1rdXJpZW4tYmxvZy1tb25vLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0U7QUFDcEUscUNBQXFDO0FBQ3JDLGtFQUFrRTtBQUVsRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFCLE9BQU87SUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0UsT0FBTztJQUNQLGVBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVksQ0FBQyxpQkFBaUIsRUFBQztRQUNqRCxpQkFBaUIsRUFBRSxHQUFHO0tBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFCLE9BQU87SUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0UsT0FBTztJQUNQLGVBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMscUJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgYXMgZXhwZWN0Q0RLLCBoYXZlUmVzb3VyY2UgfSBmcm9tICdAYXdzLWNkay9hc3NlcnQnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgTWt1cmllbkJsb2dNb25vIGZyb20gJy4uL2xpYi9ta3VyaWVuLWJsb2ctbW9uby1zdGFjayc7XG5cbnRlc3QoJ1NRUyBRdWV1ZSBDcmVhdGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IHN0YWNrID0gbmV3IE1rdXJpZW5CbG9nTW9uby5Na3VyaWVuQmxvZ01vbm9TdGFjayhhcHAsICdNeVRlc3RTdGFjaycpO1xuICAgIC8vIFRIRU5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6U1FTOjpRdWV1ZVwiLHtcbiAgICAgIFZpc2liaWxpdHlUaW1lb3V0OiAzMDBcbiAgICB9KSk7XG59KTtcblxudGVzdCgnU05TIFRvcGljIENyZWF0ZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gIC8vIFdIRU5cbiAgY29uc3Qgc3RhY2sgPSBuZXcgTWt1cmllbkJsb2dNb25vLk1rdXJpZW5CbG9nTW9ub1N0YWNrKGFwcCwgJ015VGVzdFN0YWNrJyk7XG4gIC8vIFRIRU5cbiAgZXhwZWN0Q0RLKHN0YWNrKS50byhoYXZlUmVzb3VyY2UoXCJBV1M6OlNOUzo6VG9waWNcIikpO1xufSk7XG4iXX0=