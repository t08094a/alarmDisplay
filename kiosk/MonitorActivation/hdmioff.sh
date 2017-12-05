#!/bin/sh

### Shutoff HDMI signal when the screensaver blanks the screen

while true; do
    case "`xscreensaver-command -display :0.0 -time | egrep -o 'blanked|non-blanked'`" in
        "blanked")
            if [ -n "$(vcgencmd display_power | egrep -o '1')" ]; then
                vcgencmd display_power 0 >/dev/null
            fi ;;
        "non-blanked")
            if [ -n "$(vcgencmd display_power | egrep -o '0')" ]; then
                vcgencmd display_power 1 >/dev/null
            fi ;;
    esac
    sleep 1
done

