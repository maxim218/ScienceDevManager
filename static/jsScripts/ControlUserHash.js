"use strict";

function controlUserHash() {
    const loginField = getStorageVar("man_nickname");
    const passwordField = getStorageVar("man_password");

    if(loginField === null || loginField === undefined) {
        clearStorage();
        window.location = "/";
    }

    if(passwordField === null || passwordField === undefined) {
        clearStorage();
        window.location = "/";
    }

    sendPost("auth_hash_user", {
        loginField: loginField,
        passwordField: passwordField,
    }, (result) => {
       const obj = JSON.parse(result);

       if(obj.man_nickname === null || obj.man_nickname === undefined) {
           clearStorage();
           window.location = "/";
       }
    });
}

function tryToAuth() {
    const loginField = getStorageVar("man_nickname");
    const passwordField = getStorageVar("man_password");

    if(loginField === null || loginField === undefined) {
        return;
    }

    if(passwordField === null || passwordField === undefined) {
        return;
    }

    sendPost("auth_hash_user", {
        loginField: loginField,
        passwordField: passwordField,
    }, (result) => {
        const obj = JSON.parse(result);

        if(obj.man_nickname !== null || obj.man_nickname !== undefined) {
            if(obj.man_password !== null || obj.man_password !== undefined) {
                window.location = "/mainmenu";
            }
        }
    });
}
