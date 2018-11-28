#!/usr/bin/env python3

"""creates an alarm info"""

from string import Template
from time import gmtime, strftime
import json
import requests
from requests import Response

dataCenterUrl = 'http://localhost'
dataCenterPort = 9002
resource = 'alarm-info'


alarmTemplateJson = """{
  "time": "$alarmTimeSub",
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


def query_user(query: str, default_value=''):
    """
    Displays a query to the user in a specific format to make user input
    :param query: The query string to display to the user
    :param default_value: the default value to use if the user does not make an input
    :return: the input value or the default value
    """
    content = ''
    if default_value == '':
        content = '%s: ' % (query)
    else:
        content = '%s [%s]: ' % (query, default_value)

    value = input(content) or default_value
    return value.rstrip("\n")


# https://www.koordinaten-umrechner.de/

if __name__ == '__main__':

    print("")
    print("===============================================")
    print("=               Alarm anlegen                 =")
    print("===============================================")
    print("")

    alarmTime = query_user('Alarmzeit', strftime('%Y-%m-%dT%H:%M:%SZ', gmtime()))
    comment = query_user('Kommentar')
    keyword = query_user('Schlagwort', '#B1011#im Freien#Rauchentwicklung')
    street = query_user('Straße', 'Am Kuhwasen')
    houseNumber = query_user('Hausnummer', '21')
    addition = query_user('Adress-Zusatz', 'Gartenhaus')
    city = query_user('Ort', 'Ipsheim')
    geoX = query_user('Geo Rechtswert', '3607770.655')
    geoY = query_user('Geo Hochwert', '5488914.720')

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

    alarmContentJson: str = Template(alarmTemplateJson).substitute(substitutionDict)
    data: object = json.loads(alarmContentJson)

    targetUrl: str = '{}:{}/{}'.format(dataCenterUrl, dataCenterPort, resource)

    response: Response = requests.post(targetUrl, None, verify=False, json=data)

    if response.status_code != 200:
        print('Fehler beim Senden der Nachricht!')
        print(response.content)
    else:
        print('Alarmnachricht erfolgreich verschickt!')
