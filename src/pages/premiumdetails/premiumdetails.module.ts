import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PremiumdetailsPage } from './premiumdetails';
import {ElasticHeaderDirectiveModule} from '../../directives/elastic-header/elastic-header.module';
@NgModule({
  declarations: [
    PremiumdetailsPage
  ],
  imports: [
    ElasticHeaderDirectiveModule,
    IonicPageModule.forChild(PremiumdetailsPage),
  ],
  exports: [
    PremiumdetailsPage
  ]
})
export class PremiumdetailsPageModule {}
