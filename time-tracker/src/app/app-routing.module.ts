import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackTimeComponent } from './track-time/track-time.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'track-time', component: TrackTimeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
