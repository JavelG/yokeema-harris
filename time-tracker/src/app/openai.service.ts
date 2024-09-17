import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // Correct endpoint
  private apiKey = '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'; // Replace with your OpenAI API key

  constructor(private http: HttpClient) {}

  getResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      model: 'gpt-3.5-turbo', // Update to the correct model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
