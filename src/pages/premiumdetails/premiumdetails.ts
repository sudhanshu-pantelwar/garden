import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { ContentfulProvider } from '../../providers/contentful/contentful';
import {markdown} from 'markdown';
import { MiscProvider } from '../../providers/misc/misc';

declare var showdown;

/**
 * Generated class for the PremiumdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-premiumdetails',
  templateUrl: 'premiumdetails.html',
})
export class PremiumdetailsPage {
  title: any;
  content: any;
  imageURL: any;
  links: any;
  constructor(public misc: MiscProvider, private iap: InAppPurchase, public contentfulProvider: ContentfulProvider, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PremiumdetailsPage');
  }

}
