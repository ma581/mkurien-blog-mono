"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MkurienBlogMonoStack = void 0;
const cdk = require("@aws-cdk/core");
const likecounter_1 = require("./likecounter");
const api_1 = require("./api");
const feedback_1 = require("./feedback");
const waf_1 = require("./waf");
const static_site_1 = require("./static-site");
class MkurienBlogMonoStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const rootDomain = 'mkurien.com';
        const apiDomainName = `api.${rootDomain}`;
        const frontEnd = `https://www.${rootDomain}`;
        const apiConstruct = new api_1.ApiWithDomain(this, "api", {
            apiSubDomainName: apiDomainName,
            corsAllowList: [frontEnd] //add http://localhost:3000 for local testing
        });
        const api = apiConstruct.api;
        api.root.addMethod('ANY');
        new likecounter_1.LikeCounter(this, 'LikeCounter', {
            corsAllowOrigin: frontEnd,
            api: api
        });
        new feedback_1.Feedback(this, 'Feedback', api);
        const apiARN = `arn:aws:apigateway:${this.region}::/restapis/${api.restApiId}/stages/${api.deploymentStage.stageName}`;
        new waf_1.WafConstruct(this, 'Waf', { gatewayARN: apiARN });
        const blah = new static_site_1.StaticSite(this, "mkurien-blog-frontend-static-web");
    }
}
exports.MkurienBlogMonoStack = MkurienBlogMonoStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWt1cmllbi1ibG9nLW1vbm8tc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJta3VyaWVuLWJsb2ctbW9uby1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsK0NBQTRDO0FBQzVDLCtCQUFzQztBQUN0Qyx5Q0FBc0M7QUFDdEMsK0JBQXFDO0FBQ3JDLCtDQUEyQztBQUUzQyxNQUFhLG9CQUFxQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2pELFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUM7UUFDakMsTUFBTSxhQUFhLEdBQUcsT0FBTyxVQUFVLEVBQUUsQ0FBQztRQUMxQyxNQUFNLFFBQVEsR0FBRyxlQUFlLFVBQVUsRUFBRSxDQUFDO1FBRTdDLE1BQU0sWUFBWSxHQUFHLElBQUksbUJBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ2xELGdCQUFnQixFQUFFLGFBQWE7WUFDL0IsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsNkNBQTZDO1NBQ3hFLENBQUMsQ0FBQTtRQUNGLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUE7UUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsSUFBSSx5QkFBVyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDbkMsZUFBZSxFQUFFLFFBQVE7WUFDekIsR0FBRyxFQUFFLEdBQUc7U0FDVCxDQUFDLENBQUM7UUFFSCxJQUFJLG1CQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVwQyxNQUFNLE1BQU0sR0FBRyxzQkFBc0IsSUFBSSxDQUFDLE1BQU0sZUFBZSxHQUFHLENBQUMsU0FBUyxXQUFXLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDdEgsSUFBSSxrQkFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtRQUVuRCxNQUFNLElBQUksR0FBRyxJQUFJLHdCQUFVLENBQUMsSUFBSSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUVGO0FBNUJELG9EQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IExpa2VDb3VudGVyIH0gZnJvbSAnLi9saWtlY291bnRlcic7XG5pbXBvcnQgeyBBcGlXaXRoRG9tYWluIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgRmVlZGJhY2sgfSBmcm9tICcuL2ZlZWRiYWNrJztcbmltcG9ydCB7IFdhZkNvbnN0cnVjdCB9IGZyb20gJy4vd2FmJztcbmltcG9ydCB7IFN0YXRpY1NpdGUgfSBmcm9tICcuL3N0YXRpYy1zaXRlJztcblxuZXhwb3J0IGNsYXNzIE1rdXJpZW5CbG9nTW9ub1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICBcbiAgICBjb25zdCByb290RG9tYWluID0gJ21rdXJpZW4uY29tJztcbiAgICBjb25zdCBhcGlEb21haW5OYW1lID0gYGFwaS4ke3Jvb3REb21haW59YDtcbiAgICBjb25zdCBmcm9udEVuZCA9IGBodHRwczovL3d3dy4ke3Jvb3REb21haW59YDtcblxuICAgIGNvbnN0IGFwaUNvbnN0cnVjdCA9IG5ldyBBcGlXaXRoRG9tYWluKHRoaXMsIFwiYXBpXCIsIHtcbiAgICAgIGFwaVN1YkRvbWFpbk5hbWU6IGFwaURvbWFpbk5hbWUsXG4gICAgICBjb3JzQWxsb3dMaXN0OiBbZnJvbnRFbmRdIC8vYWRkIGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCBmb3IgbG9jYWwgdGVzdGluZ1xuICAgIH0pXG4gICAgY29uc3QgYXBpID0gYXBpQ29uc3RydWN0LmFwaVxuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnQU5ZJyk7XG5cbiAgICBuZXcgTGlrZUNvdW50ZXIodGhpcywgJ0xpa2VDb3VudGVyJywge1xuICAgICAgY29yc0FsbG93T3JpZ2luOiBmcm9udEVuZCxcbiAgICAgIGFwaTogYXBpXG4gICAgfSk7XG5cbiAgICBuZXcgRmVlZGJhY2sodGhpcywgJ0ZlZWRiYWNrJywgYXBpKTtcblxuICAgIGNvbnN0IGFwaUFSTiA9IGBhcm46YXdzOmFwaWdhdGV3YXk6JHt0aGlzLnJlZ2lvbn06Oi9yZXN0YXBpcy8ke2FwaS5yZXN0QXBpSWR9L3N0YWdlcy8ke2FwaS5kZXBsb3ltZW50U3RhZ2Uuc3RhZ2VOYW1lfWBcbiAgICBuZXcgV2FmQ29uc3RydWN0KHRoaXMsICdXYWYnLCB7Z2F0ZXdheUFSTjogYXBpQVJOfSlcblxuICAgIGNvbnN0IGJsYWggPSBuZXcgU3RhdGljU2l0ZSh0aGlzLCBcIm1rdXJpZW4tYmxvZy1mcm9udGVuZC1zdGF0aWMtd2ViXCIpO1xuICB9XG5cbn1cbiJdfQ==