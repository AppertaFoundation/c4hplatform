import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HomeComponent } from './';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    authorities: [],
    pageTitle: 'Welcome to Code4Health Platform'
  },
  canActivate: [UserRouteAccessService]
};
