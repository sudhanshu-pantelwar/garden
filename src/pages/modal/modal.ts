import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, App, IonicApp } from 'ionic-angular';
import { PremiumProvider } from '../../providers/premium/premium';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { ContentfulProvider } from '../../providers/contentful/contentful';
import { markdown } from 'markdown';
import { MiscProvider } from '../../providers/misc/misc';

declare var showdown;
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  title: any;
  price: any;
  buttonText: any;
  buttonColour: any;
  imageURL: any;
  content: any;
  itemPurchased: any;
  premiumData: any;
  dataArray: any=[];
  data: any;
  constructor(public ionicApp: IonicApp, 
              public app: App, 
                     platform: Platform, 
              public viewCtrl: ViewController, 
              public iap:InAppPurchase, 
              public premiumProvider: PremiumProvider, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public misc: MiscProvider, 
              public contentfulProvider: ContentfulProvider) {
}

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    this.itemPurchased = localStorage.getItem('itemPurchased');
    console.log(this.itemPurchased);
      this.premiumProvider.premiumData().then((val) => { 
        // console.log("bro", val.backgroundImage.fields.file.url);
        this.title = val.title;
        this.price = val.price;
        let markContent = val.details;
        this.buttonText = val.buttonText;
        this.buttonColour = val.buttonColour;
        this.imageURL = 'https:'+val.backgroundImage.fields.file.url;
        var converter = new showdown.Converter();
        let htmlContent  = converter.makeHtml(markContent);
        var postProcess = function(text) {
            return text.replace(/<img\s+[^>]*src="([^"]*)"[^>]*>/g, '<img src='+'"https:'+'$1">');
        }

        this.content = postProcess(htmlContent);
        // console.log(this.content);
        });
      
      this.iap
          .getProducts(['dailygardening.yearly'])
          .then((products) => {
            // alert(JSON.stringify(products));
            console.log(JSON.stringify(products));
              //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
          })
          .catch((err) => {
            console.log(err);
          });
    }
      
      subscribeProduct(){
        localStorage.setItem('itemPurchased', 'yes');
        this.misc.startLoading();
        this.contentfulProvider.premimumContent().then((val) => { 
      // this.title = val.title;
      // this.imageURL = 'https:'+ val.image.fields.file.url;
      // console.log(this.imageURL);
        
        this.premiumData = val;
        for(let i=0;i<this.premiumData.length;i++){
          let title = this.premiumData[i].title;
          let image = "https:"+this.premiumData[i].image.fields.file.url;
          this.dataArray.push({
            'data': this.premiumData[i],
            'title': title,
            'image': image
          })
        }
          this.data = this.dataArray;
          console.log("modalData",this.data);
          this.viewCtrl.dismiss({data: this.data});
          this.misc.closeLoading();
        console.log(this.premiumData);
      }).catch((err) => {
        alert(err);
        this.misc.closeLoading();
      });
        
        // this.iap
        //     .subscribe('dailygardening.yearly')
        //     .then((data)=> {
        //       localStorage.setItem('itemPurchased', 'yes');
        //       alert(JSON.stringify(data));
        //       console.log("productBuy",JSON.stringify(data));
        //       localStorage.setItem('itemPurchased', 'yes');
        //       this.viewCtrl.dismiss();
        //     })
        //     .catch((err)=> {
        //       console.log("error", JSON.stringify(err));
        //     });
      }

     
// ...
}
