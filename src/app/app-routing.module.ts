import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { IndexComponent } from './pages/index/index.component';


const routes: Routes = [
  {
    path: '',
    component: IndexLayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
