import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Logical Disconnect';
  constructor(
    private renderer: Renderer2,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.applyTheme();
    // Check if there is a redirect query parameter
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect');

    if (redirectUrl) {
      // Remove the redirect query parameter from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Navigate to the original URL
      this.router.navigateByUrl(redirectUrl);
    }
  }

  applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      console.log('prefersDarkScheme:', prefersDarkScheme);

      if (prefersDarkScheme) {
        console.log('Applying dark theme');
        this.renderer.addClass(document.body, 'dark');
      } else {
        console.log('Applying light theme');
        this.renderer.addClass(document.body, 'light');
      }

      // Listen for changes in the preference
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          const newColorScheme = e.matches ? 'dark-theme' : 'light-theme';
          console.log('Color scheme changed to:', newColorScheme);
          this.renderer.removeClass(document.body, 'dark-theme');
          this.renderer.removeClass(document.body, 'light-theme');
          this.renderer.addClass(document.body, newColorScheme);
        });
    }
  }
}
