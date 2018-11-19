import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CardRulesService } from '../services/card-rules.service';
import { Card } from '../shared/Card';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private title = 'Settings';
  private edit = false;

  constructor(private cardRulesService: CardRulesService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  private clearAll(): void {
    this.edit = false;
    try {
      this.cardRulesService.clearAll();
      const snackBarRef = this.snackBar.open('Success');
    } catch (e) {
      console.log(e);
      const snackBarRef = this.snackBar.open('Error: This shit didn\'t work...');
    }
  }

  private getCardRule(cardName: string): Card {
    return this.cardRulesService.getRuleText(cardName);
  }

  private setCardRule(cardName: string, model: Card): void {
    return this.cardRulesService.setRuleText(cardName, model.title, model.text);
  }

}
