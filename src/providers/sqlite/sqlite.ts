import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class SqliteProvider {

    public gifts: any = []; //array of all data pulled from table
    public data = { id: "", type: "", amount: 0 };
    public historyTotal = 0;
    public donationTotal = 0;
    public boxTotal: any = 0;
    public settingsData = {boxMinimum: 0, charityEmail: "", charityName: ""};
    public currentSettings: any = []; //array of current settings from table

  constructor(public sqlite: SQLite) {
    console.log('Hello SqliteProvider Provider');
    this.boxTotal = this.historyTotal - this.donationTotal;
  }

  load(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS account(id INTEGER NOT NULL PRIMARY KEY, type VARCHAR(16), amount FLOAT(32,2))', {});

        db.executeSql('SELECT * FROM account ORDER BY id DESC', {})
          .then(res => {
            this.gifts = [];
            for(var i=0; i<res.rows.length; i++) {
              this.gifts.push({id:res.rows.item(i).id,type:res.rows.item(i).type,amount:res.rows.item(i).amount})
            }
          })

      });
  }

  saveData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO account VALUES(NULL,"deposit",round(?,2))',[this.data.amount])
        .then(res => {
          this.data.amount = 0;
        });
        this.totals();
    });
  }

  totals() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
    db.executeSql('SELECT SUM(amount) AS deposits FROM account WHERE type="deposit"',{})
      .then(res => {
        if(res.rows.length > 0){
          console.log('Executed SQL for deposits');
          this.historyTotal = res.rows.item(0).deposits;
          console.log(res.rows.item(0).deposits + 'deposits');
        }
      })
      .catch(e => console.log(JSON.stringify(e) + 'totals failed!!!'));
    });
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
    db.executeSql('SELECT SUM(amount) AS donations FROM account WHERE type="donation"',{})
    .then(res => {
      if(res.rows.length > 0){
        console.log('Executed SQL for donations');
        this.donationTotal = res.rows.item(0).donations;
        console.log(res.rows.item(0).donations + 'donations');
      }
    })
    .catch(e => console.log(JSON.stringify(e) + 'donations failed!!!'));
  });
  this.boxTotal = this.historyTotal - this.donationTotal;
  }


  deleteData(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM account WHERE id=?', [id])
      .then(res => {
        console.log(res);
        this.totals();
        this.load();
      })
      .catch(e => console.log(JSON.stringify(e) + 'delete failed!!!'));
    }).catch(e => console.log(e));
  }

  getCurrentData(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM account WHERE id=?', [id])
      .then(res => {
        if(res.rows.length > 0) {
          this.data.id = res.rows.item(0).id;
          this.data.type = res.rows.item(0).type;
          this.data.amount = res.rows.item(0).amount;
        }
      })
    })
  }

  updateData(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE account SET amount=? WHERE id=?', [this.data.amount,this.data.id])
      .then(res => {
      })
    })
  }

  donateBox() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO account VALUES(NULL,"donation",round(?,2))', [this.boxTotal])
        .then(res => {
          this.data.amount = 0;
          console.log(res);
        })
        .catch(e => {
          console.log(JSON.stringify(e));
        });
        this.totals();
      }).catch(e => {
        console.log(JSON.stringify(e));
        });
  }

  loadSettings(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS settings(id INTEGER NOT NULL PRIMARY KEY, boxMinimum FLOAT(32,2) default 1, charityEmail VARCHAR(16), charityName VARCHAR(16))', {})
        .catch(e => {
          console.log(JSON.stringify(e));
        })
        .then(res => {
          db.executeSql('SELECT * FROM settings Where id=1', {})
          .then(res => {
            if(res.rows.length === 0){
              db.executeSql('INSERT INTO settings VALUES(1,18.00,"info@clhds.com","Cheder Lubavitch")',{})
                .then(res => {
                  this.data.amount = 0;
                  console.log(res);
                });
            }

          });

        });
        db.executeSql('SELECT * FROM settings Where id=1', {})
          .then(res => {
            this.currentSettings = [];
              this.currentSettings.push({id:res.rows.item(0).id,boxMinimum:res.rows.item(0).boxMinimum,charityEmail:res.rows.item(0).charityEmail,charityName:res.rows.item(0).charityName})

          })
          .catch(e => {
            console.log(JSON.stringify(e));
          });
      });
  }

  updateSettings() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE settings SET boxMinimum=?, charityEmail=?, charityName=? WHERE id=1',[this.settingsData.boxMinimum, this.settingsData.charityEmail, this.settingsData.charityName])
        .then(res => {
          console.log('++++++++++Updated Your Settings');
          console.log(res);
        })
        .catch(e => {
          console.log(JSON.stringify(e));
        });
      }).catch(e => {
        console.log(JSON.stringify(e));
        });

  }

}
