import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '@app/models/routes';
import { SafeHtmlPipe } from '@app/pipes/SafeHtml.pipe';


@Component({
  selector: 'navigation',
  imports: [RouterLink, RouterLinkActive, SafeHtmlPipe],
  templateUrl: './navigation.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  protected readonly items = [
    {
      icon: `<path stroke="currentColor" stroke-width="1.5" d="M8.137 2.22a3.25 3.25 0 0 1 3.726 0l5.575 3.901a4.251 4.251 0 0 1 1.812 3.483V16A4.25 4.25 0 0 1 15 20.25h-.5c-.69 0-1.25-.56-1.25-1.25v-2.099a2.75 2.75 0 0 0-2.75-2.75h-.624a2.75 2.75 0 0 0-2.75 2.75V19c0 .69-.56 1.25-1.25 1.25H5A4.25 4.25 0 0 1 .75 16V9.604c0-1.387.676-2.688 1.813-3.483L8.136 2.22Z"/>`,
      label: "Home",
      href: routes.dashboard,
    },
    {
      icon: `<g fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M6.222 4.601a9.5 9.5 0 0 1 1.395-.771c1.372-.615 2.058-.922 2.97-.33c.913.59.913 1.56.913 3.5v1.5c0 1.886 0 2.828.586 3.414s1.528.586 3.414.586H17c1.94 0 2.91 0 3.5.912c.592.913.285 1.599-.33 2.97a9.5 9.5 0 0 1-10.523 5.435A9.5 9.5 0 0 1 6.222 4.601Z"/><path d="M21.446 7.069a8.03 8.03 0 0 0-4.515-4.515C15.389 1.947 14 3.344 14 5v4a1 1 0 0 0 1 1h4c1.657 0 3.053-1.39 2.446-2.931Z"/></g>`,
      label: "Analytics",
      href: routes.analytics,
    },
    {
      icon: `<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" opacity=".5"><path d="M19.954 4.029H3.227c-.904 0-1.636.932-1.636 2.083v12.497c0 1.15.732 2.082 1.636 2.082h16.727c.904 0 1.637-.932 1.637-2.082V6.112c0-1.15-.733-2.083-1.637-2.083ZM21.59 10h-20"/><circle cx="13.591" cy="16" r="2"/><circle cx="17.591" cy="16" r="2"/></g>`,
      label: "Cards",
      active: false,
      href: "/offcanvas-example",
    },
    {
      icon: `<g stroke="currentColor" stroke-width="1.5" opacity=".5"><rect width="7.926" height="7.926" x="8.628" y="2.701" rx="3.963"/><path d="M12.59 13.446c1.93 0 3.644.545 4.856 1.384 1.215.841 1.865 1.927 1.865 3.029a3.415 3.415 0 0 1-3.415 3.415h-7.11A2.915 2.915 0 0 1 5.87 18.36c0-1.393.69-2.599 1.884-3.48 1.202-.889 2.907-1.433 4.836-1.433Z"/></g>`,
      label: "Profile",
      active: false,
      href: routes.dashboard,
    },
  ];
}
