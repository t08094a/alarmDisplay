# AlarmMonitor

Projekt zur Darstellung von Alarmen auf einem Monitor.
Dies ist die Ergänzung zum [AlarmPublisher](https://github.com/t08094a/alarmPublisher)

Eingehende Alarme werden vom AlarmPublisher verarbeitet und vom AlarmMonitor dargestellt.

Neben reinen Alarmen ist es auch möglich Meldungen darzustellen.

Die Plattform hierfür ist für RaspberryPi ausgelegt. Zum Testen auf Entwicklungsrechnern gibt es einen Bereich x86.

Es wird mindestens ein RaspberryPi für den Monitor benötigt. Auf diesem läuft ein [Kiosk System](./kiosk), welches einen Webbrowser im Vollbildmodus startet und den Alarm darstellt.
