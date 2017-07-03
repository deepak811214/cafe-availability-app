import { componentFactoryName } from '@angular/compiler';
import { Routes } from '@angular/router';
import {ReportComponent} from './report/report.component';
import {TestComponent} from './test/test.component';

export const appRoutes : Routes = [
    {
        path : '',
        component : ReportComponent
    },
    {
        path : 'test',
        component : TestComponent
    },
    {
        path : 'report',
        component : ReportComponent
    }
]

