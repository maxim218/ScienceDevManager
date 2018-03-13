/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasManager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProcessController__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NumberControl__ = __webpack_require__(5);







class MainClass {
    constructor() {
        console.log("Create MainClass");
        this.canvasManager = new __WEBPACK_IMPORTED_MODULE_0__CanvasManager__["a" /* default */]();
        this.processController = new __WEBPACK_IMPORTED_MODULE_1__ProcessController__["a" /* default */](this.canvasManager);
        this.alertWindow = new __WEBPACK_IMPORTED_MODULE_2__AlertWindow__["a" /* default */]();
    }

    isNumb(stringParam) {
        return __WEBPACK_IMPORTED_MODULE_3__NumberControl__["a" /* default */].isIntegerNumber(stringParam);
    }

    static addEventsToMenuButtons() {
        const contentMenuBoxes = document.getElementsByClassName("contentOfMenu");

        function hideAllContentOfMenuBoxes(contentMenuBoxes) {
            for(let i = 0; i < contentMenuBoxes.length; i++) {
                const box = contentMenuBoxes[i];
                box.hidden = true;
            }
        }

        const buttons = document.getElementsByClassName("menuElementClass");

        for(let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const number = parseInt(button.id.toString().split("b").join(""));
            const contentBox = document.getElementById("x" + number);

            button.onclick = function() {
                hideAllContentOfMenuBoxes(contentMenuBoxes);
                contentBox.hidden = false;
            }
        }
    }

    addEventToSetRolicPropBtn() {
        const btn = document.getElementById("q1_b1");

        const fon_t = document.getElementById("q1_t1");
        const width_t = document.getElementById("q1_t2");
        const height_t = document.getElementById("q1_t3");

        btn.onclick = () => {
            if(fon_t.value === "") {
                this.alertWindow.showMessage("Поле ввода цвета заднего фона пусто.");
                return;
            }

            if(width_t.value === "") {
                this.alertWindow.showMessage("Поле ввода ширины ролика пусто.");
                return;
            }

            if(height_t.value === "") {
                this.alertWindow.showMessage("Поле ввода высоты ролика пусто.");
                return;
            }

            if(this.isNumb(width_t.value) === false) {
                this.alertWindow.showMessage("Поле ввода ширины ролика должно содержать целое положительное число.");
                return;
            }

            if(this.isNumb(height_t.value) === false) {
                this.alertWindow.showMessage("Поле ввода высоты ролика должно содержать целое положительное число.");
                return;
            }

            const fon_value = "#" + fon_t.value;
            const width_value = parseInt(width_t.value);
            const height_value = parseInt(height_t.value);

            if(width_value > 910) {
                this.alertWindow.showMessage("Значение ширины ролика не должно превышать 910 пикселей.");
                return;
            }

            if(width_value <= 0) {
                this.alertWindow.showMessage("Значение ширины ролика должно иметь положительное значение.");
                return;
            }

            if(height_value > 560) {
                this.alertWindow.showMessage("Значение высоты ролика не должно превышать 560 пикселей.");
                return;
            }

            if(height_value <= 0) {
                this.alertWindow.showMessage("Значение высоты ролика должно иметь положительное значение.");
                return;
            }

            this.processController.setFonParams(width_value, height_value, fon_value);
            this.canvasManager.drawWalls(width_value, height_value, fon_value);
        };

        btn.click();
    }

    addEventsToAddLayerButtons() {
        const hiddenGetFileBtn = document.getElementById("loadFilesBtn");
        const shownGetFileBtn = document.getElementById("q2_b1");

        const b3 = document.getElementById("b3");
        const b4 = document.getElementById("b4");
        const b5 = document.getElementById("b5");

        shownGetFileBtn.onclick = function() {
            hiddenGetFileBtn.click();
        };

        const t = this;

        hiddenGetFileBtn.onchange = function() {
            const file = this.files[0];

            b3.hidden = false;
            b4.hidden = false;
            b5.hidden = false;

            const myReader = new FileReader();
            myReader.readAsDataURL(file);

            myReader.onload = function(e) {
                const loadedImage = e.target.result;
                t.processController.addImage(loadedImage);
            }
        }
    }

