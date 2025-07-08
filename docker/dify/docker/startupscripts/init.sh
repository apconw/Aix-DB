#!/usr/bin/env bash

DB_INITIALIZED="/opt/oracle/oradata/dbinit"
#[ -f ${DB_INITIALIZED***REMOVED*** ] && exit
#touch ${DB_INITIALIZED***REMOVED***
if [ -f ${DB_INITIALIZED***REMOVED*** ]; then
  echo 'File exists. Standards for have been Init'
  exit
else
  echo 'File does not exist. Standards for first time Start up this DB'
  "$ORACLE_HOME"/bin/sqlplus -s "/ as sysdba" @"/opt/oracle/scripts/startup/init_user.script";
  touch ${DB_INITIALIZED***REMOVED***
fi
