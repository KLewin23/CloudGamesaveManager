import json
import os

file = open("package.json", "r").read()

fileJson = json.loads(file)

string = "GSM-{0}"

os.environ['APP_VERSION'] = string.format(fileJson["version"])


