import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { MaterialModule } from './modules/material/material.module';
import { IndexComponent } from './pages/index/index.component';
import { MotionBackgroundComponent } from './components/motion-background/motion-background.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './pages/blog/blog.component';
import { DelayedPanelComponent } from './components/delayed-panel/delayed-panel.component';
import { OnScrollShowDirective } from './directives/on-scroll-show.directive';
import { ArticleComponent } from './pages/article/article.component';
import { MarkdownModule } from 'ngx-markdown';
import { ArticlePageResolver } from './router-resolvers/article-page.resolver';
import { ArticleListResolver } from './router-resolvers/article-list.resolver';

@NgModule({
  declarations: [
    AppComponent,
    IndexLayoutComponent,
    ContentLayoutComponent,
    IndexComponent,
    MotionBackgroundComponent,
    BlogComponent,
    DelayedPanelComponent,
    OnScrollShowDirective,
    ArticleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    ArticlePageResolver,
    ArticleListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
