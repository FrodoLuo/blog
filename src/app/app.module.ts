import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { BlogModule } from './modules/blog/blog.module';
import { HomeModule } from './modules/home/home.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CommonDeclarationModule } from './modules/common-declaration/common-declaration.module';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AlbumModule } from './modules/album/album.module';
import { AlbumLayoutComponent } from './layout/album-layout/album-layout.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumLayoutComponent,
    MainLayoutComponent,
    NavMenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonDeclarationModule,

    AlbumModule,
    HomeModule,
    BlogModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
