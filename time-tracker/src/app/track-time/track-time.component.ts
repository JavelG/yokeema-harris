import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-track-time',
  templateUrl: './track-time.component.html',
  styleUrls: ['./track-time.component.css']
})
export class TrackTimeComponent {
  completedDates: Date[] = [];
  anticipatedDates: Date[] = [];
  currentMonth: Date = new Date();
  totalDaysInMonth: number = this.getDaysInMonth(this.currentMonth);
  startDay: number = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1).getDay();
  requiredDays: number = Math.ceil(this.totalDaysInMonth * 0.2);

  constructor(private cdr: ChangeDetectorRef) {}

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  addDate(type: string, dateString: string) {
    console.log('addDate called with type:', type, 'and dateString:', dateString);

    const date = new Date(dateString);
    date.setUTCHours(0, 0, 0, 0); // Normalize to midnight UTC

    if (isNaN(date.getTime())) {
      console.error('Invalid date');
      return;
    }

    if (type === 'completed') {
      if (!this.completedDates.some(d => d.getTime() === date.getTime())) {
        this.completedDates.push(date);
        console.log('Added to completed:', date);
      }
    } else if (type === 'anticipated') {
      if (!this.anticipatedDates.some(d => d.getTime() === date.getTime())) {
        this.anticipatedDates.push(date);
        console.log('Added to anticipated:', date);
      }
    }

    this.updateSummary();
    this.cdr.detectChanges();
  }

  getRemainingDays(): number {
    const totalDaysRequired = this.requiredDays;
    const countedDays = this.completedDates.length + this.anticipatedDates.length;
    return Math.max(0, totalDaysRequired - countedDays);
  }

  getPercentageSpent(): number {
    const totalDays = this.totalDaysInMonth;
    const countedDays = this.completedDates.length + this.anticipatedDates.length;
    const percentage = (countedDays / totalDays) * 100;
    return percentage;
  }

  isCompleted(day: number): boolean {
    return this.completedDates.some(date => 
      date.getUTCDate() === day &&
      date.getUTCMonth() === this.currentMonth.getMonth() &&
      date.getUTCFullYear() === this.currentMonth.getFullYear()
    );
  }

  isAnticipated(day: number): boolean {
    return this.anticipatedDates.some(date => 
      date.getUTCDate() === day &&
      date.getUTCMonth() === this.currentMonth.getMonth() &&
      date.getUTCFullYear() === this.currentMonth.getFullYear()
    );
  }

  updateSummary() {
    console.log('Summary Updated:', {
      completed: this.completedDates.length,
      anticipated: this.anticipatedDates.length,
      remaining: this.getRemainingDays(),
      percentage: this.getPercentageSpent()
    });
  }
}
