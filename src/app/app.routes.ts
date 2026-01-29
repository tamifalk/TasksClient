import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { StartPage } from './features/start-page/start-page';
import { Tasks } from './features/tasks/tasks';
import { Teams } from './features/teams/teams';
import { Projects } from './features/projects/projects';
import { Component } from '@angular/core';
import { Comments } from './features/comments/comments';

export const routes: Routes = [
    {path:'',component: StartPage},
    {path:'login',component: Login},
    {path:'register',component:Register},
    {path:'tasks',component: Tasks,children: [{path:'comments', component:Comments}]},
    {path:'teams',component: Teams},
    {path:'projects',component: Projects}
];
