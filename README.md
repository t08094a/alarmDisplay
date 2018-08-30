# AlarmMonitor

Projekt zur Darstellung von Alarmen auf einem Monitor.
Dies ist die Ergänzung zum [AlarmPublisher](https://github.com/t08094a/alarmPublisher)

Eingehende Alarme werden vom AlarmPublisher verarbeitet und vom AlarmMonitor dargestellt.

Neben reinen Alarmen ist es auch möglich Meldungen darzustellen.

Die Plattform hierfür ist für RaspberryPi ausgelegt. Zum Testen auf Entwicklungsrechnern gibt es einen Bereich x86.

Es wird mindestens ein RaspberryPi für den Monitor benötigt. Auf diesem läuft ein [Kiosk System](./kiosk), welches einen Webbrowser im Vollbildmodus startet und den Alarm darstellt.

# Submodule

## Klonen des Repositories
- Klonen mit allen Submodulen
git clone --recurse-submodules https://github.com/t08094a/alarmDisplay.git

- Nachträgliches Laden der Submodule
Nach dem Klonen des Repositories müssen die Submodule noch geladen werden:
git submodule init && git submodule update

## Aktualisierung der Submodule
git submodule update --remote
