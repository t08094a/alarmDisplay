# AlarmMonitor

Projekt zur Darstellung von Alarmen auf einem Monitor.
Dies ist die Ergänzung zum [AlarmPublisher](https://github.com/t08094a/alarmPublisher)

Eingehende Alarme werden vom AlarmPublisher verarbeitet und vom AlarmMonitor dargestellt.

Neben reinen Alarmen ist es auch möglich Meldungen darzustellen.

Die Plattform hierfür ist für RaspberryPi ausgelegt. Zum Testen auf Entwicklungsrechnern gibt es einen Bereich x86.

Es wird mindestens ein RaspberryPi für den Monitor benötigt. Auf diesem läuft ein [Kiosk System](./kiosk), welches einen Webbrowser im Vollbildmodus startet und den Alarm darstellt.

# Submodule

## Klonen des Repositories
* Klonen mit allen Submodulen
`git clone --recurse-submodules https://github.com/t08094a/alarmDisplay.git`

* Nachträgliches Laden der Submodule
Nach dem Klonen des Repositories müssen die Submodule noch geladen werden:
`git submodule init && git submodule update`

## Aktualisierung der Submodule
`git submodule update --remote`


# Betriebssystem für RaspberryPi um Docker Container auszuführen

[resinOS](https://resinos.io/)
[Getting Started](https://resinos.io/docs/raspberrypi3/gettingstarted/)

# Verwaltung von Containern

## Portainer

**Image:** portainer/portainer:latest

**Hilfe:** https://portainer.readthedocs.io/en/latest/deployment.html

**Start:**
Verwaltung lokaler Container
```
docker run -d -p 9000:9000 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /opt/dockerData/portainer/portainer \
-H unix:///var/run/docker.sock
```

# Start containers with docker-compose

## Configuration
To configure the services you need to create a link to either `docker-compose.development.env` or `docker-compose.production.env` based on your system with
```
ln -s docker-compose.development.env .env
```

After that modify the values in the correct `*.env` file.

To get a google key for the maps service use the following link:
https://developers.google.com/maps/documentation/javascript/get-api-key

- ADA_DATASERVER_URL
  > Contains the server url of the `datacenter-app` service. If you are in development mode, this would be `localhost` otherwise the `hostname` of the host system running `docker-compose`, e.g. `http://alarmmonitor-worker`
- ADA_DATASERVER_REST_RESOURCE_CURRENT_ALARM_INFO
  > Defines the resource key to query a current active alarm info.
    This value should not be changed. This must be the same value in both services `alarmdisplay-app` and `datacenter-app`
- ADA_DATASERVER_WEBSOCKET_ALARM_INFO_EVENT_KEY
  > Defines the websocket key to update alarm infos.
    This value should not be changed. This must be the same value in both services `alarmdisplay-app` and `datacenter-app`

## Update images
Go to the directory containing the `docker-compose.yml` and call
```
docker-compose pull
docker-compose up -d --remove-orphans
```
This will update the images used in that Docker Compose setup and restart the container.
