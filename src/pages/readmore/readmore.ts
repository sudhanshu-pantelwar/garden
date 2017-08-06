import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { ContentfulProvider } from '../../providers/contentful/contentful';
import { markdown } from 'markdown';
import { MiscProvider } from '../../providers/misc/misc';

declare var showdown;

@IonicPage()
@Component({
  selector: 'page-readmore',
  templateUrl: 'readmore.html',
})
export class Readmore {
  title: any;
  content: any;
  imageURL: any;
  links: any;
  constructor(public misc: MiscProvider, private iap: InAppPurchase, public contentfulProvider: ContentfulProvider, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateTo(){
    console.log('aaya');
    this.navCtrl.push('IapdetailsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Readmore');
    let val: any;
    val = this.navParams.get('content');
    // this.contentfulProvider.getTitle().then((val) => { 
      this.misc.closeLoading();
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
      // }).catch((err) => {
      //   alert(err);
      //   this.misc.closeLoading();
      // });
  }

  pop(){
    this.navCtrl.pop();
  }

  openLink(link){
    const browser = this.iab.create(link);
  }

  test(){
    this.navCtrl.push('PremiumcontentPage');
  }
}
