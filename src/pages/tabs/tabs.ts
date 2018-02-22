import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { BoxPage } from '../box/box';
import { DonatePage } from '../donate/donate';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HistoryPage;
  tab2Root = BoxPage;
  tab3Root = DonatePage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
