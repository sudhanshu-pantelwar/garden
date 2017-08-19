import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { ContentfulProvider } from '../providers/contentful/contentful';
import * as moment from 'moment';
import { dayDelay } from '../settings/settings.notification';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'welcome';
  time: any;
  day: any;
  constructor(public contentfulProvider: ContentfulProvider, 
              private oneSignal: OneSignal, 
              private localNotifications: LocalNotifications, 
              platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private storage: Storage) {
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
      
      
      // this.day = localStorage.getItem('daycount');
      this.storage.get('daycount').then((value) => {
        this.day = value;
        if(this.day == 'NaN' || this.day == '' || this.day == 'undefined' || this.day == null || this.day =='null' || typeof(this.day) == 'undefined'){
          this.storage.set('daycount', '1').then(()=> {
            this.scheduleNotification();
          });
          // localStorage.setItem('daycount', '1');
          
        } 
      })
        
        
      
      this.localNotifications.on("trigger", nofication => {
        // var dayCount = localStorage.getItem('daycount');
        this.storage.ready().then(() => {
          this.storage.get('daycount').then((value) => {
          let dayCount = value;
          let dayCount1 = parseInt(dayCount);
          dayCount1 = dayCount1 + 1;
          let dayCount2 = dayCount1.toString();
          // localStorage.setItem('daycount', dayCount2);
          this.storage.set('daycount', dayCount2).then(()=>{
            this.scheduleNotification();
          });
          
          })
        })
        
        
      })


      // let adCount = localStorage.getItem('adcount');
      this.storage.get('adcount').then((value) => {
        let adCount = value;
        console.log("addCount", adCount);
        if(adCount == 'NaN' || adCount == '' || adCount == 'undefined'){
          this.storage.set('adcount', '0');
          // localStorage.setItem('adcount', '0');
        }
      })
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // updateNotification(){
  //   var dayCount = localStorage.getItem('daycount');
  //   let dayCount1 = parseInt(dayCount);
  //   dayCount1 = dayCount1 + 1;
  //   let dayCount2 = dayCount1.toString();
  //   this.contentfulProvider.getNotificationContent(dayCount2).then((val) => { 
            
  //           var me = val;

  //           // to make 24 hours delay = dayDelay(1)
  //           // let dataDate = dayDelay(1);

  //           // to make 
  //           let dataDate = dayDelay();
  //           let newDate = dataDate.scheduledDate;
  //           let everyTime = dataDate.every;

  //           this.localNotifications.update({
  //               id:1,
  //               title: me.title,
  //               text: me.content
  //               // icon: 'file://icon.png',
  //               // smallIcon: 'http://www.concordmonitor.com/App_Themes/nne-universal-structure/socialicons/youtubeicon-color.png'
  //           });
  //           });
  // }

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
    // var dayCount = localStorage.getItem('daycount');
    this.storage.get('daycount').then((value) => {
      let dayCount1 = parseInt(value);
      dayCount1 = dayCount1 + 1;
      let dayCount2;
      dayCount2 = dayCount1.toString();
      this.contentfulProvider.getNotificationContent(dayCount2).then((val) => { 
              
              var me = val;

              // to make 24 hours delay = dayDelay(1)
              // let dataDate = dayDelay(1);

              // to make 
              let dataDate = dayDelay();
              let newDate = dataDate.scheduledDate;
              let everyTime = dataDate.every;
              this.localNotifications.schedule({
                  id: dayCount2,
                  title: me.title,
                  text: me.content,
                  // firstAt: newDate,
                  at: newDate,
                  // every: everyTime
                  // icon: 'file://icon.png',
                  // smallIcon: 'http://www.concordmonitor.com/App_Themes/nne-universal-structure/socialicons/youtubeicon-color.png'
              });
            });
    })
    
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