

//Scheduleing notification in number of days (day).
export function dayDelay(){
    var dayFlag = false;  // True, for 24 hours delay Else, minutes delay
    var day = 1;  // notification scheduled after 1 day
    var minutes = 3;  // notification scheduled after 5 minutes  
    if(dayFlag){
        var date  = new Date(); // To get the current date
        date.setDate(date.getDate() + day); // To add 24 hours delay

        var notificationTime = {
            scheduledDate: date,
            every: 'day'
        }
    } else{
        var dateNew = new Date(new Date().getTime() + 6 * minutes * 10000);
        var notificationTime = { 
            scheduledDate: dateNew, 
            every: 'hour' 
        }
    }
    
    return notificationTime;
}
