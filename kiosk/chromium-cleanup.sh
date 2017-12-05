#!/bin/bash

#Set CrProfile to the value of your startup profile's config folder
CrProfile="Default"

#Set URL to the URL that you want the browser to start with
URL="http://www.ff-ipsheim.de"

#Clean up the randomly-named file(s)
for i in $HOME/.config/chromium/$CrProfile/.org.chromium.Chromium.*; do
    sed -i 's/"exited_cleanly": false/"exited_cleanly": true/' $i
    sed -i 's/"exit_state": "Crashed"/"exit_state": "Normal"/' $i
done

#Clean up Preferences
sed -i 's/"exited_cleanly": false/"exited_cleanly": true/' $HOME/.config/chromium/$CrProfile/Preferences
sed -i 's/"exit_state": "Crashed"/"exit_state": "Normal"/' $HOME/.config/chromium/$CrProfile/Preferences

#Clean up Local State
sed -i 's/"exited_cleanly": false/"exited_cleanly": true/' $HOME/.config/chromium/"Local State"

#Delete SingletonLock
rm -f $HOME/.config/chromium/SingletonLock

chromium-browser --noerrordialogs --disable-session-crashed-bubble --disable-infobars --kiosk $URL
