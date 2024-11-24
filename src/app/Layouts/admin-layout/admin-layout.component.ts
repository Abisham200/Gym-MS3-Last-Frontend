import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

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
}
