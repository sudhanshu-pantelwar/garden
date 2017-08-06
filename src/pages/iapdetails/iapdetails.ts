import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PremiumProvider } from '../../providers/premium/premium';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import {markdown} from 'markdown';

declare var showdown;

@IonicPage({
  // name: 'iapdetials'
})
@Component({
  selector: 'page-iapdetails',
  templateUrl: 'iapdetails.html',
})
export class IapdetailsPage {
  title: any;
  price: any;
  buttonText: any;
  buttonColour: any;
  imageURL: any;
  content: any;
  itemPurchased: any;
  constructor(public iap:InAppPurchase, public premiumProvider: PremiumProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let val: any;
    val = this.navParams.get('content');
    // this.itemPurchased = localStorage.getItem('itemPurchased');
    // console.log(this.itemPurchased);
    // if(this.itemPurchased == null){
      // this.premiumProvider.premiumData().then((val) => { 
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
        // });
      
      
  }

subscribeProduct(){
    this.navCtrl.push('PremiumcontentPage');
    this.iap
          .getProducts(['dailygardening.yearly'])
          .then((products) => {
            console.log(JSON.stringify(products));
              //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
          })
          .catch((err) => {
            console.log(err);
          });
    localStorage.setItem('itemPurchased', 'yes');
  }


}
