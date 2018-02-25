"use strict";

function getNormalText(s) {
    s = s + "";
    let div = document.createElement('div');
    let text = document.createTextNode(s);
    div.appendChild(text);
    return div.innerHTML;
}
