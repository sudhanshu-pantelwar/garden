import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { ContentfulProvider } from '../providers/contentful/contentful';
import * as moment from 'moment';
// import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'welcome';
  time: any;
  constructor(public contentfulProvider: ContentfulProvider, private oneSignal: OneSignal, private localNotifications: LocalNotifications, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
        // let day = localStorage.getItem("day");
      // time = moment().format('YYYYMMDD, h:mm:ss');

      //     console.log("time",time.slice(0,7));
      // console.log("time2", time);
      this.localNotifications.schedule({
            id:1,
            title: "Garden",
            text: "New Content Available",
            every: 'minute'
            // icon: 'file://icon.png',
            // smallIcon: 'http://www.concordmonitor.com/App_Themes/nne-universal-structure/socialicons/youtubeicon-color.png'
        });
      this.time = localStorage.getItem('time');
      // alert("time"+this.time);
        if(this.time == 'NaN' || this.time == '' || this.time == 'undefined' || this.time == null || this.time=='null'){
          this.time = moment().format('YYYYMMDD,hh:mma');
          
          let res = this.time.split(",");
          console.log("day", res[0], "time", res[1]);
          // alert("res0 "+res[0]);
          localStorage.setItem('day', res[0]);
          localStorage.setItem('time', res[1]);
          localStorage.setItem('daycount', '1');
        }
        // let time = localStorage.getItem('time');
      let dayPrevious = localStorage.getItem('day');
      let timePrevious = localStorage.getItem('time');
      let timeToday = moment().format('YYYYMMDD,hh:mma');
      let res = timeToday.split(",");
      console.log("day", res[0], dayPrevious, res[1]);
      if(res[0] != dayPrevious && res[1] == timePrevious){
        console.log("come on come on");
        localStorage.setItem('day', res[0]);
        var dayCount = localStorage.getItem('daycount');
        
        contentfulProvider.getTitle().then((val) => { 
        
        var me = val;
        this.localNotifications.schedule({
            id:1,
            title: me.title,
            text: me.content,
            every: 'day'
            // icon: 'file://icon.png',
            // smallIcon: 'http://www.concordmonitor.com/App_Themes/nne-universal-structure/socialicons/youtubeicon-color.png'
        });
        let dayCount1 = parseInt(dayCount);
        dayCount1 = dayCount1 + 1;
        let dayCount2 = dayCount1.toString();
        localStorage.setItem('daycount', dayCount2);
        // console.log(this.imageURL);
        });
      }

      this.localNotifications.update({
        
      })

      this.localNotifications.on("trigger", nofication => {
        var dayCount = localStorage.getItem('daycount');
        let dayCount1 = parseInt(dayCount);
        dayCount1 = dayCount1 + 1;
        let dayCount2 = dayCount1.toString();
        localStorage.setItem('daycount', dayCount2);
      })
      
      let adCount = localStorage.getItem('adcount');
      console.log("addCount", adCount);
      if(adCount == 'NaN' || adCount == '' || adCount == 'undefined'){
        localStorage.setItem('adcount', '0');
      }
      
      

      this.oneSignal.startInit('a5fc3b7a-31bf-4e8e-9716-992179213f10', '447982427901');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
        alert("Recieved");
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        alert("notification opened");
      });

      this.oneSignal.endInit();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

