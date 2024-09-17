import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackTimeComponent } from './track-time/track-time.component';
import { AiSuggestionComponent } from './ai-suggestion/ai-suggestion.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'track-time', component: TrackTimeComponent },
  { path: 'ai-suggestion', component: AiSuggestionComponent },
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
