import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { StartPage } from './features/start-page/start-page';
import { Tasks } from './features/tasks/tasks';
import { Teams } from './features/teams/teams';
import { Projects } from './features/projects/projects';
import { Component } from '@angular/core';
import { Comments } from './features/comments/comments';
import { authGuard } from './core/guard/auth.guard';
import { MainLayout } from './shared/components/main-layout/main-layout';

export const routes: Routes = [
    // ראוטים ללא הדר ופוטר (דף נחיתה והתחברות)
    { path: '', component: StartPage },
    { path: 'login', component: Login },
    { path: 'register', component: Register },

    // ראוטים עם הדר, פוטר וסיידבר - כולם תחת המעטפת המשותפת
    {
        path: '',
        component: MainLayout, 
        canActivate: [authGuard],       
        children: [
            { 
                path: 'tasks', 
                component: Tasks, 
                children: [{ path: 'comments', component: Comments }] 
            },
            { path: 'teams', component: Teams },
            { path: 'teams/:teamId/projects', component: Projects },
            { path: 'projects', component: Projects },
            { path: 'projects/:projectId/tasks', component: Tasks },
        ]
    },
];
