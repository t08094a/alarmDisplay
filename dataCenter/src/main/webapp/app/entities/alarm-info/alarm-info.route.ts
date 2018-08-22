import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AlarmInfoComponent } from './alarm-info.component';
import { AlarmInfoDetailComponent } from './alarm-info-detail.component';
import { AlarmInfoPopupComponent } from './alarm-info-dialog.component';
import { AlarmInfoDeletePopupComponent } from './alarm-info-delete-dialog.component';

export const alarmInfoRoute: Routes = [
    {
        path: 'alarm-info',
        component: AlarmInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'alarm-info/:id',
        component: AlarmInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alarmInfoPopupRoute: Routes = [
    {
        path: 'alarm-info-new',
        component: AlarmInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alarm-info/:id/edit',
        component: AlarmInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alarm-info/:id/delete',
        component: AlarmInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dataCenterApp.alarmInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
