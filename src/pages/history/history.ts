import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EditDataPage } from '../edit-data/edit-data';
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

    ionViewWillEnter() {
      this.sqliteProvider.load();
    }

    editData(event, id){
      this.navCtrl.push(EditDataPage, {id:id});
    }

    deleteData(id){
      this.sqliteProvider.deleteData(id);
    };

}
