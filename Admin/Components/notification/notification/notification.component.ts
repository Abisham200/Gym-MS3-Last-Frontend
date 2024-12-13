import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications = [
    {
      title: 'New Member Registered',
      time: '2 hours ago',
      icon: 'bi-person-plus'
    },
    {
      title: 'Due Payment Reminder',
      time: '1 day ago',
      icon: 'bi-exclamation-circle'
    },
    {
      title: 'Payment Added',
      time: '3 days ago',
      icon: 'bi-wallet2'
    }
  ];
}
