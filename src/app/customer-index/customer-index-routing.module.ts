import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {AuthGuardGuard} from '../Security/auth-guard.guard';
import {FeedbackComponent} from './IndexModule/feedback/feedback.component';
import {ServicesOfferedComponent} from './IndexModule/services-offered/services-offered.component';
import {ServiceHistoryComponent} from './IndexModule/service-history/service-history.component';
import {StatusComponent} from './IndexModule/status/status.component';
import {SubCategoryComponent} from './sub-category/sub-category.component';

const routes: Routes = [

  {
    path: 'Index', canActivate: [AuthGuardGuard], children: [
      {path: '', component: IndexComponent},
      {
        path: 'Services', component: ServicesOfferedComponent, children: [{
          path: 'subCategory', component: SubCategoryComponent
        }]
      },
      {path: 'History', component: ServiceHistoryComponent, children: [{
          path: 'subCategory', component: SubCategoryComponent
        }]},
      {path: 'Status', component: StatusComponent, children: [{
          path: 'subCategory', component: SubCategoryComponent
        }]},
      {path: 'Feedback', component: FeedbackComponent, children: [{
          path: 'subCategory', component: SubCategoryComponent
        }]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerIndexRoutingModule {
}
