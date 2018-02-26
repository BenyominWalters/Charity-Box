import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { BoxPage } from '../pages/box/box';
import { SettingsPage } from '../pages/settings/settings';
import { HistoryPage } from '../pages/history/history';
import { TabsPage } from '../pages/tabs/tabs';
import { EditDataPage } from '../pages/edit-data/edit-data';
import { DonatePage } from '../pages/donate/donate';

import { FaIconComponent } from '../components/fa-icon/fa-icon'
import { SqliteProvider } from '../providers/sqlite/sqlite';

@NgModule({
  declarations: [
    MyApp,
    BoxPage,
    SettingsPage,
    HistoryPage,
    TabsPage,
    EditDataPage,
    DonatePage,
    FaIconComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BoxPage,
    SettingsPage,
    HistoryPage,
    TabsPage,
    EditDataPage,
    DonatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    InAppBrowser,
    SqliteProvider
  ]
})
export class AppModule {}
