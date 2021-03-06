import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';

import { AuthModule } from '../auth/auth.module';

const routes: Routes = [
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    {path: 'register', loadChildren: () => import('../register/register.module').then(m => m.RegisterModule)},
    {path: 'login', loadChildren: () => import('../pages/login/login.module').then(m => m.LoginModule)},
    // {path: 'editor', loadChildren: () => import('../editor/editor.module').then(m => m.EditorModule)},

    {path: '**', redirectTo: 'auth/dashboard'},
]

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
