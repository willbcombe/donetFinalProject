import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { RoleComponent } from './role/index';
import { ProfileComponent } from './profile/index';
import { AuthGuard } from './_guards/index';
import { EditComponent } from './editProfile/index';
import { FeedComponent } from './feed/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'role', component: RoleComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'edit', component: EditComponent, canActivate: [AuthGuard]},
    {path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);