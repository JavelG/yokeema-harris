// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for ngForm
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackTimeComponent } from './track-time/track-time.component';
import { HomeComponent } from './home/home.component';
import { AiSuggestionComponent } from './ai-suggestion/ai-suggestion.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    TrackTimeComponent,
    HomeComponent,
    AiSuggestionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
