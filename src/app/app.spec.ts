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

  it('links to the privacy and legal pages from the footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const privacy = el.querySelector<HTMLAnchorElement>('footer [data-testid="footer-privacy"]');
    const legal = el.querySelector<HTMLAnchorElement>('footer [data-testid="footer-legal"]');

    expect(privacy?.textContent?.trim()).toBe('Privacy');
    expect(privacy?.getAttribute('href')).toBe('https://screamxy.github.io/apps/kingscup/privacy/');
    expect(legal?.textContent?.trim()).toBe('Legal');
    expect(legal?.getAttribute('href')).toBe('https://screamxy.github.io/legal/');
  });
});
