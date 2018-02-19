import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { SqliteProvider } from '../../providers/sqlite/sqlite';

@IonicPage()
@Component({
  selector: 'page-box',
  templateUrl: 'box.html',
})
export class BoxPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    public sqliteProvider: SqliteProvider){
    this.boxTotal();
  }

    setInput(amt: number) {
      this.sqliteProvider.data.amount = amt + this.sqliteProvider.data.amount;
      }
    saveData(){
      this.sqliteProvider.saveData();
      this.toast.show('Added to Box!', '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }

    boxTotal(){
      this.sqliteProvider.boxTotal();
    }

}