    addEventsToMoveTimeLineButtons() {
        const textField = document.getElementById("q3_t1");

        function controlField(textField, t) {
            let value = textField.value;

            if(value === "") {
                t.alertWindow.showMessage("Поле ввода количества шагов пусто.");
                return false;
            }

            if(t.isNumb(value) === false) {
                t.alertWindow.showMessage("Поле ввода количества шагов должно содержать целое положительное число.");
                return false;
            }

            value = parseInt(value);

            if(value > 50) {
                t.alertWindow.showMessage("Количество шагов не должно превышать 50 единиц.");
                return false;
            }

            if(value <= 0) {
                t.alertWindow.showMessage("Количество шагов должно быть целым положительным числом.");
                return false;
            }

            return true;
        }

        const leftBtn = document.getElementById("q3_b1");
        const rightBtn = document.getElementById("q3_b2");

        const t = this;

        leftBtn.onclick = () => {
            if(controlField(textField, t) === true) {
                const value = parseInt(textField.value);
                const result = this.processController.move(value, "LEFT");
                if(result === false) {
                    t.alertWindow.showMessage("Невозможно осуществить сдвиг.");
                    return;
                }
            }
        };

        rightBtn.onclick = () => {
            if(controlField(textField, t) === true) {
                const value = parseInt(textField.value);
                this.processController.move(value, "RIGHT");
            }
        }
    }

    addEventToChooseFrameBtn() {
        const textField = document.getElementById("q4_t1");
        const btn = document.getElementById("q4_b1");

        btn.onclick = () => {
            if(textField.value === "") {
                this.alertWindow.showMessage("Поле ввода номера кадра пусто.");
                return;
            }

            if(this.isNumb(textField.value) === false) {
                this.alertWindow.showMessage("Номер кадра должен быть целым положительным числом или нулём.");
                return;
            }

            const value = parseInt(textField.value);

            if(value < 0) {
                this.alertWindow.showMessage("Номер кадра должен быть целым положительным числом или нулём.");
                return;
            }

            if(value > 799) {
                this.alertWindow.showMessage("Номер кадра не должен превышать значение 799.");
                return;
            }

            this.processController.setSelectedFrame(value);
        }
    }

    addEventsToSetPropOfElementBtn() {
        function get(s) {
            return document.getElementById(s.toString());
        }

        const xx_t = get("q5_t1");
        const yy_t = get("q5_t2");
        const ww_t = get("q5_t3");
        const hh_t = get("q5_t4");
        const btn = get("q5_b1");

        btn.onclick = () => {
            if(xx_t.value === "") {
                this.alertWindow.showMessage("Поле ввода позиции X пусто.");
                return;
            }

            if(yy_t.value === "") {
                this.alertWindow.showMessage("Поле ввода позиции Y пусто.");
                return;
            }

            if(ww_t.value === "") {
                this.alertWindow.showMessage("Поле ввода ширины пусто.");
                return;
            }

            if(hh_t.value === "") {
                this.alertWindow.showMessage("Поле ввода высоты пусто.");
                return;
            }

            const xx = parseInt(xx_t.value);
            const yy = parseInt(yy_t.value);
            const ww = parseInt(ww_t.value);
            const hh = parseInt(hh_t.value);
            this.processController.setPropOfObjInFrame(xx,yy,ww,hh);
        }
    }

