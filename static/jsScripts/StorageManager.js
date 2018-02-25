"use strict";

function getStoragePrefix() {
    return "ScienceDev_variable_";
}

function setStorageVar(key, value) {
    key = key + "";
    value = value + "";
    key = getStoragePrefix() + key;
    localStorage.setItem(key, value);
}

function getStorageVar(key) {
    key = key + "";
    key = getStoragePrefix() + key;
    return localStorage.getItem(key);
}

function clearStorage() {
    localStorage.clear();
}
