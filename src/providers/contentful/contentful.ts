import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentfulConfig } from '../../settings/settings.config';
declare var contentful;
/*
  Generated class for the ContentfulProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContentfulProvider {
  client: any;
  static data: any;
  static premiumArray: any=[];
  constructor(public http: Http) {
    console.log('Hello ContentfulProvider Provider');
    this.client = contentful.createClient({
        space: contentfulConfig.space,
        accessToken: contentfulConfig.accessToken
    });
    
    
  }

  getTitle(){
    return this.client.getEntries()
    .then(entries => {
      // log the title for all the entries that have it
      entries.items.forEach(function (entry) {
        let dayField = localStorage.getItem('daycount');
        // alert("dayField "+dayField);
        console.log(entry);
        if(entry.fields.day == dayField){
          console.log(entry);
          ContentfulProvider.data = entry.fields;
          console.log(entry.fields.title);
        }
      })
      return ContentfulProvider.data;
    })
    // console.log(ContentfulProvider.title);
  }

  getContent(){
    
    var promise = new Promise((resolve, reject) => {
      this.client.getEntries().then(entries => {
      // log the title for all the entries that have it
      entries.items.forEach(function (entry) {
        let dayField = localStorage.getItem('daycount');
        // alert("dayField "+dayField);
        console.log(entry);
        if(entry.fields.day == dayField){
          ContentfulProvider.data = entry.fields;
          resolve(ContentfulProvider.data);
        }
      })
    })
    })
    return promise;
  }

  getNotificationContent(day){
    return this.client.getEntries()
    .then(entries => {
      // log the title for all the entries that have it
      entries.items.forEach(function (entry) {
        
        // alert("dayField "+dayField);
        console.log(entry);
        if(entry.fields.day == day){
          console.log(entry);
          ContentfulProvider.data = entry.fields;
          console.log(entry.fields.title);
        }
      })
      return ContentfulProvider.data;
    })
    // console.log(ContentfulProvider.title);
  }

  premimumContent(){
    ContentfulProvider.premiumArray = [];
    var promise = new Promise((resolve, reject) => {
      this.client.getEntries()
        .then(entries => {
           entries.items.forEach(function (entry) {
        // alert("dayField "+dayField);
        console.log("premiumentry 1",entry);
        try {
          if(entry.fields.category[0].fields.title == contentfulConfig.category && entry.fields.day){
            ContentfulProvider.premiumArray.push(entry.fields);
          }

           } catch (error) {
          console.log(error);
        }
        
         })
          resolve(ContentfulProvider.premiumArray);
        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

}
