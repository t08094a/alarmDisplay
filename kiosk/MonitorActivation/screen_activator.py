import logging
import subprocess

LOGGER = logging.getLogger(__name__)

class ScreenActivator(object):
    
    def __init__(self):
        self.activate()

    def activate(self):

        LOGGER.info('activate monitor')

        # activate HDMI and deactivate screensaver
        subprocess.call('vcgencmd display_power 1 && xscreensaver-command -deactivate', shell=True, env={'DISPLAY': ':0'})

        # send CEC signal to turn monitor on
        subprocess.call('echo "on 0" | cec-client -s', shell=True)


    def deactivate(self):

        LOGGER.info('deactivate monitor')

        subprocess.call('xscreensaver-command -activate && vcgencmd display_power 0', shell=True, env={'DISPLAY': ':0'})

        # send CEC signal to turn monitor off
        subprocess.call('echo "standby 0" | cec-client -s', shell=True)
