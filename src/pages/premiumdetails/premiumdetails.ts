import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { ContentfulProvider } from '../../providers/contentful/contentful';
import {markdown} from 'markdown';
import { MiscProvider } from '../../providers/misc/misc';

declare var showdown;

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
    let val = this.navParams.get('data');
    val = val.data;
    console.log("PRemIUM Data", val);
    this.title = val.title;
      let markContent = val.content;
      this.imageURL = 'https:'+val.image.fields.file.url;
      this.links = val.relatedLinks;

      var converter = new showdown.Converter();
      let htmlContent  = converter.makeHtml(markContent);
      var postProcess = function(text) {
          return text.replace(/<img\s+[^>]*src="([^"]*)"[^>]*>/g, '<img src='+'"https:'+'$1">');
      }

      this.content = postProcess(htmlContent);
  }

  

}
