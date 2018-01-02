#!/usr/bin/env python

"""
Set up the kiosk environment on Raspian.
"""

from optparse import OptionParser
import shutil
import os

FILE_TO_APPEND = './autostartAppend.txt'
AUTOSTART_TARGET = '~/.config/lxsession/lxde-pi/autostart'
BACKUP_EXTENSION = '.backup'
BACKUP_FILE = AUTOSTART_TARGET + BACKUP_EXTENSION


def check_autostart_target_already_modified() -> bool:
    """
    Checks whether the AUTOSTART_TARGET is already modified

    :return: True if the file is already modified, otherwise False
    """

    with open(FILE_TO_APPEND, 'rt') as file_to_append:
        source_first_line = file_to_append.readline()

        with open(AUTOSTART_TARGET, 'rt') as file_to_modify:
            for target_line in file_to_modify:
                if target_line == source_first_line:
                    # cancel, the file seems already to be modified
                    return True

    return False


def append_file_to_autostart_target():
    """
    Appends the FILE_TO_APPEND to the end of AUTOSTART_TARGET.
    """

    create_backup_of_autostart_target()

    with open(FILE_TO_APPEND, 'rt') as file_to_append:
        with open(AUTOSTART_TARGET, 'at') as file_to_modify:
            for source_line in file_to_append:
                file_to_modify.write(source_line)


def create_backup_of_autostart_target():
    """
    Creates a backup of AUTOSTART_TARGET with extension BACKUP_EXTENSION
    """

    if not os.path.isfile(BACKUP_FILE):
        print('Create backup %s', BACKUP_FILE)
        shutil.copy2(AUTOSTART_TARGET, BACKUP_FILE)
    else:
        print('Backup already exist -> don\'t touch it')


def force_install_restart():
    """
    Overwrites the AUTOSTART_TARGET with its backup BACKUP_FILE to restart modifications.
    """

    if os.path.isfile(BACKUP_FILE):
        print('Overwrite %s with backup %s', AUTOSTART_TARGET, BACKUP_FILE)
        shutil.copy2(BACKUP_FILE, AUTOSTART_TARGET)
    else:
        raise AssertionError('There is no backup file present: %s', BACKUP_FILE)


if __name__ == "__main__":

    parser = OptionParser()
    parser.add_option('-f', '--force', action='store_true', dest='forceRecreation', default=False, help='forces the recreation of the autostart file %s')
    (options, args) = parser.parse_args()

    modified = check_autostart_target_already_modified()

    if modified:
        if parser.forceRecreation:
            force_install_restart()
            modified = False

        else:
            print("File %s is already modified. To force recreation use parameter -f", AUTOSTART_TARGET)
            quit(-1)

    append_file_to_autostart_target()
    print("Modified file %s", AUTOSTART_TARGET)
