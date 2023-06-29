import { makeObservable, observable, action } from 'mobx';

class AuthStore {
    email = '';
    password = '';
    isLoggedIn = false;
    token=''

    constructor() {
        makeObservable(this, {
            email: observable,
            password: observable,
            isLoggedIn: observable,
            setEmail: action,
            setPassword: action,
            setLoggedIn: action,
            reset: action,
        });
    }

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

    setLoggedIn(loggedIn) {
        this.isLoggedIn = loggedIn;
    }

    reset() {
        this.email = '';
        this.password = '';
        this.isLoggedIn = false;
    }


    setToken(token) {
        this.token = token;
        this.setLoggedIn(true);
    }

}

const authStore = new AuthStore();
export default authStore;
