FROM public.ecr.aws/lambda/python:3.9

COPY getRecommendations.py requirements.txt ./
COPY model-18-04-2022.joblib /opt/ml/model/

# gcc is required for syllapy -> ujson
RUN yum install -y gcc 
RUN python3.9 -m pip install -r requirements.txt -t .

CMD ["getRecommendations.lambda_handler"]