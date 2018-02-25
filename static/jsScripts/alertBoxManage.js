"use strict";

function find(elementIdParam) {
    const elementId = elementIdParam.toString();
    return document.getElementById(elementId);
}

function showAlert(message, functionParam) {
    const backGroundFonBox = find("backGroundFonBox");
    const alertMessageBox = find("messageAlertBox");
    const parag = find("messageContentParag");
    const closeAlerBtn = find("closeAlertBtn");

    parag.innerHTML = message.toString();
    backGroundFonBox.hidden = false;
    alertMessageBox.hidden = false;

    if(functionParam === null || functionParam === undefined) {
        closeAlerBtn.onclick = function () {
            backGroundFonBox.hidden = true;
            alertMessageBox.hidden = true;
        }
    } else {
        closeAlerBtn.onclick = function () {
            backGroundFonBox.hidden = true;
            alertMessageBox.hidden = true;
            functionParam();
        }
    }
}



