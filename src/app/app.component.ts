import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { CardRulesService } from './services/card-rules.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "King's Cup";

  constructor(private cardRulesService: CardRulesService, public media: ObservableMedia) {
    this.cardRulesService.initRules();
  }

  public menuItemClick(route) {
    // $location.path(route);
    // $mdSidenav('left').toggle();
  }
}
