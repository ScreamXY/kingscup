import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('creates the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the navigation links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Home');
    expect(text).toContain('Game');
    expect(text).toContain('Settings');
  });

  it('links to the privacy and legal pages from the bottom of the drawer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    // The drawer content is always rendered (it is only translated off-screen
    // when closed), so the links can be queried without opening it.
    const drawer = (fixture.nativeElement as HTMLElement).querySelector('mat-sidenav');
    const privacy = drawer?.querySelector<HTMLAnchorElement>('[data-testid="footer-privacy"]');
    const legal = drawer?.querySelector<HTMLAnchorElement>('[data-testid="footer-legal"]');

    expect(drawer).not.toBeNull();

    expect(privacy?.textContent?.trim()).toBe('Privacy');
    expect(privacy?.getAttribute('href')).toBe('https://screamxy.github.io/apps/kingscup/privacy/');
    expect(legal?.textContent?.trim()).toBe('Legal');
    expect(legal?.getAttribute('href')).toBe('https://screamxy.github.io/legal/');
  });
});
