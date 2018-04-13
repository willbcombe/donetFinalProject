"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var index_4 = require("./role/index");
var index_5 = require("./profile/index");
var index_6 = require("./_guards/index");
var index_7 = require("./editProfile/index");
var index_8 = require("./feed/index");
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [index_6.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'role', component: index_4.RoleComponent, canActivate: [index_6.AuthGuard] },
    { path: 'profile', component: index_5.ProfileComponent, canActivate: [index_6.AuthGuard] },
    { path: 'edit', component: index_7.EditComponent, canActivate: [index_6.AuthGuard] },
    { path: 'feed', component: index_8.FeedComponent, canActivate: [index_6.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map