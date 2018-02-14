import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Storage } from '@ionic/storage';

import { BoxPage } from '../box/box';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  gifts: any = []; //charity
  totalCharity: number = 0; //total put in charity box
  totalDonated: number = 0; //total donated from charity box
  boxValue: number = 0; //current amount in charity box

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,){}


  ionViewDidLoad() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS gift(rowid INTEGER PRIMARY KEY, type TEXT, amount INT)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM gift ORDER BY rowid DESC', {})
      .then(res => {
        this.gifts = [];
        for(var i=0; i<res.rows.length; i++) {
          this.gifts.push({rowid:res.rows.item(i).rowid,type:res.rows.item(i).type,amount:res.rows.item(i).amount})
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalCharity FROM gift WHERE type="Charity"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalCharity = parseInt(res.rows.item(0).totalIncome);
          this.boxValue = this.totalCharity-this.totalDonated;
          console.log("----" + this.totalCharity + "----")
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalDonated FROM gift WHERE type="Donation"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalDonated = parseInt(res.rows.item(0).totalDonated);
          this.boxValue = this.totalCharity-this.totalDonated;
        }
      })
    }).catch(e => console.log(e));
  }

  addData() {
    this.navCtrl.push(BoxPage);
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM gift WHERE rowid=?', [rowid])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
