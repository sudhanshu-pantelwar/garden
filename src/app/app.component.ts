import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { ContentfulProvider } from '../providers/contentful/contentful';
import * as moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'welcome';
  time: any;
  constructor(public contentfulProvider: ContentfulProvider, private oneSignal: OneSignal, private localNotifications: LocalNotifications, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
        
        // this.localNotifications.schedule({
        //     id:1,
        //     title: "Garden",
        //     text: "New Content Available",
        //     at: d,
        //     every: 'day'
        //     // icon: 'file://icon.png',
        //     // smallIcon: 'http://www.concordmonitor.com/App_Themes/nne-universal-structure/socialicons/youtubeicon-color.png'
        // });
      
      
      this.time = localStorage.getItem('time');
        if(this.time == 'NaN' || this.time == '' || this.time == 'undefined' || this.time == null || this.time=='null'){
          this.time = moment().format('YYYYMMDD,hh:mma');
          
          let res = this.time.split(",");
          console.log("day", res[0], "time", res[1]);
          localStorage.setItem('day', res[0]);
          localStorage.setItem('time', res[1]);
          localStorage.setItem('daycount', '1');
          this.scheduleNotification();
        } 
        
      
      let day = localStorage.getItem('dayCount');
      
      this.localNotifications.on("trigger", nofication => {
        var dayCount = localStorage.getItem('daycount');
        let dayCount1 = parseInt(dayCount);
        dayCount1 = dayCount1 + 1;
        let dayCount2 = dayCount1.toString();
        localStorage.setItem('daycount', dayCount2);
        this.scheduleNotification();
      })


      let adCount = localStorage.getItem('adcount');
      console.log("addCount", adCount);
      if(adCount == 'NaN' || adCount == '' || adCount == 'undefined'){
        localStorage.setItem('adcount', '0');
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  updateNotification(){
    var dayCount = localStorage.getItem('daycount');
    this.contentfulProvider.getNotificationContent(dayCount).then((val) => { 
            
            var me = val;
            this.localNotifications.update({
                id:1,
                title: me.title,
                text: me.content,
                firstAt: new Date(new Date().getTime() + 6 * 50000),
                at: new Date(new Date().getTime() + 6 * 50000),
                every: 'hour'
                // icon: 'file://icon.png',
                // smallIcon: 'http://www.concordmonitor.com/App_Themes/nne-universal-structure/socialicons/youtubeicon-color.png'
            });
            });
  }

  scheduleNotification(){
    // to get tomorrow's time
    // var d = new Date();
    // var hours = d.getHours();
    // var minutes = d.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // var minutesmore = minutes < 10 ? '0'+minutes : minutes;
    // var notTime = 'tomorrow_at_'+ hours +'_'+ampm;
    var dayCount = localStorage.getItem('daycount');
    let dayCount1 = parseInt(dayCount);
    dayCount1 = dayCount1 + 1;
    let dayCount2 = dayCount1.toString();
    var date  = new Date();
    date.setDate(date.getDate() + 1);
    this.contentfulProvider.getNotificationContent(dayCount2).then((val) => { 
            
            var me = val;
            this.localNotifications.schedule({
                id:1,
                title: me.title,
                text: me.content,
                firstAt: date,
                at: date,
                every: 'day'
                // icon: 'file://icon.png',
                // smallIcon: 'http://www.concordmonitor.com/App_Themes/nne-universal-structure/socialicons/youtubeicon-color.png'
            });
            });
  }
}



// this.oneSignal.startInit('a5fc3b7a-31bf-4e8e-9716-992179213f10', '447982427901');

//       this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

//       this.oneSignal.handleNotificationReceived().subscribe(() => {
//       // do something when notification is received
//         alert("Recieved");
//       });

//       this.oneSignal.handleNotificationOpened().subscribe(() => {
//         // do something when a notification is opened
//         alert("notification opened");
//       });

//       this.oneSignal.endInit();