// Test complete log entry
test('SyslogJS.parseLine - complete entry', function(){
  var logLine = 'May 10 17:43:28 hex anacron[6618]: Normal exit (0 jobs run)';
  parsedData = SyslogJS.parseLine(logLine);
  equal(parsedData[0], 'May 10', 'Date value is parsed correctly');
  equal(parsedData[1], '17:43:28', 'Time value is parsed correctly');
  equal(parsedData[2], 'hex', 'Hostname value is parsed correctly');
  equal(parsedData[3], 'anacron', 'Source value is parsed correctly');
  equal(parsedData[4], '6618', 'PID value is parsed correctly');
  equal(parsedData[5], 'Normal exit (0 jobs run)', 'Message value is parsed correctly');
});

// Test log entry without PID
test('SyslogJS.parseLine - entry without PID', function(){
  var logLine = 'May 10 17:43:28 hex anacron: Normal exit (0 jobs run)';
  parsedData = SyslogJS.parseLine(logLine);
  equal(parsedData[0], 'May 10', 'Date value is parsed correctly');
  equal(parsedData[1], '17:43:28', 'Time value is parsed correctly');
  equal(parsedData[2], 'hex', 'Hostname value is parsed correctly');
  equal(parsedData[3], 'anacron', 'Source value is parsed correctly');
  equal(parsedData[4], undefined, 'PID value is parsed correctly');
  equal(parsedData[5], 'Normal exit (0 jobs run)', 'Message value is parsed correctly');
});

// Test incorrect entry
test('SyslogJS.parseLine - unexpected format', function(){
  equal(SyslogJS.parseLine('I\'m incorrect log string').length, 0, 'Incorrect format');
  equal(SyslogJS.parseLine('').length, 0, 'Empty string');
});

test('SyslogJS.addRowToLogData - maxSize is less or equals 1', function(){
  var logData = [];
  var maxSize = 0;
  var logLine = 'May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'';

  throws
    (function(){
      SyslogJS.addRowToLogData(logData, logLine, maxSize);
    },  'Raises error in case of invalid size'
  );
});

test('SyslogJS.addRowToLogData - maxSize is NaN', function(){
  var logData = [];
  var logLine = 'May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'';
  
  throws
    (function(){
      SyslogJS.addRowToLogData(logData, logLine, NaN);
    },  'Raises error in case of size is NaN'
  );
});

//Success callback test
test('SyslogJS.addRowToLogData - success callback test', function(){
  expect(2);
  var logData = [];
  var maxSize = 3;
  var logLine = 'May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'';
  
   SyslogJS.addRowToLogData(logData,logLine, maxSize, {'onSuccess' : function(parsedLine){
      ok(true, 'addRowToLogData calls onSuccess callback')
   }});
   
    var result = SyslogJS.addRowToLogData(logData, logLine, maxSize);
    equal(result.length, 2, 'Result contains all the data');
});

//Failure callback test
test('SyslogJS.addRowToLogData - failure callback test', function(){
  expect(2);
  var logData = [];
  var logLine = '  17:43:28 anacron[6618]: Normal exit (0 jobs run)';
  var maxSize = 3;
  
   SyslogJS.addRowToLogData(logData,logLine,maxSize, {'onFailure' : function(parsedLine){
      ok(true, 'addRowToLogData calls onFailure callback')
   }});
    var result = SyslogJS.addRowToLogData(logData, logLine, maxSize);
    equal(result.length, 0, 'Result contains no data');
   
});

//Truncate the last element test
test('SyslogJS.addRowToLogData - truncate the last element test', function(){
  var logData = [];
  var maxSize = 1;
  var logLine = 'May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'';
  
  var result = SyslogJS.addRowToLogData(logData, logLine, maxSize);

  var result = SyslogJS.addRowToLogData(logData, logLine, maxSize);
  equal(result.length, 1, 'Result contains all the data');
});

test('SyslogJS.fillLogData - fill log data test', function(){
  var syslogLines = ['May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'',
	    'May 10 15:09:01 hex CRON[5222]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)'];
  var logData = SyslogJS.fillLogData(syslogLines, 2);
  equal(logData.length, 2, 'Result contains all lines');
});

test('SyslogJS.addRowToLogData - truncate rows', function(){
  var syslogLines = ['May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'',
	    'May 10 15:09:01 hex CRON[5222]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)'];
  var logData = SyslogJS.fillLogData(syslogLines, 2);
  SyslogJS.fillTable('#sysTable tbody', logData, 1);
  
  equal($('#sysTable tbody').children().length, 1, 'Table contains one row');
   
});

test('SyslogJS.addRowToTable - maxSize is <=0', function(){
  var logData = [];
  var logLine = 'May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'';
  
  throws
    (function(){
      SyslogJS.addRowToTable(logData, logLine, 0);
    },  'Raises error in case of size is NaN'
  );
});


test('SyslogJS.fillTable - fills table with parsed log entries', function(){
  var syslogLines = ['May 10 14:56:20 hex anacron[4648]: Normal exit (1 job run)\'',
	    'May 10 15:09:01 hex CRON[5222]: (root) CMD (  [ -x /usr/lib/php5/maxlifetime ] && [ -d /var/lib/php5 ] && find /var/lib/php5/ -depth -mindepth 1 -maxdepth 1 -type f -cmin +$(/usr/lib/php5/maxlifetime) ! -execdir fuser -s {} 2>/dev/null \; -delete)'];
  var logData = SyslogJS.fillLogData(syslogLines, 2);
  SyslogJS.fillTable('#sysTable tbody', logData, logData.length);
  
  equal($('#sysTable tbody').children().length, logData.length, 'Table contains all the data');
  
});









