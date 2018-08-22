import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommonInfoComponent } from './common-info.component';
import { CommonInfoDetailComponent } from './common-info-detail.component';
import { CommonInfoPopupComponent } from './common-info-dialog.component';
import { CommonInfoDeletePopupComponent } from './common-info-delete-dialog.component';

export const commonInfoRoute: Routes = [
    {
        path: 'common-info',
        component: CommonInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'common-info/:id',
        component: CommonInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commonInfoPopupRoute: Routes = [
    {
        path: 'common-info-new',
        component: CommonInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'common-info/:id/edit',
        component: CommonInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'common-info/:id/delete',
        component: CommonInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.commonInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
