import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { CurrencyPipe } from '@angular/common';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-box',
  templateUrl: 'box.html',
})
export class BoxPage {

  data = { amount:0 };
  total = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {}

  setInput(amt: number) {
    this.data.amount = amt + this.data.amount;
  }

  saveData() {
    console.log(this.data);
    this.total = this.total + this.data.amount;
    this.data.amount=0;
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO charity VALUES(NULL,?)',[this.data.amount])
        .then(res => {
          console.log(res);
          this.toast.show('Donation Saved!', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
