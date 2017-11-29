#!/usr/bin/env python

import logging
import pir_monitor
#import MqttConsumer

LOG_FORMAT = ('%(levelname) -10s %(asctime)s %(name) -15s %(funcName) -10s %(lineno) -5d: %(message)s')
LOGGER = logging.getLogger(__name__)

def main():
    logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
    #consumer = MqttConsumer('amqp://guest:guest@localhost:5672/%2F')
    pir_watcher = pir_monitor.PirWatcher()

    try:
        #consumer.run()
        pir_watcher.start()

    except KeyboardInterrupt:
        #consumer.stop()
        pir_watcher.stop()


if __name__ == '__main__':
    main()
