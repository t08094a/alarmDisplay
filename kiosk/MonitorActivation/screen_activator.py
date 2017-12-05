import logging
import subprocess

class ScreenActivator(object):

    LOGGER = logging.getLogger(__name__)
    
    def __init__(self, minutes):

    def activate(self):

        LOGGER.info('activate monitor')

        # force display activation if screenserver is currently active
        subprocess.call('vcgencmd display_power 1')

    def deactivate(self):

        LOGGER.info('deactivate monitor')

        subprocess.call('vcgencmd display_power 0')
