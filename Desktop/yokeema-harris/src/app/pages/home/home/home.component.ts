import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name = 'Yokeema Harris';
  titleLine = 'Notary Public';
  stateLine = 'South Carolina';
  areaLine = 'Serving Richland County Area';

  email = 'yokeemaharris@yahoo.com';
  phoneDisplay = '+1 (839) 292-7123';
  phoneDial = '+18392927123';

  services = [
    { label: 'Loan Documents' }, { label: 'Refinance & Mortgages' },
    { label: 'Power of Attorney' }, { label: 'Titles / Bills of Sale' },
    { label: 'Last Will & Testaments' }, { label: 'Living Trust' },
    { label: 'Marriage Licenses' }, { label: 'Divorce Decree' },
    { label: 'Bank Forms' }
  ];

  isBookingOpen = false;

  form = {
    fullName: '',
    phone: '',
    email: '',
    location: '',
    preferredDate: '',
    preferredTime: '',
    documentType: '',
    notes: ''
  };

  openBooking() {
    this.isBookingOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeBooking() {
    this.isBookingOpen = false;
    document.body.style.overflow = '';
  }

  shareSite() {
    if (navigator.share) {
      navigator.share({
        title: 'Yokeema Harris | Notary Public',
        text: 'Professional mobile notary services in Richland County, SC.',
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Copy this link to share: ' + window.location.href);
    }
  }

  get telHref() {
    return `tel:${this.phoneDial}`;
  }

  get appointmentMailtoHref() {
    const subject = encodeURIComponent(`Notary Request: ${this.form.fullName || 'New Client'}`);
    const dateStr = this.form.preferredDate ? `${this.form.preferredDate} at ${this.form.preferredTime}` : 'Not specified';
    
    const bodyText = `
New Appointment Request
-----------------------
Client: ${this.form.fullName}
Phone: ${this.form.phone}
Location: ${this.form.location}
Date/Time: ${dateStr}
Document: ${this.form.documentType}
Notes: ${this.form.notes}
    `.trim();

    return `mailto:${this.email}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  }
}