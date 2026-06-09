import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFound {}