    addEventsToProjectButtons() {
        const lastFrameTextField = document.getElementById("q6_t1");
        const btnWatchRolic = document.getElementById("q6_b1");

        const ttt = this;

        btnWatchRolic.onclick = () => {
            let value = lastFrameTextField.value;

            if(value === "") {
                this.alertWindow.showMessage("Поле ввода последнего кадра пусто.");
                return;
            }

            if(this.isNumb(value) === false) {
                this.alertWindow.showMessage("Значение последнего кадра должно быть целым положительным числом.");
                return;
            }

            value = parseInt(value);

            if(value <= 0) {
                this.alertWindow.showMessage("Значение последнего кадра должно быть целым положительным числом.");
                return;
            }

            if(value > 799) {
                this.alertWindow.showMessage("Значение последнего кадра не должно превышать 799.");
                return;
            }

            const lastFrame = value;

            const answer = this.processController.getRolicInfo(lastFrame);
            console.log("----------------------------------------------");
            console.log(answer);
            console.log("----------------------------------------------");

            const loginField = localStorage.getItem("ScienceDev_variable_man_nickname");
            const passwordField = localStorage.getItem("ScienceDev_variable_man_password");
            const movieName = localStorage.getItem("ScienceDev_variable_rolik_name");
            const movieContent = answer;

            const bodyObj = {
                loginField: loginField,
                passwordField: passwordField,
                movieName: movieName,
                movieContent: movieContent
            };

            function getRandString() {
                let s = "";
                for(let i = 0; i < 5; i++) {
                    s += (Math.random() + "rol");
                }
                return s;
            }

            const bodyString = JSON.stringify(bodyObj);
            const url = "http://localhost:5000/create_movie/" + getRandString();

            let r = new XMLHttpRequest();
            r.open("POST", url, true);
            r.setRequestHeader("Content-Type","application/json;charset=UTF-8");
            r.send(bodyString);
            r.onreadystatechange = function() {
                if(r.readyState === 4 && r.status === 200) {
                    const answer = r.responseText + "";
                    console.log(answer);
                    ttt.alertWindow.showMessageWithCallback("Сохранение ролика прошло успешно.", () => {
                        let wwwWind = open("./watchrolic.html");
                    });
                }
            }
        }
    }
}

