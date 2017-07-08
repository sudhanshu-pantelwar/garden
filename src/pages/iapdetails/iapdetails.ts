import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PremiumProvider } from '../../providers/premium/premium';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import {markdown} from 'markdown';

declare var showdown;
/**
 * Generated class for the IapdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
    this.itemPurchased = localStorage.getItem('itemPurchased');
    console.log(this.itemPurchased);
    if(this.itemPurchased == null){
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
    }
    else{

    }
      
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
    this.navCtrl.push('PremiumcontentPage');
    localStorage.setItem('itemPurchased', 'yes');
    // this.iap
    //     .subscribe('dailygardening.yearly')
    //     .then((data)=> {
    //       localStorage.setItem('itemPurchased', 'yes');
    //       alert(JSON.stringify(data));
    //       console.log("productBuy",JSON.stringify(data));
    //       this.navCtrl.push('PremimumcontentPage');
    //     })
    //     .catch((err)=> {
    //       console.log("error", JSON.stringify(err));
    //     });
  }

accessPremiumContent(){
  this.navCtrl.push('PremiumcontentPage');
}

}
