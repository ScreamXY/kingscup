import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.html',
  styleUrl: './impressum.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Impressum {}
