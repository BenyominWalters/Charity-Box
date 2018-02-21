import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
    public sqliteProvider: SqliteProvider,
    private alertCtrl: AlertController){
    this.sqliteProvider.load();
    }

    ionViewWillEnter() {
      this.sqliteProvider.load();
      this.sqliteProvider.totals();
    }

    editData(id){
      console.log(id + 'history page');
      this.navCtrl.push(EditDataPage, {id:id});
    }

    deleteData(id){
      let alert = this.alertCtrl.create({
        title: 'Delete Charity?',
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: 'Delete',
            handler: () => {
              this.sqliteProvider.deleteData(id);
            }
          }
        ]
      });
      alert.present();
    }

}
