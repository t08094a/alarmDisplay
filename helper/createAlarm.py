#!/usr/bin/env python3

"""creates an alarm info"""

import json
from datetime import datetime
from string import Template
from time import gmtime, strftime
import inquirer
import requests

dataCenterUrl = 'http://alarmmonitor-worker'
dataCenterPort = 9002
resource = 'alarm-info'


alarmTemplateJson = """{
  "time": "$alarmTimeSub:00Z",
  "comment": "$commentSub",
  "keywords": {
    "keyword": "$keywordSub",
    "emergencyKeyword": "",
    "b": "",
    "r": "",
    "s": "",
    "t": ""
  },
  "placeOfAction": {
    "street": "$streetSub",
    "houseNumber": "$houseNumberSub",
    "addition": "$additionSub",
    "city": "$citySub",
    "geoPosition": {
      "x": "$geoXSub",
      "y": "$geoYSub"
    }
  },
  "priority": 1,
  "resources": [
    {
      "name": "LF8",
      "equipments": [
        {
          "name": "Wasser 600l"
        },
        {
          "name": "THL"
        }
      ]
    },
    {
      "name": "MTW",
      "equipments": [
        {
          "name": "Überdruckbelüftung"
        }
      ]
    }
  ]
}"""


def validate_datetime(input: str):
    """
    Validates the given input to a valid datetime in correct format
    :param input:
    :return:
    """
    try:
        datetime.strptime(input, '%Y-%m-%dT%H:%M')
        return True
    except ValueError:
        return False


# https://www.koordinaten-umrechner.de/

if __name__ == '__main__':

    print("")
    print("===============================================")
    print("=               Alarm anlegen                 =")
    print("===============================================")
    print("")

    questions = [
        inquirer.List('target',
                      message="Wo ist der Einsatzort?",
                      choices=[
                          ('Fa. Bär', {'street': 'Oberndorfer Str.', 'houseNumber': '19', 'addition': 'Hinterhof', 'city': 'Ipsheim', 'geoX': '3607204.894', 'geoY': '5488602.290'}),
                          ('Kuhwasen', {'street': 'Am Kuhwasen', 'houseNumber': '21', 'addition': 'Gartenhaus', 'city': 'Ipsheim', 'geoX': '3607770.655', 'geoY': '5488914.720'}),
                          ('Vitalis Wohnpark', {'street': 'Augustinumstraße', 'houseNumber': '14', 'addition': '', 'city': 'Bad Windsheim', 'geoX': '3602272.164', 'geoY': '5486796.409'})
                      ])
    ]

    answers = inquirer.prompt(questions)

    target = answers['target']

    street = target['street']
    houseNumber = target['houseNumber']
    addition = target['addition']
    city = target['city']
    geoX = target['geoX']
    geoY = target['geoY']

    questions = [
        inquirer.Text('alarmTime', message="Alarmzeit", default=strftime('%Y-%m-%dT%H:%M', gmtime()), show_default=True, validate=lambda _, x: validate_datetime(x)),
        inquirer.Text('comment', message="Kommentar"),
        inquirer.List('keyword',
                      message="Schlagwort",
                      choices=[
                          ('Brand - im Freien - Rauchentwicklung', '#B1011#im Freien#Rauchentwicklung'),
                          ('Brand - im Gebäude - Keller', '#B1116#im Gebäude#Keller'),
                          ('Brand - Verkehr - LKW (Person in Gefahr)', '#B1517#Verkehr#LKW (Person in Gefahr)'),
                          ('Brand - Meldeanlage - Brandmeldeanlage', '#B1710#Meldeanlage#Brandmeldeanlage')
                      ])
    ]
    answers = inquirer.prompt(questions)

    alarmTime = answers['alarmTime']
    comment = answers['comment']
    keyword = answers['keyword']

    substitutionDict = dict(
        alarmTimeSub=alarmTime,
        commentSub=comment,
        keywordSub=keyword,
        streetSub=street,
        houseNumberSub=houseNumber,
        additionSub=addition,
        citySub=city,
        geoXSub=geoX,
        geoYSub=geoY)

    alarmContentJson = Template(alarmTemplateJson).substitute(substitutionDict)
    data = json.loads(alarmContentJson)

    questions = [
        inquirer.List('dataCenterUrl',
                      message="DataCenter URL",
                      choices=[
                          (dataCenterUrl),
                          ('http://localhost')
                      ]),
        inquirer.Text('dataCenterPort', message="Port", default=str(dataCenterPort), show_default=True)
    ]
    answers = inquirer.prompt(questions)

    dataCenterUrl = answers['dataCenterUrl']
    dataCenterPort = int(answers['dataCenterPort'])

    targetUrl = '{}:{}/{}'.format(dataCenterUrl, dataCenterPort, resource)

    try:
        response = requests.post(targetUrl, None, verify=False, json=data)
    except requests.exceptions.ConnectionError as e:
        response = None
        print(e)

    if response is None or response.status_code != 200:
        print('Fehler beim Senden der Nachricht!')
        if response is not None:
            print(response.content)
    else:
        print('Alarmnachricht erfolgreich verschickt!')
