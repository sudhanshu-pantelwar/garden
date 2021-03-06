import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { ContentfulProvider } from '../../providers/contentful/contentful';
import { MiscProvider } from '../../providers/misc/misc';
import { markdown } from 'markdown';
import { Storage } from '@ionic/storage';

declare var showdown;
/**
 * Generated class for the FirstPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'welcome'
})
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {
  title: any;
  content: any;
  imageURL: any;
  adCount: any;
  pushContent: any;
  flag: any;
  constructor(public misc: MiscProvider, 
              public contentfulProvider: ContentfulProvider, 
              private admobFree: AdMobFree, 
              private localNotifications: LocalNotifications, 
              public navCtrl: NavController,
              private storage: Storage) {
  }

  ionViewDidLoad(){
    console.log(this.adCount);
    
    // this.contentfulProvider.getTitle().then((val) => { 
    //   this.pushContent = val;
    //   this.title = val.title;
    //   var markContent = val.content.slice(0,140);
    //   this.imageURL = 'https:'+ val.image.fields.file.url;
    //   this.misc.closeLoading();
    //   var converter = new showdown.Converter();
    //   let htmlContent  = converter.makeHtml(markContent);
    //   var postProcess = function(text) {
    //       return text.replace(/<img\s+[^>]*src="([^"]*)"[^>]*>/g, '<img src='+'"https:'+'$1">');
    //   }

    //   this.content = postProcess(htmlContent);
    //   // console.log(this.imageURL);
    //   }).catch((err) => {
    //     alert(err);
    //     this.misc.loading();
    //   });
    this.storage.get('daycount').then((value) => {
          alert(value);
          alert(this.storage.driver);
        })
    this.data();

    this.localNotifications.on('click', (success)=>{
        var me1 = this;
        setTimeout(function() {
          me1.refreshdata();
        }, 2000); 
        let dayCount;

        this.storage.get('daycount').then((value) => {
          dayCount = value;
          this.localNotifications.cancel(dayCount);
        })

    
        
        // this.adCount = localStorage.getItem('adcount');
        this.storage.get('adcount').then((value) => {
          this.adCount = value;
          this.adCount = parseInt(this.adCount);
        console.log(this.adCount);
        if(this.adCount == 2){
          // localStorage.setItem('adcount', '0');
          this.storage.set('adcount', '0');
          this.adCount = 0;
          const interstitialConfig: AdMobFreeInterstitialConfig = {
            isTesting: true,
            autoShow: true
          };

          this.admobFree.interstitial.config(interstitialConfig);

          // this.admobFree.banner.config(bannerConfig);

          this.admobFree.interstitial.prepare()
            .then(() => {
              
            })
            .catch(e => console.log(e));
        } else {
          this.adCount = this.adCount + 1;
          this.adCount = this.adCount.toString();
          this.storage.set('adcount', this.adCount);
          // localStorage.setItem('adcount', this.adCount);
        }
        })
        
        
        
        // alert("success");
        // const bannerConfig: AdMobFreeBannerConfig = {
        // // add your config here
        // // for the sake of this example we will just use the test config
        // isTesting: true,
        // autoShow: true
        // };
          
        
        
        

      //   this.admobFree.banner.prepare()
      //     .then(() => {
      //       // banner Ad is ready
      //       // if we set autoShow to false, then we will need to call the show method here
      //     })
      //     .catch(e => console.log(e));
      });
  }

  data(){
    this.misc.startLoading();
    this.contentfulProvider.getContent().then((val) => {
      let val1: any;
      val1 = val;
      this.pushContent = val1;
      this.title = val1.title;
      var markContent = val1.content.slice(0,140);
      this.imageURL = 'https:'+ val1.image.fields.file.url;
      
      var converter = new showdown.Converter();
      let htmlContent  = converter.makeHtml(markContent);
      var postProcess = function(text) {
          return text.replace(/<img\s+[^>]*src="([^"]*)"[^>]*>/g, '<img src='+'"https:'+'$1">');
      }

      this.content = postProcess(htmlContent);
      this.misc.closeLoading();
    
      // console.log(this.imageURL);
      }).catch((err) => {
        alert(err);
        this.misc.closeLoading();
      });
  }

  refreshdata(){
    this.misc.startLoading();
    this.contentfulProvider.getContent().then((val) => {
      let val1: any;
      val1 = val;
      this.pushContent = val1;
      this.title = val1.title;
      var markContent = val1.content.slice(0,140);
      this.imageURL = 'https:'+ val1.image.fields.file.url;
      
      var converter = new showdown.Converter();
      let htmlContent  = converter.makeHtml(markContent);
      var postProcess = function(text) {
          return text.replace(/<img\s+[^>]*src="([^"]*)"[^>]*>/g, '<img src='+'"https:'+'$1">');
      }

      this.content = postProcess(htmlContent);
      this.misc.closeLoading();
    
      // console.log(this.imageURL);
      }).catch((err) => {
        alert(err);
        this.misc.closeLoading();
      });
  }

  readMore(){
    this.navCtrl.push('Readmore', {'content': this.pushContent});
    this.misc.startLoading();
  }
}
