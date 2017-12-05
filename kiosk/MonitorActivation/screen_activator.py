import logging
import subprocess

class ScreenActivator(object):

    LOGGER = logging.getLogger(__name__)
    
    def __init__(self, minutes):

    def activate(self):

        LOGGER.info('activate monitor')

        # activate HDMI and deactivate screensaver
        subprocess.call('vcgencmd display_power 1 && xscreensaver-command -deactivate', shell=True, env={'DISPLAY': ':0'})

    def deactivate(self):

        LOGGER.info('deactivate monitor')

        subprocess.call('xscreensaver-command -activate && vcgencmd display_power 0', shell=True, env={'DISPLAY': ':0'})
