import { Component, Input, OnInit } from '@angular/core';
import { CardRulesService } from '../services/card-rules.service';
import { Card } from '../shared/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  set card(value: string) {
    this._card = value;
    this.ruleText = this.cardRulesService.getRuleText(value);
  }
  get card(): string {
    return this._card;
  }
  @Input() zoom = 1;
  @Input() showFace = true;

  private _card: string;
  public ruleText: Card;

  constructor(private cardRulesService: CardRulesService) {}

  ngOnInit() {}
}
