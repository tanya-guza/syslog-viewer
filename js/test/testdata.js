var syslogLines = [
  'May 10 14:56:16 hex rsyslogd: [origin software="rsyslogd" swVersion="5.8.6" x-pid="505" x-info="http://www.rsyslog.com"] rsyslogd was HUPed',
  'May 10 14:56:20 hex anacron[4648]: Job `cron.daily\' terminated',
  'May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'',
  'May 10 15:09:01 hex CRON[5222]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)',
  'May 10 15:17:01 hex CRON[5251]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)',
  'May 10 15:39:01 hex CRON[5377]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)',
  'May 10 16:09:01 hex CRON[5746]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)',
  'May 10 16:17:01 hex CRON[5839]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)',
  'May 10 16:39:01 hex CRON[6176]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)',
  'May 10 17:09:01 hex CRON[6346]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)',
  'May 10 17:17:01 hex CRON[6371]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly)',
  'May 10 17:39:01 hex CRON[6506]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)',
  'May 10 17:43:28 hex anacron[6618]: Anacron 2.3 started on 2013-05-10',
  'May 10 17:43:28 hex anacron[6618]: Normal exit (0 jobs run)' 
];