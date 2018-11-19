import { Injectable } from '@angular/core';
import { Card } from '../shared/Card';
import { Cards } from '../shared/Cards';

@Injectable({
  providedIn: 'root'
})
export class CardRulesService {
  private defaultRules: Cards;

  constructor() {
    this.defaultRules = {
      joker: {
        title: 'Have a smoke',
        text:
          'You are allowed smoke a cigarette even if you have to go away from the game. ' +
          'While you are away the others play on.'
      },
      ace: {
        title: 'Take a piss',
        text: 'You are allowed to go and take a piss. While you are away the others play on.'
      },
      two: {
        title: 'You',
        text: 'You drink two times.'
      },
      three: {
        title: 'Vicke',
        text:
          'You put your hands to your imitating viking helmet horns with your index fingers. ' +
          'You repeat vicke vicke and wiggle with your fingers. ' +
          'The person to the left has to row on their left side, ' +
          'person on the right on their right side.' +
          'The person with the vicke can pass it to anyone by pointing at them. ' +
          'The one who fucks up, drinks.'
      },
      four: {
        title: 'Whores',
        text: 'All the ladies in the game drink.'
      },
      five: {
        title: 'Imitate',
        text: 'Everyone has to imitate obvious things you do.'
      },
      six: {
        title: 'Dicks',
        text: 'All guys drink.'
      },
      seven: {
        title: 'Rules - Yes it does',
        text: 'Create a rule that is active for the whole game. You can extend rules made before.'
      },
      eight: {
        title: 'Choose a mate',
        text: 'Choose a drinking mate that drinks every time you have to drink because of a rule.'
      },
      nine: {
        title: 'Categories',
        text:
          'Pick a category. Everyone has to say something that fits in this category until ' +
          'someone says something that was already said or does not fit.'
      },
      ten: {
        title: 'Snake Eyes',
        text:
          'No one is allowed to look into your eyes until the next person has a ten. If they do they drink.'
      },
      jack: {
        title: 'I never have ever',
        text: 'I new have ever done something. Anyone who did has to drink.'
      },
      queen: {
        title: 'Questionmaster',
        text:
          'No one is allowed to answer questions from the questionmaster. If they do, they drink.'
      },
      king: {
        title: "King's Cup",
        text:
          'The first 3 people who pick a King have to pour some of their drink into the cup in the middle. ' +
          'Whoever picks the last King ends the game and loses. ' +
          'This person has to chug whatever is in the Kings Cup.'
      }
    };
  }

  public initRules(): void {
    const rulesInStore: Cards = JSON.parse(localStorage.getItem('rules'));
    if (!rulesInStore) {
      console.log('initRules');
      localStorage.setItem('rules', JSON.stringify(this.defaultRules));
    }
  }

  public getRuleText(cardName: string): Card {
    const rules: Cards = JSON.parse(localStorage.getItem('rules'));
    if (!rules) {
      this.initRules();
    }
    const card = cardName.split('_');
    if (card.indexOf('joker') > -1) {
      return rules['joker'];
    }
    return rules[card[1]];
  }

  public setRuleText(cardName: string, title: string, text: string): void {
    const rules: Cards = JSON.parse(localStorage.getItem('rules'));
    const card = cardName.split('_');
    if (card.indexOf('joker') > -1) {
      rules['joker'].title = title;
      rules['joker'].text = text;
    } else {
      rules[card[1]].title = title;
      rules[card[1]].text = text;
    }
    localStorage.setItem('rules', JSON.stringify(rules));
  }

  public clearAll(): void {
    console.log('clearAll');
    localStorage.clear();
    this.initRules();
  }
}
