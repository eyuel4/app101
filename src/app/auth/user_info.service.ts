import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface UserInStorage {
    userId : string;
   // email : string;
    displayName : string;
    token : string;
}

export interface LoginInfoInStorage {
    success : boolean;
    message : string;
    landingPage : string;
    user ?:UserInStorage;
}

@Injectable()
export class UserInfoService {
    public currentUserKey : string = "currentUser"
    public storage : Storage = localStorage;
    public isLoggedInSubject : Subject<boolean> = new Subject<boolean>();
    public userNameSubject : Subject<string> = new Subject<string>();
    public userIdSubject : Subject<string> = new Subject<string>();

    constructor() {}

    //Store userinfo from local storage
    storeUserInfo(userInfoString : string) {
        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    //Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
        this.isLoggedInSubject.next(false);
        this.userNameSubject.next('User');
    }

    // Get userInfo from local storage
    getUserInfo() : UserInStorage | null {
        try {
            let userInfoString = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                let userObj : UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
                return userObj;
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }

    isLoggedIn() : boolean {
        let result = this.storage.getItem(this.currentUserKey)?true : false;
        this.isLoggedInSubject.next(result);
        this.userIdSubject.next(this.getUserId());
        return result;
    }

    //Get User's Display name from session storage
    getUserName() : string {
        let userObj : UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            this.userNameSubject.next(userObj.displayName);
            return userObj.userId;
        }
        return "no-user";
    }

    // Get Token from LocalStorage
    getStoredToken() : string | null {
        let userObj : UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.token;
        }
        return null;
    }

    // Get UserId from LocalStorage
    getUserId() : string {
        let userObj : UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            this.userIdSubject.next(userObj.userId);
            return userObj.userId;
        }
        return null;
    }
}