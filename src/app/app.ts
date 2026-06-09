import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { AppTitleStrategy } from './app-title-strategy';
import { routes } from './app.routes';
import { Card } from './card/card';

interface NavLink {
  path: string;
  label: string;
  testId: string;
}

/** The sidenav entries, derived from the routes so labels and titles never drift. */
const NAV_LINKS: readonly NavLink[] = routes.flatMap((route) =>
  route.path && route.path !== '**' && typeof route.title === 'string'
    ? [{ path: `/${route.path}`, label: route.title, testId: `nav-${route.path}` }]
    : [],
);

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    Card,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly breakpointObserver = inject(BreakpointObserver);

  public readonly links = NAV_LINKS;

  /** True on narrow viewports, where the sidenav becomes an overlay drawer. */
  public readonly isHandset = toSignal(
    this.breakpointObserver.observe('(max-width: 959.98px)').pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  /** The current route's title, shown in the toolbar. */
  public readonly pageTitle = inject(AppTitleStrategy).pageTitle;

  public closeIfHandset(drawer: MatSidenav): void {
    if (this.isHandset()) {
      void drawer.close();
    }
  }
}
