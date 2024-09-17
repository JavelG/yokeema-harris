import { Component, ChangeDetectorRef } from '@angular/core';
import { OpenaiService } from '../openai.service';

@Component({
  selector: 'app-ai-suggestion',
  templateUrl: './ai-suggestion.component.html',
  styleUrls: ['./ai-suggestion.component.css']
})
export class AiSuggestionComponent {
  errorMessage: string | null = null;
  bankHolidays: { name: string, date: Date }[] = [];
  anticipatedVacations: Date[] = [];
  potentialSchedules: string[] = [];
  selectedMonth: string = ''; // Format 'YYYY-MM'
  selectedDate: Date | null = null;
  totalDaysInMonth: number = 0;
  startDay: number = 0;
  completedDates: Date[] = [];
  anticipatedDates: Date[] = [];
  summary: string[] = [];
  holidays: Date[] = [];
  calendarDays: any[] = []; // For rendering days in the calendar

  constructor(private openaiService: OpenaiService, private cdr: ChangeDetectorRef) {}

  onSubmit() {
    if (this.selectedMonth) {
      const input = `Suggest 3 potential schedules to ensure days in office is met for ${this.selectedMonth}. Highlight bank holidays, anticipated vacations, and potential dates.`;
      this.openaiService.getResponse(input).subscribe(
        (response: any) => {
          const data = response.choices[0].message.content;

          this.bankHolidays = this.extractBankHolidays(data); // Extracting holidays
          this.anticipatedVacations = this.extractAnticipatedVacations(data);
          this.potentialSchedules = this.extractPotentialSchedules(data);

          this.holidays = this.bankHolidays.map(holiday => holiday.date); // Highlight holidays

          // Populate summary and calendar
          this.summary = this.createSummary(this.potentialSchedules);
          this.updateCalendar();

          this.cdr.detectChanges();
        },
        (error) => {
          this.errorMessage = 'Error with AI suggestion: ' + (error.message || error);
          this.cdr.detectChanges(); // Trigger change detection on error
        }
      );
    } else {
      this.errorMessage = 'Please select a month.';
    }
  }

  onMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    this.updateCalendar();
  }

  addDate(dateType: string, dateValue: string) {
    const date = new Date(dateValue);
    if (dateType === 'completed') {
      this.completedDates.push(date);
    } else if (dateType === 'anticipated') {
      this.anticipatedDates.push(date);
    }
    this.updateCalendar();
  }

  private updateCalendar() {
    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-').map(Number);
      const date = new Date(year, month - 1, 1);
      this.totalDaysInMonth = new Date(year, month, 0).getDate();
      this.startDay = new Date(year, month - 1, 1).getDay();

      // Update calendar grid
      this.calendarDays = this.createCalendarDays();
    }
  }

  private createCalendarDays() {
    const days: any[] = [];

    // Add empty slots for days before the start of the month
    for (let i = 0; i < this.startDay; i++) {
      days.push({ day: '', type: 'empty' });
    }

    // Add days of the month
    for (let i = 1; i <= this.totalDaysInMonth; i++) {
      days.push({
        day: i,
        type: this.getDayType(i)
      });
    }

    return days;
  }

  private getDayType(day: number): string {
    if (this.holidays.some(date => date.getDate() === day)) {
      return 'holiday';
    }
    if (this.anticipatedDates.some(date => date.getDate() === day)) {
      return 'anticipated';
    }
    return 'normal';
  }

  private extractBankHolidays(data: string): { name: string, date: Date }[] {
    const bankHolidays: { name: string, date: Date }[] = [];
    const holidayRegex = /(\w+ \d+):\s*(.*)/g; // Example: Labor Day: September 2
    let match;

    while ((match = holidayRegex.exec(data)) !== null) {
      const holidayName = match[2];
      const date = new Date(`${this.selectedMonth}-${match[1]}`);
      if (!isNaN(date.getTime())) {
        bankHolidays.push({ name: holidayName, date });
      }
    }

    return bankHolidays;
  }

  private extractAnticipatedVacations(data: string): Date[] {
    const anticipatedVacations: Date[] = [];
    const matches = data.match(/Anticipated Vacations:\s*([\s\S]*?)(?=\n|$)/);
    if (matches) {
      const dates = matches[1].split(',').map(dateStr => dateStr.trim());
      for (const dateStr of dates) {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          anticipatedVacations.push(date);
        }
      }
    }
    return anticipatedVacations;
  }

  private extractPotentialSchedules(data: string): string[] {
    const potentialSchedules: string[] = [];
    const matches = data.match(/Schedule\s*\d+:\s*([\s\S]*?)(?=Schedule|$)/g);
    if (matches) {
      matches.forEach(schedule => {
        potentialSchedules.push(schedule.trim());
      });
    }
    return potentialSchedules;
  }

  private createSummary(schedules: string[]): string[] {
    return schedules.map((schedule, index) => `Schedule ${index + 1}: ${schedule}`);
  }

  isHoliday(day: number): boolean {
    return this.holidays.some(date => date.getDate() === day);
  }

  isAnticipated(day: number): boolean {
    return this.anticipatedDates.some(date => date.getDate() === day);
  }

  getRemainingDays(): number {
    return this.totalDaysInMonth - (this.completedDates.length + this.anticipatedDates.length);
  }

  getPercentageSpent(): number {
    const totalDays = this.totalDaysInMonth;
    const spentDays = this.completedDates.length + this.anticipatedDates.length;
    return (spentDays / totalDays) * 100;
  }
}
