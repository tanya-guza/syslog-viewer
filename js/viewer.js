/**
 * SyslogJS - mini JavaScript  library which allows update table with syslog entries.
 * Tested in Chrome Version 26.0.1410.63 and Firefox 20.0
 * Uses syslog format from Ubuntu
 * Expects table to have such configuration of columns:
 *      <table>
 *	  <thead>
 *	   <tr>
 *	     <th>Date</th>
 *	     <th>Time</th>
 *	     <th>Hostname</th>
 *	     <th>Source</th>
 *	     <th>PID</th>
 *	     <th>Message</th>
 *	   </tr>
 *	  </thead>
 *	  <tbody></tbody>
 *     </table>
 * Tanya Guza <tanya.guza@gmail.com>
 * 
 * Future plans:
 *  - pagination
 *  - configurable number of columns
 *  - parsing of log level(if exists)
 */
var SyslogJS = {
  
  /**
  * Parses line is syslog format and transforms it into array
  * @param logLine input line with string in syslog format
  * @return array with decomposed components - date, time, hostname, facility, pid(if available),  message
  */
  parseLine : function(logLine){
    
    // Regex is quite big because we need to be rather flexible with hostnames
    var syslogMatch = logLine.match(/^(\w{3}\s\d{1,2})\s(\d{2}:\d{2}:\d{2})\s((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)\s([a-z,A-Z,\-,\.]+)\[?(\d+)?\]?:(.*)$/);
    
    syslogMatch.shift();
    
    return syslogMatch;
  },

  /**
  * Adds array with parsed syslog message to given array
  * @param logData array with parsed log lines represented as array
  * @param syslogLine input string in syslog format
  * @param maxSize maximal size of logData after which array will be truncated
  * to keep the same number of records. If logData.length equals to maxSize
  * new record is added to the begining of array and the oldest record is removed
  * from the end.
  * @param updateCallback optional callback which is called after data was added to array
  * with parsed log entries. Can be used for updating UI
  * @return modified array with parsed log records
  */
  addRowToLogData : function(logData, syslogLine, maxSize, updateCallback){
    if(logData.length == maxSize){
      logData.pop();
    }
    var parsedLine = this.parseLine(syslogLine);
    logData.unshift(parsedLine); 
    
    if ( typeof (updateCallback) == 'function'){
      updateCallback(parsedLine);
    }
    
    return logData;
  },

  /** 
  * Fills array with parsed log entries from given
  * array of syslog lines.
  * @param logLines input array with syslog-formatted strings
  * @param size number of entries
  * @return created array of parsed log entries
  */
  fillLogData : function(logLines, size){
    var logData = [];
    for(i = 0; i < logLines.length; i++){
      this.addRowToLogData(logData, logLines[i], size);
    }
    
    return logData;
  },

  /**
  * Prepends row to the table. Adds new tr to the begining and removes last one
  * @param tableId table identifier
  * @param logData array with parsed log lines represented as array
  * @param maxSize determines maximal size after which last table row should be truncated
  */
  addRowToTable : function(tableId, logData, maxSize){
    var row = '<tr>' +
    '<td>' + logData[0] + '</td>' + '<td>' + logData[1] + '</td>' + '<td>' + logData[2] + '</td>' + '<td>' + logData[3] + '</td>' + 
    '<td>' + logData[4] + '</td>' + '<td>' + logData[5] + '</td>'  +
    '</tr>';
      $(tableId).prepend(row);
      
      if($(tableId).children().length > maxSize){
	console.log($(tableId).children().last().remove());
      }
  },

  /**
  * Fills table with parsed log entries
  * @param tableId table identifier
  * @param logData array with parsed log lines represented as array 
  */
  fillTable : function(tableId, logData){
    $(tableId).empty();
    for(i = 0; i < logData.length; i++){
      this.addRowToTable(tableId, logData[i]);
    }
  }

}