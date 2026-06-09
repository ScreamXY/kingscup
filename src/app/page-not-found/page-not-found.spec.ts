import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageNotFound } from './page-not-found';

describe('PageNotFound', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
  });

  it('shows the not-found message and a link back home', async () => {
    const fixture = TestBed.createComponent(PageNotFound);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Not in this hand');
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/home');
  });
});
