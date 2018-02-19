import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Storage } from '@ionic/storage';

import { SqliteProvider } from '../../providers/sqlite/sqlite';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqliteProvider: SqliteProvider){
    this.sqliteProvider.load();
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
          this.sqliteProvider.load();
          console.log('Async operation has ended');
          refresher.complete();
        }, 2000);
      }

}
