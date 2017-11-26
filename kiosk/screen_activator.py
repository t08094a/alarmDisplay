import logging
import os
import subprocess
import sys

class ScreenActivator(object):

    def __init__(self, minutes):
        os.environ['DISPLAY'] = ':0' # visible in this process and all children

    def activate(self):

        LOGGER.info('activate monitor')

        # force display activation if screenserver is currently active
        subprocess.call('xset s reset', shell=True)

        # activate screensaver after 15 minutes of inactivity
        #
        # the max 3 parameters of dpms set the inactivity period (in seconds)
        # before the modes are activated. The first value given is for the 'standby' mode,
        # the second is for the 'suspend' mode, and the third is for the 'off' mode. Setting
        # these values implicitly enables the DPMS features. A value of zero disables a particular
        # mode.
        subprocess.call('xset dpms 900 0 0')
