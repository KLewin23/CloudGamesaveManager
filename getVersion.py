import json
import os

file = open("package.json", "r").read()

fileJson = json.loads(file)

string = "GSM-{0}"

appBuild = os.getenv('APPVEYOR_BUILD_VERSION', 'nn.nn.nn')
appBuild = string.format(fileJson["version"])

