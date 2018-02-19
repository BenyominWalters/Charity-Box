import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  gifts: any = []; //array of all data pulled from table
//  totalCharity: number = 0; //total put in charity box
//  totalDonated: number = 0; //total donated from charity box
//  boxValue: number = 0; //current amount in charity box

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,){
    this.load();
    }

      load(){
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {

            db.executeSql('CREATE TABLE IF NOT EXISTS account(id INTEGER NOT NULL PRIMARY KEY, type VARCHAR(16), amount FLOAT(32,2))', {})
              .then(() => console.log('Executed SQL'))
              .catch(e => console.log(JSON.stringify(e) + '1111111111'));

            //db.executeSql("INSERT INTO account (id, type, amount) VALUES (1, 'deposit', 180.25)", {})
            //  .then(() => console.log('Inserted SQL'))
            //  .catch(e => console.log(JSON.stringify(e) + 'insert insert'));

            db.executeSql('SELECT * FROM account ORDER BY id DESC', {})
              .then(res => {
                this.gifts = [];
                for(var i=0; i<res.rows.length; i++) {
                  this.gifts.push({id:res.rows.item(i).id,type:res.rows.item(i).type,amount:res.rows.item(i).amount})
                }
              })

          })
          .catch(e => console.log('222222222222'));
          console.log('Method')
      }

      doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
          this.load();
          console.log('Async operation has ended');
          refresher.complete();
        }, 2000);
      }

}
