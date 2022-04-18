import json 
import joblib
import logging

# Define logger class
logger = logging.getLogger()
logger.setLevel(logging.INFO)

model_file = '/opt/ml/model/model-18-04-2022.joblib'
model = joblib.load(model_file)
logger.info('Model Loaded from file...')

def lambda_handler(event, context):
    name = event["queryStringParameters"]["name"]
    sex = event["queryStringParameters"]["sex"]

    predictions = model.predict(([[4, 2, 12, 0]]))
    logger.info(f'prediction {predictions[0]}')

    message = f"Hello {name} {sex}!"
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "message": message,
            "prediction": [predictions[0].item()],
            "recommendations": [
                {"name": "Nemo", "matchPercentage": 90},
                {"name": "Dory", "matchPercentage": 80},
            ],
        }),
    }
