import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { SqliteProvider } from '../../providers/sqlite/sqlite';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

data = { type:"", amount: 0 };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    public sqliteProvider: SqliteProvider) {
      this.getCurrentData(navParams.get("id"));
  }

  getCurrentData(id){
    this.sqliteProvider.getCurrentData(id);
  }

  updateData(id) {
    this.sqliteProvider.getCurrentData(id);
    this.toast.show('Updated History', '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
    this.navCtrl.popToRoot();
  }


}
