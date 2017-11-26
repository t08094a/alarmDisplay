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


## Postgres

**Image:** postgres:latest

**GitHub:** https://hub.docker.com/_/postgres/

Folgende Einstellungen sind zu tätigen (beim Start oder über \*.yml):
Umgebungsvariablen (ENV)

| ENV                | Wert           |
| :----------------- | :------------- |
| POSTGRES_PASSWORD  | xxx            |

Um die Datenbank-Daten zu persistieren, so dass diese einen Neustart des Containers überleben ist ein Volumn anzulegen:

| Name     | Mountpoint               |
| :--------| :----------------------- |
| pgdata   | /var/lib/postgresql/data |


## Pgadmin

Verwaltung für Postgres Datenbanken

**Image:** dpage/pgadmin4:latest

**Start:**
```
docker run \
-e "PGADMIN_DEFAULT_EMAIL=container@pgadmin.org" \
-e "PGADMIN_DEFAULT_PASSWORD=<PASSWORD>" \
-d dpage/pgadmin4
```

## RabbitMQ

RabbitMQ ist ein Multi-Protokoll Message-Broker.

**Docker:** https://hub.docker.com/_/rabbitmq/

**Docker Image:** rabbitmq:latest

**GitHub:** https://github.com/docker-library/rabbitmq



## OpenJDK

OpenJDK ist eine Open Source Implementierung der Java Plattform.

**Docker:** https://hub.docker.com/_/openjdk/

**Docker Image:** openjdk:latest

**GitHub:** https://github.com/docker-library/openjdk

## NodeJS

Node.js ist eine JavaScript basierende Plattform für server-seitige Javascript Programme.

**Docker:** https://hub.docker.com/_/node/

**Docker Image:** node:latest

**GitHub:** https://github.com/nodejs/docker-node
