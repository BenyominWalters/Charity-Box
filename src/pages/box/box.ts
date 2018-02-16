import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-box',
  templateUrl: 'box.html',
})
export class BoxPage {

  data = { type:"", amount: 0 };
//  total = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private toast: Toast,
    private sqlite: SQLite){}


    setInput(amt: number) {
      this.data.amount = amt + this.data.amount;
      }

    saveData() {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO account VALUES(NULL,"deposit",?)',[this.data.amount])
          .then(res => {
            console.log(res);
            })
          .catch(e => {
            console.log(e);
          });
      }).catch(e => {
        console.log(e);
      });
      this.data.amount = 0;
    }

}
