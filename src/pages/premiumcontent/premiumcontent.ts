import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentfulProvider } from '../../providers/contentful/contentful';
import { MiscProvider } from '../../providers/misc/misc';
import { ModalPage } from '../modal/modal';
/**
 * Generated class for the PremiumcontentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-premiumcontent',
  templateUrl: 'premiumcontent.html'
})
export class PremiumcontentPage {
  title: any;
  imageURL: any;
  premiumData: any;
  dataArray: any=[];
  constructor(public modalCtrl:ModalController, public misc: MiscProvider, public contentfulProvider: ContentfulProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  ionViewCanEnter(){
    let itemPurchased = localStorage.getItem("itemPurchased");
    if(itemPurchased!="yes"){
      this.presentModal();
    }
  }

  ionViewDidLoad() {
    this.dataArray = [];
    this.misc.startLoading();
    this.contentfulProvider.premimumContent().then((val) => { 
      // this.title = val.title;
      // this.imageURL = 'https:'+ val.image.fields.file.url;
      // console.log(this.imageURL);
        this.misc.closeLoading();
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
        console.log(this.premiumData);
      }).catch((err) => {
        alert(err);
        this.misc.closeLoading();
      });
  }

  details(data){
    // console.log(data);
    this.navCtrl.push('PremiumdetailsPage', { 'data': data });
  }

}
