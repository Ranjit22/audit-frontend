import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit {
    currentUser: User;
    users = [];

    config: any;
    collection = { count: 60, data: [] };

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        if(this.currentUser.role != "Auditor")  this.router.navigate(['/login']);
        this.config = {
            itemsPerPage: 3,
            currentPage: 1,
            totalItems: this.collection.count
        };
    }

    pageChanged(event){
        this.config.currentPage = event;
    }  

    ngOnInit() {
        this.loadAllUsers();
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users
                this.config.totalItems = this.users.length
            });
    }
}