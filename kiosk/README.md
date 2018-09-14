# Kiosk System

- **Aktivierung des Monitors**  
  Damit der Monitor nicht ständig Strom verbraucht, wenn niemand anwesend ist, wird ein Bewegungssensor an den RaspberryPi des Monitors angeschlossen. Sobald dieser eine Bewegung erkennt wird der Monitor aktiviert ([MonitorActivation](./MonitorActivation/)).

- **Requirements**
`sudo apt install chromium x11-xserver-utils unclutter`

- **Autologin**
The Raspberry Pi should auto log in by default, but if not you can check the setting for that by running 
`sudo vi /etc/lightdm/lightdm.conf`
and looking for:
`autologin-user=pi`

- **Always use HDMI output**
Add these two lines to `/boot/config.txt`:
```bash
hdmi_force_hotplug=1
hdmi_drive=2
```
`hdmi_force_hotplug=1` to use HDMI mode even if no HDMI monitor is detected. 
`hdmi_drive=2` to use normal HDMI mode (Sound will be sent if supported and enabled). Without this line, the Raspberry would switch to DVI (with no audio) mode by default.


- **Preventing screen blanking**
 edit `~/.config/lxsession/LXDE/autostart`:
``` bash
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@point-rpi

# screensaver starten
@xscreensaver -no-splash

# disable HDMI output if screensaver gets active or enable HDMI if screensaver gets deactivated
@alarmMonitor/kiosk/MonitorActivation/hdmioff.sh

# Motion detection to activate monitor
@alarmMonitor/kiosk/MonitorActivation/pir_monitor.sh

@chromium-browser --noerrordialogs --disable-session-crashed-bubble --disable-infobars --incognito --kiosk http://black-pearl
```
