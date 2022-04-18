import json 

def lambda_handler(event, context):
    name = event["queryStringParameters"]["name"]
    sex = event["queryStringParameters"]["sex"]

    message = f"Hello {name} {sex}!"
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "message": message,
            "recommendations": [
                {"name": "Nemo", "matchPercentage": 90},
                {"name": "Dory", "matchPercentage": 80},
            ],
        }),
    }
