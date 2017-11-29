#!/usr/bin/env python

import logging
import pir_monitor

LOG_FORMAT = ('%(levelname) -10s %(asctime)s %(name) -15s %(funcName) -5s %(lineno) -3d: %(message)s')
LOGGER = logging.getLogger(__name__)

def main():
    logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
    
    pir_watcher = pir_monitor.PirWatcher()

    try:
        pir_watcher.start()

    except KeyboardInterrupt:
        pir_watcher.stop()


if __name__ == '__main__':
    main()
