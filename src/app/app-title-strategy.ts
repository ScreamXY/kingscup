import { Injectable, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

/**
 * Resolves route titles exactly like the router's default strategy, but also
 * exposes the current title as a signal so the shell toolbar can show it —
 * one resolution path for both the document and the UI.
 */
@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  public readonly pageTitle = signal('');

  public override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(title);
    }
    this.pageTitle.set(title ?? '');
  }
}
