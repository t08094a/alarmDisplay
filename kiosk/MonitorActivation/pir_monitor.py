import sys
from time import time, sleep
from subprocess import call
from RPi import GPIO
import logging

# https://www.modmypi.com/blog/raspberry-pi-gpio-sensing-motion-detection
# https://raspberry.tips/raspberrypi-tutorials/bewegungsmelder-am-raspberry-pi-auslesen/
# https://tutorials-raspberrypi.de/raspberry-pi-bewegungsmelder-sensor-pir/

LOGGER = logging.getLogger(__name__)

class PirWatcher():

    PIR_PIN = 8 # GPIO PIN: 14
    SHUTOFF_DELAY = 60

    def __init__(self):
        # https://raspberrypi.stackexchange.com/questions/12966/what-is-the-difference-between-board-and-bcm-for-gpio-pin-numbering#12967
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(self.PIR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

        self.stop_running = False
        self.turned_off = False
        self.last_motion_time = time()

    def motion_detected(self, channel):
        """
        Link the callback to the correct pin. So this method gets
        called when a motion is detected.
        """
        
        LOGGER.info('motion detected')
        
        self.turn_on()

    def start(self):
        """
        Starts motion tracking
        """

        LOGGER.info('Start motion detection ...')

        # bouncetime=300: sets a time of 300 ms during which time a second interrupt will be ignored
        GPIO.add_event_detect(self.PIR_PIN, GPIO.RISING, callback=self.motion_detected, bouncetime=300)

        try:
            while self.stop_running == False:
                # sleep for 60 sec
                sleep(60)
        except KeyboardInterrupt:
            self.cleanup()

    def stop(self):
        self.cleanup()

    def cleanup(self):
        GPIO.remove_event_detect(self.PIR_PIN)
        self.stop_running = True
        GPIO.cleanup()

    def turn_on(self):
        call('vcgencmd display_power 1', shell=True)

    #def turn_off(self):
    #    call('vcgencmd display_power 0', shell=True)
