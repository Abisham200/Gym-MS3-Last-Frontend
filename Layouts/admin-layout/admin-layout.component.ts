import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {



  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.highlightActiveLink(event.urlAfterRedirects);
      }
    });
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    if (sidebar) {
      if (sidebar.classList.contains('open')) {
        this.renderer.removeClass(sidebar, 'open');
      } else {
        this.renderer.addClass(sidebar, 'open');
      }
    }
  }

  highlightActiveLink(activeUrl: string) {
    const links = this.el.nativeElement.querySelectorAll('.nav ul li a');

    links.forEach((link: HTMLElement) => {
      const linkRoute = link.getAttribute('routerLink')?.replace(/(\[|\]|'|")/g, ''); // Clean up the routerLink value
      if (linkRoute && activeUrl.includes(linkRoute)) {
        this.renderer.addClass(link, 'active');
      } else {
        this.renderer.removeClass(link, 'active');
      }
    });
  }
}