window.onload = function() {
    const mainClass = new MainClass();
    MainClass.addEventsToMenuButtons();
    mainClass.addEventToSetRolicPropBtn();
    mainClass.addEventsToAddLayerButtons();
    mainClass.addEventsToMoveTimeLineButtons();
    mainClass.addEventToChooseFrameBtn();
    mainClass.addEventsToSetPropOfElementBtn();
    mainClass.addEventsToProjectButtons();
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class CanvasManager {
    constructor() {
        console.log("Create CanvasManager");
        this.createCanvas();
    }

    createCanvas() {
        this.ww = 910;
        this.hh = 560;

        this.can = document.getElementById('can');
        this.can.style.background = "#FFFFFF";
    }

    drawWalls(ww, hh, fonColor) {
        ww = parseInt(ww);
        hh = parseInt(hh);

        this.can.style.background = fonColor;
        this.can.style.width = ww + "px";
        this.can.style.height = hh + "px";
    }

    addImage(image, count) {
        let textHtml = "<div id = 'picture_box_" + count + "' style = 'position: absolute; padding: 0px; height: 150px; width: 150px; margin-left: 0px; margin-top: 0px;'></div>";
        this.can.innerHTML += textHtml.toString();
        document.getElementById("picture_box_" + count).innerHTML = "<img src = '" + image + "' class = 'canvasImage'>";
    }

    drawImage(name, x, y, w, h) {
        const t = this;
        const box = document.getElementById("picture_box_" + name);
        box.style.marginLeft = x + "px";
        box.style.marginTop = y + "px";
        box.style.width = w + "px";
        box.style.height = h + "px";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasManager;




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LineBoxManager__ = __webpack_require__(3);




class ProcessController {
    constructor(canvasManager) {
        console.log("Create ProcessController");
        this.canvasManager = canvasManager;

        this.imagesArr = [];
        this.count = 0;

        this.layersBox = document.getElementById("layersBox");
        this.layersBox.innerHTML = "";

        this.nowStartPosition = 0;
        this.selectedLayerNumber = 0;
        this.selectedFrame = 0;

        this.fonColor = "";
        this.fonWidth = "";
        this.fonHeight = "";

        this.lastFrame = 799;
        console.log("Last frame: " + this.lastFrame);
    }

    setFonParams(ww, hh, fonColor) {
        ww = parseInt(ww);
        hh = parseInt(hh);

        this.fonColor = fonColor;
        this.fonWidth = ww + "px";
        this.fonHeight = hh + "px";

        console.log(this.fonColor + " " + this.fonWidth + " " + this.fonHeight);
    }

    getRolicInfo(lastFrame) {
        this.lastFrame = parseInt(lastFrame);
        console.log("Last frame: " + this.lastFrame);

        const imagesArr = this.imagesArr;
        const answer = [];

        for(let i = 0; i < imagesArr.length; i++) {
            const image = imagesArr[i];

            const answerImage = {
                content: image.content,
                name: image.name,
                frames: []
            };

            for(let j = 0; j < image.frames.length; j++) {
                const frame = image.frames[j];
                if(frame.marked === true) {
                    answerImage.frames.push(frame);
                } else {
                    answerImage.frames.push({});
                }
            }

            answer.push(answerImage);
        }

        const t = this;

        const obj = {
            lastFrame: t.lastFrame,
            fonColor: t.fonColor,
            fonWidth: t.fonWidth,
            fonHeight: t.fonHeight,
            answer: answer
        };

        return JSON.stringify(obj);
    }

    setPropertiesTextFieldsValues(layer, frame) {
        let obj = null;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];
            if(image.name === layer) {
                obj = image;
                break;
            }
        }

        const xx = obj.frames[frame].x;
        const yy = obj.frames[frame].y;
        const ww = obj.frames[frame].w;
        const hh = obj.frames[frame].h;

        function get(s) {
            return document.getElementById(s.toString());
        }

        const xx_t = get("q5_t1");
        const yy_t = get("q5_t2");
        const ww_t = get("q5_t3");
        const hh_t = get("q5_t4");

        xx_t.value = xx;
        yy_t.value = yy;
        ww_t.value = ww;
        hh_t.value = hh;
    }

    setPropOfObjInFrame(xx,yy,ww,hh) {
        this.getSelectedLayerNumber();
        const layer = parseInt(this.selectedLayerNumber);
        const frame = parseInt(this.selectedFrame);

        let obj = null;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];
            if(image.name === layer) {
                obj = image;
                break;
            }
        }

        xx = parseInt(xx);
        yy = parseInt(yy);
        ww = parseInt(ww);
        hh = parseInt(hh);

        console.log("Layer: " + layer);
        console.log("Frame: " + frame);
        console.log("Name number: " + obj.name);

        obj.frames[frame].marked = true;
        obj.frames[frame].x = xx;
        obj.frames[frame].y = yy;
        obj.frames[frame].w = ww;
        obj.frames[frame].h = hh;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];

            const name = image.name;
            const x = image.frames[frame].x;
            const y = image.frames[frame].y;
            const w = image.frames[frame].w;
            const h = image.frames[frame].h;

            this.canvasManager.drawImage(name, x, y, w, h);
        }

        const currentImage = obj;
        currentImage.frames[frame].marked = true;
        currentImage.manager.initBoxContent(this.nowStartPosition);

        /********************************************************************/

        function changeProperties(currentImage, now, after) {
            const frameNumber = after - now - 1;

            if(frameNumber !== 0) {

                const valuesArr = [
                    "x", "y", "w", "h",
                ];

                for(let ind = 0; ind < valuesArr.length; ind++) {
                    const value = valuesArr[ind];

                    const dx = (currentImage.frames[after][value] - currentImage.frames[now][value]) / frameNumber;
                    let nowValue = currentImage.frames[now][value];

                    for (let i = now + 1; i <= after - 1; i++) {
                        nowValue += dx;
                        currentImage.frames[i][value] = parseInt(nowValue);
                    }
                }
            }
        }

        for(let i = 0; i < currentImage.frames.length; i++) {
            const frameNow = currentImage.frames[i];
            if(frameNow.marked === true) {
                const now = i;

                for(let j = now + 1; j < currentImage.frames.length; j++) {
                    const frameAfter = currentImage.frames[j];
                    if(frameAfter.marked === true) {
                        const after = j;
                        changeProperties(currentImage, now, after);
                        i = after - 1;
                        break;
                    }
                }
            }
        }

        /********************************************************************/
    }

    getSelectedLayerNumber() {
        const selectedLabel = "Выбранный слой";

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];
            if(document.getElementById('label_in_table_td_' + image.name).innerHTML === selectedLabel) {
                this.selectedLayerNumber = parseInt(image.name);
                return;
            }
        }
        this.selectedLayerNumber = 0;
    }

    setSelectedFrame(number) {
        this.selectedFrame = parseInt(number);
        this.setPropertiesTextFieldsValues(this.selectedLayerNumber, this.selectedFrame);

        const layer = parseInt(this.selectedLayerNumber);
        const frame = parseInt(this.selectedFrame);

        for(let i = 0; i < this.imagesArr.length; i++) {
            const image = this.imagesArr[i];

            const name = image.name;
            const x = image.frames[frame].x;
            const y = image.frames[frame].y;
            const w = image.frames[frame].w;
            const h = image.frames[frame].h;

            this.canvasManager.drawImage(name, x, y, w, h);
        }
    }

    addLayerHTML() {
        this.layersBox.innerHTML = "";
        let htmlContent = "";

        for(let i = this.imagesArr.length - 1; i >= 0; i--) {
            const image = this.imagesArr[i];
            htmlContent = htmlContent + "<tr class = 'trClass' id = '" + ("layer_td_" + image.name) + "'><td class = 'tdClass'>" + "<div style = 'background-color: white; width: 70px; height: 70px; padding: 10px; border: 2px solid gray; border-radius: 7px;'>" +"<img width = '70px' height = '70px' src = '" + image.content + "'>" + "</div>"  +"</td><td class = 'tdClass'>" + "<span id = '" + "label_in_table_td_" + image.name + "'></span>" + "</td><td class = 'tdClass'>" + "<div style = 'width: 520px;' id = '" + ("line_box_" + image.name) +"'></div>" + "</td</tr>";
        }

        htmlContent = "<table>" + htmlContent + "</table>";
        this.layersBox.innerHTML = htmlContent;

        function clearSelected(imagesArr) {
            for(let i = 0; i < imagesArr.length; i++) {
                const number = imagesArr[i].name;
                document.getElementById("label_in_table_td_" + number).innerHTML = "";
            }
        }

        const selectedLabel = "Выбранный слой";

        this.selectedLayerNumber = this.imagesArr.length - 1;
        document.getElementById("label_in_table_td_" + (this.selectedLayerNumber)).innerHTML = selectedLabel;

        for(let i = 0; i < this.imagesArr.length; i++) {
            const number = this.imagesArr[i].name;
            document.getElementById("layer_td_" + number).onclick = () => {
                clearSelected(this.imagesArr);
                document.getElementById("label_in_table_td_" + number).innerHTML = selectedLabel;
                this.selectedLayerNumber = number;
                this.setPropertiesTextFieldsValues(this.selectedLayerNumber, this.selectedFrame);
            }
        }

        this.nowStartPosition = 0;
        for(let i = 0; i < this.imagesArr.length; i++) {
            this.imagesArr[i].manager.initBoxContent(this.nowStartPosition);
        }
    }

    move(valueParam, type) {
        let value = 0;

        if(type === "LEFT") {
            value = parseInt(valueParam);
        }

        if(type === "RIGHT") {
            value = parseInt(valueParam) * (-1);
        }

        if(this.nowStartPosition - value >= 0) {
            console.log("Changed");
            this.nowStartPosition -= value;
            for (let i = 0; i < this.imagesArr.length; i++) {
                this.imagesArr[i].manager.initBoxContent(this.nowStartPosition);
            }
            return true;
        }

        return false;
    }

    addImage(loadedImage) {
        this.canvasManager.addImage(loadedImage, this.count);

        const content = loadedImage;
        const name = this.count;

        let frames = [];
        const framesNumber = 800;
        for(let i = 0; i < framesNumber; i++) {
            const frameObj = {
                x: 0,
                y: 0,
                w: 150,
                h: 150,
                marked: false,
            };
            frames.push(frameObj);
        }
        frames[0].marked = true;

        const image = {
            content: content,
            name: name,
            manager: new __WEBPACK_IMPORTED_MODULE_0__LineBoxManager__["a" /* default */]("line_box_" + name, frames),
            frames: frames,
        };

        this.imagesArr.push(image);
        this.addLayerHTML();

        this.setPropertiesTextFieldsValues(this.count, 0);
        this.selectedFrame = 0;
        document.getElementById("q4_t1").value = "0";

        this.count++;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProcessController;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class LineBoxManager {
    constructor(boxName, frames) {
        this.boxName = boxName;
        this.frames = frames;
    }

    initBoxContent(startPos) {
        this.box = document.getElementById(this.boxName);
        this.box.innerHTML = "";

        let htmlContent = "";
        for(let i = startPos; i < (startPos + 10); i++) {
            if(this.frames[i] !== null && this.frames[i] !== undefined) {
                if (this.frames[i].marked === false) {
                    htmlContent = htmlContent + "<td class = 'tdFrameClass'>" + i + "</td>";
                } else {
                    htmlContent = htmlContent + "<td class = 'tdFrameClass' style = 'background-color: #CCCCCC'>" + i + "</td>";
                }
            } else {
                htmlContent = htmlContent + "<td class = 'tdFrameClass' style = 'background-color: #FF0000; color: white;'>" + i + "</td>";
            }
        }

        htmlContent = '<table><tr>' + htmlContent + '</tr></table>';
        this.box.innerHTML = htmlContent;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineBoxManager;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class AlertWindow {
    static writeOK() {
        console.log("Click OK");
    }

    constructor() {
        console.log("Create AlertWindow");

        this.backGroundFonBox = document.getElementById("backGroundFonBox");
        this.alertMessageBox = document.getElementById("messageAlertBox");
        this.parag = document.getElementById("messageContentParag");

        document.getElementById("closeAlertBtn").onclick = () => {
            AlertWindow.writeOK();
            this.backGroundFonBox.hidden = true;
            this.alertMessageBox.hidden = true;
        }
    }

    showMessage(textParam) {
        this.parag.innerHTML = textParam.toString();
        this.backGroundFonBox.hidden = false;
        this.alertMessageBox.hidden = false;

        document.getElementById("closeAlertBtn").onclick = () => {
            AlertWindow.writeOK();
            this.backGroundFonBox.hidden = true;
            this.alertMessageBox.hidden = true;
        }
    }

    showMessageWithCallback(textParam, callback) {
        this.parag.innerHTML = textParam.toString();
        this.backGroundFonBox.hidden = false;
        this.alertMessageBox.hidden = false;

        document.getElementById("closeAlertBtn").onclick = () => {
            AlertWindow.writeOK();
            this.backGroundFonBox.hidden = true;
            this.alertMessageBox.hidden = true;
            callback();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlertWindow;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class NumberControl {
    static isCifra(charParam) {
        const numbersString = "1234567890";
        return numbersString.indexOf(charParam) !== -1;
    }

    static isIntegerNumber(stringParam) {
        for(let i = 0; i < stringParam.length; i++) {
            const c = stringParam.charAt(i);
            if(NumberControl.isCifra(c) === false) {
                return false;
            }
        }
        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NumberControl;



/***/ })
/******/ ]);