import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PremiumdetailsPage } from './premiumdetails';

@NgModule({
  declarations: [
    PremiumdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PremiumdetailsPage),
  ],
  exports: [
    PremiumdetailsPage
  ]
})
export class PremiumdetailsPageModule {}
