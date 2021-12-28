## Setup
Install and activate Python virtual env
In the project root directory, run:
```bash
python3 -m pip install --user virtualenv 
python3 -m venv venv
source venv/bin/activate
```

### Installing dependencies
```
pip install -r requirements.txt
```

## Tests
Run within the python virtual environment:
```
pytest
```
