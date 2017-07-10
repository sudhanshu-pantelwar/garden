import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OneSignal } from '@ionic-native/onesignal';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { ContentfulProvider } from '../providers/contentful/contentful';
import { HttpModule } from '@angular/http';
import { PremiumProvider } from '../providers/premium/premium';
import { MiscProvider } from '../providers/misc/misc';
import { ModalPage } from '../pages/modal/modal';
@NgModule({
  declarations: [
    MyApp,
    ModalPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalPage
  ],
  providers: [
    InAppPurchase,
    AdMobFree,
    OneSignal,
    LocalNotifications,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContentfulProvider,
    PremiumProvider,
    MiscProvider
  ]
})
export class AppModule {}
