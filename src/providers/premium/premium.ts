import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var contentful;
/*
  Generated class for the ContentfulProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PremiumProvider {
  client: any;
  static data: any;
  constructor(public http: Http) {
    console.log('Hello ContentfulProvider Provider');
    this.client = contentful.createClient({
        space: 'unqhcgs40ecf',
        accessToken: '831da18e7aa8aaac0c17e48b76be7392453f09c73e87cbaf3bd19ea52f9e324a'
    });
    
    
  }

  premiumData(){
    return this.client.getEntries()
    .then(entries => {
      // log the title for all the entries that have it
      entries.items.forEach(function (entry) {
        // alert("dayField "+dayField);
        console.log("premiumentry 1",entry);
        try {
          if(entry.fields.category.fields.title == 'Garden' && entry.fields.title == 'Upgrade To Premium'){
            console.log(entry);
            PremiumProvider.data = entry.fields;
            console.log("sud", entry.fields.title);
          }

        } catch (error) {
          console.log(error);
        }
        
      })
      return PremiumProvider.data;
    })
    // console.log(ContentfulProvider.title);
  }



}
