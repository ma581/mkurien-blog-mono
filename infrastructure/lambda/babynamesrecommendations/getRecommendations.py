import json
from numbers import Number
from typing import List
import joblib
import logging
import syllapy
import string
import boto3
import os

# Define logger class
logger = logging.getLogger()
logger.setLevel(logging.INFO)

model_file = "/opt/ml/model/model-18-04-2022.joblib"
model = joblib.load(model_file)
logger.info("Model Loaded from file...")


def get_names_in_cluster(clusterNumber: int, sex: str) -> List[str]:
    s3 = boto3.client("s3")
    bucket_name = os.environ["BUCKET_NAME"]

    resp = s3.select_object_content(
        Bucket=bucket_name,
        Key="clustered-names.csv",
        ExpressionType="SQL",
        Expression=f"SELECT s.name FROM s3object s where s.clusters = '{clusterNumber}' and s.Sex = '{sex}' limit 10",
        InputSerialization={
            "CSV": {"FileHeaderInfo": "Use"},
            "CompressionType": "NONE",
        },
        OutputSerialization={"CSV": {}},
    )

    records = []
    for event in resp["Payload"]:
        if "Records" in event:
            records = event["Records"]["Payload"].decode("utf-8")
            print(records)

    string_of_names = "".join(records)
    names = string_of_names.split("\n")
    # TODO 
    # exclude name itself
    # exclude names of opposite sex?
    return names[:-1]


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
    predicted_class = predictions[0].item()
    logger.info(f"prediction {predicted_class}")

    recommended_names = get_names_in_cluster(predicted_class, sex)
    logger.info(f"recommendations {recommended_names}")
    recommendations = list(
        map(lambda x: {"name": x, "matchPercentage": 90}, recommended_names)
    )

    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(
            {
                "prediction": predicted_class,
                "recommendations": recommendations,
            }
        ),
    }
