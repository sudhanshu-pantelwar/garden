import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PremiumcontentPage } from './premiumcontent';

@NgModule({
  declarations: [
    PremiumcontentPage,
  ],
  imports: [
    IonicPageModule.forChild(PremiumcontentPage),
  ],
  exports: [
    PremiumcontentPage
  ]
})
export class PremiumcontentPageModule {}
