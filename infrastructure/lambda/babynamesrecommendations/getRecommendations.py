import json
from numbers import Number
from typing import List
import joblib
import logging
import syllapy
import string

# Define logger class
logger = logging.getLogger()
logger.setLevel(logging.INFO)

model_file = "/opt/ml/model/model-18-04-2022.joblib"
model = joblib.load(model_file)
logger.info("Model Loaded from file...")


def extract_features(name: str, sex: str) -> List[Number]:
    lower = name.lower()
    length = len(lower)
    no_of_syllables = syllapy.count(lower)
    first_letter_index = 0
    sex_numeric = 0 if sex == "F" else 1
    first_letter_index = string.ascii_lowercase.index(lower[0])
    return [length, no_of_syllables, first_letter_index, sex_numeric]


def lambda_handler(event, context):
    name = event["queryStringParameters"]["name"]
    sex = event["queryStringParameters"]["sex"]

    input_features = extract_features(name, sex)
    logger.info(f"input features {input_features}")

    predictions = model.predict(([input_features]))
    logger.info(f"prediction {predictions[0]}")

    message = f"Hello {name} {sex}!"
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(
            {
                "message": message,
                "prediction": [predictions[0].item()],
                "recommendations": [
                    {"name": "Nemo", "matchPercentage": 90},
                    {"name": "Dory", "matchPercentage": 80},
                ],
            }
        ),
    }
