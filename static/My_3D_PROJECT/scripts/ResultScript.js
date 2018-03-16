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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RenderManager_js__ = __webpack_require__(1);




class MyMainClass {
    constructor(){
        this.renderManager = new __WEBPACK_IMPORTED_MODULE_0__RenderManager_js__["a" /* default */]();
        this.addListenersToButtons();
    }

    addListenersToButtons(){
        const t = this;

        document.getElementById("b1").addEventListener("click", function(){
            t.renderManager.objectWorker.createCube();
        });

        document.getElementById("b2").addEventListener("click", function(){
            t.renderManager.objectWorker.createSphere();
        });

        document.getElementById("b3").addEventListener("click", function(){
            t.renderManager.objectWorker.createCilindr();
        });

        document.getElementById("b4").addEventListener("click", function(){
            t.renderManager.objectWorker.createConus();
        });
    }
}

window.addEventListener("load", function(){
   const myMainObj = new MyMainClass();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjectWorker_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__JSONcreator_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PropChanger_js__ = __webpack_require__(6);







class RenderManager{
    constructor() {
        this.initSceneAndCamera();
        this.initStartingPropertiesOfCamera();
        this.createGrid();
        this.createAxes();
        this.createLight();
        this.objects = [];
        this.propChanger = new __WEBPACK_IMPORTED_MODULE_2__PropChanger_js__["a" /* default */](this.scene, this.renderer, this.camera, this.objects);
        this.objectWorker = new __WEBPACK_IMPORTED_MODULE_0__ObjectWorker_js__["a" /* default */](this.scene, this.renderer, this.camera, this.objects);
        this.moveCameraEvent();
        this.clickObjectEvent();
        this.printContent();
        this.addEventToSetProectionButtons();

        this.jsonCreator = new __WEBPACK_IMPORTED_MODULE_1__JSONcreator_js__["a" /* default */](this.objects, this.objectWorker);
    }

    createLight(){
        const t = this;

        function makeLight(x,y,z){
            let spotLight_1 = new THREE.SpotLight("#ffffff", 1);
            spotLight_1.position.x = x;
            spotLight_1.position.y = y;
            spotLight_1.position.z = z;
            t.scene.add(spotLight_1);
        }

        makeLight(-100,100,-100);
        makeLight(-100,100,100);
        makeLight(100,100,-100);
        makeLight(100,100,100);
    }

    initSceneAndCamera(){
        this.ww = 950;
        this.hh = 950;
        const ww = this.ww;
        const hh = this.hh;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, ww / hh, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("#ffffff");
        this.renderer.setSize(ww, hh);
        document.getElementById("boxFor3DRender").append(this.renderer.domElement);
    }

    printContent(){
        this.renderer.render(this.scene, this.camera);
    }

    createGrid(){
        let sizeOfSetka = 210;
        let divisions = 210;
        let color_1 = "#000000";
        let color_2 = "#37e7ff";
        let gridHelper = new THREE.GridHelper(sizeOfSetka, divisions, color_1, color_2);
        this.scene.add(gridHelper);
    }

    initStartingPropertiesOfCamera(){
        this.camera.position.x = 0;
        this.camera.position.y = 50;
        this.camera.position.z = 0;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    }

    createAxes(){
        let axes = new THREE.AxisHelper(400);
        this.scene.add(axes);
    }

    clickObjectEvent(){
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();

        const camera = this.camera;
        const objects = this.objects;

        const ww = this.ww;
        const hh = this.hh;

        const t = this;

        document.getElementById("boxFor3DRender").addEventListener("click", function (event) {
            t.printContent();

            const xMouse = event.offsetX;
            const yMouse = event.offsetY;

            mouse.x = ( xMouse / ww ) * 2 - 1;
            mouse.y = - ( yMouse / hh ) * 2 + 1;
            raycaster.setFromCamera( mouse, camera );

            let intersects = raycaster.intersectObjects( objects );

            if ( intersects.length > 0 ) {
                document.getElementById("propBox").hidden = false;
                let answer = intersects[0];
                try {
                    console.log("Имя: " + answer.object.name);
                } catch (err) {
                    // err
                }
                t.propChanger.setObj(answer.object);
            }
        });
    }

    moveCameraEvent(){
        const rX = document.getElementById("rX");
        const rY = document.getElementById("rY");
        const rZ = document.getElementById("rZ");

        const t = this;
        this.moveCameraIntrval = setInterval(function(){
            t.camera.position.x = parseInt(rX.value);
            t.camera.position.y = parseInt(rY.value);
            t.camera.position.z = parseInt(rZ.value);
            t.camera.lookAt(new THREE.Vector3(0,0,0));
            t.printContent();
        }, 100);
    }

    addEventToSetProectionButtons(){
        const t = this;

        const rX = document.getElementById("rX");
        const rY = document.getElementById("rY");
        const rZ = document.getElementById("rZ");

        function getElem(s){
            return document.getElementById(s.toString());
        }

        getElem("btnTOP").onclick = function(){
            rX.value = "0";
            rY.value = "50";
            rZ.value = "0";
        };

        getElem("btnFRONT").onclick = function(){
            rX.value = "0";
            rY.value = "0";
            rZ.value = "50";
        };

        getElem("btnLEFT").onclick = function(){
            rX.value = "-50";
            rY.value = "0";
            rZ.value = "0";
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = RenderManager;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class ObjectWorker {
    constructor(scene, renderer, camera, objects){
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.objects = objects;

        this.countNum = 0;
    }

    printSceneAndObjArr(){
        console.log("----------------------------------");
        console.log("Кол-во объектов на сцене: " + this.scene.children.length);
        console.log("Количество объектов в массиве объектов: " + this.objects.length);
    }

    createCube(){
        let cubeGeometry_1 = new THREE.CubeGeometry(2, 2, 2);
        let cubeMaterial_1 = new THREE.MeshLambertMaterial({color: "#ff2f1b"});
        let cube_1 = new THREE.Mesh(cubeGeometry_1, cubeMaterial_1);
        cube_1.position.x = 0;
        cube_1.position.y = 0;
        cube_1.position.z = 0;

        let figur = cube_1;
        figur.rotation.x = 0;
        figur.rotation.y = 0;
        figur.rotation.z = 0;

        figur.name = "cube" + "_number_" + this.countNum;
        this.countNum += 1;

        this.scene.add(cube_1);
        this.objects.push(cube_1);
        this.printContent();

        return cube_1;
    }

    createSphere(){
        let sphereGeometry_1 = new THREE.SphereGeometry(1, 25, 25);
        let sphereMaterial_1 = new THREE.MeshLambertMaterial({color: "#ff2f1b"});
        let sphere_1 = new THREE.Mesh(sphereGeometry_1, sphereMaterial_1);
        sphere_1.position.x = 0;
        sphere_1.position.y = 0;
        sphere_1.position.z = 0;

        let figur = sphere_1;
        figur.rotation.x = 0;
        figur.rotation.y = 0;
        figur.rotation.z = 0;

        figur.name = "sphere" + "_number_" + this.countNum;
        this.countNum += 1;

        this.scene.add(sphere_1);
        this.objects.push(sphere_1);
        this.printContent();

        return sphere_1;
    }

    createCilindr(){
        let geometry = new THREE.CylinderBufferGeometry(1, 1, 2, 25 );
        let material = new THREE.MeshLambertMaterial( {color: "#ff2f1b"} );
        let cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.x = 0;
        cylinder.position.y = 0;
        cylinder.position.z = 0;

        let figur = cylinder;
        figur.rotation.x = 0;
        figur.rotation.y = 0;
        figur.rotation.z = 0;

        figur.name = "cilindr" + "_number_" + this.countNum;
        this.countNum += 1;

        this.scene.add(cylinder);
        this.objects.push(cylinder);
        this.printContent();

        return cylinder;
    }

    createConus(){
        let radius_1 = 1;
        let height_1 = 2;
        let sideNumber_1 = 4;
        let cone_geometry_1 = new THREE.ConeBufferGeometry(radius_1, height_1, sideNumber_1);
        let cone_material_1 = new THREE.MeshLambertMaterial({color: "#ff2f1b"});
        let cone_1 = new THREE.Mesh(cone_geometry_1,cone_material_1);
        cone_1.position.x = 0;
        cone_1.position.y = 0;
        cone_1.position.z = 0;

        let figur = cone_1;
        figur.rotation.x = 0;
        figur.rotation.y = 0;
        figur.rotation.z = 0;

        figur.name = "conus" + "_number_" + this.countNum;
        this.countNum += 1;

        this.scene.add(cone_1);
        this.objects.push(cone_1);
        this.printContent();

        return cone_1;
    }

    printContent(){
        this.renderer.render(this.scene, this.camera);
        this.printSceneAndObjArr();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjectWorker;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AjaxCreator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AlertWindow__ = __webpack_require__(5);





class JSONcreator{
    constructor(objects, objectWorker){
        this.objects = objects;
        this.addClickEventForMakingJSON();

        this.objectWorker = objectWorker;

        this.workWithJSONfromURL();
    }

    workWithJSONfromURL(){
        const url = location.search;

        if(url.indexOf("?") === -1){
            console.log("It is NEW project");
            return;
        }

        console.log("It is LOADED project");

        let mass = [];
        mass = url.split("?");
        let stringJSON = mass[1].toString();

        stringJSON = decodeURIComponent(stringJSON);

        let myJSON = JSON.parse(stringJSON);

        let arr = myJSON.arr;

        for(let i = 0; i < arr.length; i++){
            const aaa = arr[i];

            let f = null;

            if(aaa.type === "cube") {
                f = this.objectWorker.createCube();
            }

            if(aaa.type === "sphere") {
                f = this.objectWorker.createSphere();
            }

            if(aaa.type === "cilindr") {
                f = this.objectWorker.createCilindr();
            }

            if(aaa.type === "conus") {
                f = this.objectWorker.createConus();
            }

            f.position.x = aaa.positionX;
            f.position.y = aaa.positionY;
            f.position.z = aaa.positionZ;

            f.rotation.x = aaa.rotationX;
            f.rotation.y = aaa.rotationY;
            f.rotation.z = aaa.rotationZ;

            f.scale.x = aaa.scaleX;
            f.scale.y = aaa.scaleY;
            f.scale.z = aaa.scaleZ;

            this.modifyColor(aaa.color.toString(), f);
        }

    }

    modifyColor(sss, obj){
        const s = sss.toString();

        const red = parseInt( ( s.charAt(1) + s.charAt(2) ).toString() , 16);
        const green = parseInt( ( s.charAt(3) + s.charAt(4) ).toString() , 16);
        const blue = parseInt( ( s.charAt(5) + s.charAt(6) ).toString() , 16);

        obj.material.color.r = red / 255;
        obj.material.color.g = green / 255;
        obj.material.color.b = blue / 255;
    }

    addClickEventForMakingJSON(){
        const t = this;

        document.getElementById("btnGetJSON").addEventListener("click", function(){
            t.makeJSON();
        });
    }

    makeJSON(){
        for(let i = 0; i < 10; i++) {
            console.log("Getting result JSON");
        }

        const n = this.objects.length;

        let myObj = {
            arr: []
        };

        for(let i = 0; i < n; i++){
            const obj = this.objects[i];

            let aaa = {};

            aaa.type = obj.name.split("_")[0];

            aaa.color = this.getObjColor(obj);

            aaa.scaleX = obj.scale.x;
            aaa.scaleY = obj.scale.y;
            aaa.scaleZ = obj.scale.z;

            aaa.rotationX = obj.rotation.x;
            aaa.rotationY = obj.rotation.y;
            aaa.rotationZ = obj.rotation.z;

            aaa.positionX = obj.position.x;
            aaa.positionY = obj.position.y;
            aaa.positionZ = obj.position.z;

            myObj.arr.push(aaa);
        }

        let answer = encodeURIComponent(JSON.stringify(myObj));

        const projectName = localStorage.getItem("ScienceDev_variable_3d_project");
        const loginField = localStorage.getItem("ScienceDev_variable_man_nickname");
        const passwordField = localStorage.getItem("ScienceDev_variable_man_password");
        const projectContent = answer + "";

        __WEBPACK_IMPORTED_MODULE_0__AjaxCreator__["a" /* default */].sendPostQuery("save_update_proj", {
            projectName: projectName,
            loginField: loginField,
            passwordField: passwordField,
            projectContent: projectContent
        }, (resultStr) => {
            console.log("Result: " + resultStr);
            new __WEBPACK_IMPORTED_MODULE_1__AlertWindow__["a" /* default */]().showMessage("Сохранение прошло успешно.")
        });
    }

    getObjColor(obj){
        const colorObj = obj.material.color;
        const c = 255;

        let sR =  (c * colorObj.r).toString(16);
        if(sR.length === 1){
            sR += '0';
        }

        let sG =  (c * colorObj.g).toString(16);
        if(sG.length === 1){
            sG += '0';
        }

        let sB =  (c * colorObj.b).toString(16);
        if(sB.length === 1){
            sB += '0';
        }

        return ("#" + sR + sG + sB);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = JSONcreator;




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class AjaxCreator {

    static generateRandomString() {
        let s = "";
        for(let i = 0; i < 10; i++) {
            const r = Math.random();
            s = s + r.toString();
        }
        let q = s.split(".").join("");
        return q.toString();
    }

    static getBasicUrl() {
        return "http://localhost:5000/";
    }

    static sendPostQuery (operation, bodyObj, callback) {
        console.log("SEND_POST_QUERY");
        const url = AjaxCreator.getBasicUrl() + operation + "/" + AjaxCreator.generateRandomString() + Math.random() + "__" + Math.random();
        const bodyString = JSON.stringify(bodyObj);
        console.log("--------------------------------------");
        console.log("Method: POST");
        console.log("Url: " + url);
        console.log("Body: " + bodyString);
        let r = new XMLHttpRequest();
        r.open("POST", url, true);
        r.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        r.send(bodyString);
        r.onreadystatechange = function()  {
            if(r.readyState === 4 && r.status === 200) {
                const result = r.responseText;
                console.log("Result: " + result);
                console.log("--------------------------------------");
                r = null;
                callback(result);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AjaxCreator;



/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class PropChanger {
    constructor(scene, renderer, camera, objects){
        this.type = "";

        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.objects = objects;

        this.initTextFieldsAndSliders();

        this.w = false;
        this.s = false;
        this.a = false;
        this.d = false;

        this.uuuu = false;
        this.dddd = false;

        this.obj = null;

        this.addKeyListeners();
        this.addInterval();

        this.addEventOfDroppingObject();

        this.getInfoAboutAllObjectsInConsole();

        this.addEventToColorBtn();
    }

    initTextFieldsAndSliders(){
        this.pxx = document.getElementById("px");
        this.pyy = document.getElementById("py");
        this.pzz = document.getElementById("pz");

        this.rxxx = document.getElementById("rxxx");
        this.ryyy = document.getElementById("ryyy");
        this.rzzz = document.getElementById("rzzz");
    }

    setRotationProperties(){
        const t = this;
        let obj = this.obj;

        if(obj !== null && obj !== undefined){
            try{
                t.rxxx.value = parseFloat(t.obj.rotation.x);
                t.ryyy.value = parseFloat(t.obj.rotation.y);
                t.rzzz.value = parseFloat(t.obj.rotation.z);
            } catch (err) {
                // err
            }
        }
    }

    setPositionProperties(){
        let obj = this.obj;
        const t = this;

        const number = 10;

        if(obj !== null && obj !== undefined){
            try{
                t.pxx.value = parseInt(obj.position.x * number) / number;
                t.pyy.value = parseInt(obj.position.y * number) / number;
                t.pzz.value = parseInt(obj.position.z * number) / number;
            } catch (err) {
                // err
            }
        }
    }


    getObjColor(){
        const colorObj = this.obj.material.color;
        const c = 255;

        let sR =  (c * colorObj.r).toString(16);
        if(sR.length === 1){
            sR += '0';
        }

        let sG =  (c * colorObj.g).toString(16);
        if(sG.length === 1){
            sG += '0';
        }

        let sB =  (c * colorObj.b).toString(16);
        if(sB.length === 1){
            sB += '0';
        }


        document.getElementById("colorBtn").value = "" + ("#" + sR + sG + sB);
    }


    setObj(obj){
        this.obj = obj;
        this.setPositionProperties();
        this.setRotationProperties();
        this.showParamNames();


        this.getObjColor();
    }

    addEventToColorBtn(){
        const t = this;
        document.getElementById("colorBtn").oninput = function(){
            const s = document.getElementById("colorBtn").value;

            const red = parseInt( ( s.charAt(1) + s.charAt(2) ).toString() , 16);
            const green = parseInt( ( s.charAt(3) + s.charAt(4) ).toString() , 16);
            const blue = parseInt( ( s.charAt(5) + s.charAt(6) ).toString() , 16);

            t.obj.material.color.r = red / 255;
            t.obj.material.color.g = green / 255;
            t.obj.material.color.b = blue / 255;
        }
    }

    showParamNames(){
        function elem(s){
            s = s.toString();
            return document.getElementById(s);
        }

        const nameObj = this.obj.name.toString();
        console.log(this.obj);

        let mass = [];
        mass = nameObj.split("_");
        const type = mass[0].toString();

        this.type = type;

        const m1 = elem("m1");
        const m2 = elem("m2");
        const m3 = elem("m3");

        const q1 = elem("q1");
        const q2 = elem("q2");
        const q3 = elem("q3");


        q1.value = this.obj.scale.x;
        q2.value = this.obj.scale.y;
        q3.value = this.obj.scale.z;
    }

    addEventOfDroppingObject(){
        const t = this;

        document.getElementById("dropObjBtn").addEventListener("click", function () {
            let obj = t.obj;

            if(obj !== null && obj !== undefined){
                try{

                    let indexToDelete = -1;
                    for(let i = 0; i < t.objects.length; i++){
                        if(obj === t.objects[i]){
                            indexToDelete = i;
                            break;
                        }
                    }

                    t.objects.splice(indexToDelete, 1);

                    t.scene.remove(t.obj);

                    t.obj = null;
                    obj = null;

                    document.getElementById("propBox").hidden = true;
                    t.getInfoAboutAllObjectsInConsole();

                } catch (err) {
                   console.log("ERROR of deleting");
                }
            }
            t.renderer.render(t.scene, t.camera);
        });
    }

    getInfoAboutAllObjectsInConsole(){
        const flag = true;

        if(flag === true) {
            console.log("----------------------------------");
            console.log("Кол-во объектов на сцене: " + this.scene.children.length);
            console.log("Количество объектов в массиве объектов: " + this.objects.length);
        }
    }

    addKeyListeners(){
        const t = this;

        window.onkeydown = function(event) {
            const n = event.keyCode;
            // console.log("KeyDown: " + n);

            switch (n){
                case 87:  t.w = true;  break;
                case 83:  t.s = true;  break;
                case 65:  t.a = true;  break;
                case 68:  t.d = true;  break;

                case 38:  t.uuuu = true;  break;
                case 40:  t.dddd = true;  break;
            }
        };

        window.onkeyup = function(event) {
            const n = event.keyCode;
            // console.log("KeyUp: " + n);

            switch (n){
                case 87:  t.w = false;  break;
                case 83:  t.s = false;  break;
                case 65:  t.a = false;  break;
                case 68:  t.d = false;  break;

                case 38:  t.uuuu = false;  break;
                case 40:  t.dddd = false;  break;
            }
        }
    }

    addInterval(){
        const t = this;
        const speed = 0.1;

        function elem(s){
            s = s.toString();
            return document.getElementById(s);
        }

        const q1 = elem("q1");
        const q2 = elem("q2");
        const q3 = elem("q3");

        this.intervalProp = setInterval(function(){
                if(t.obj !== null && t.obj !== undefined){
                    let someThingChanged = false;
                    try{
                        if(t.w === true) {
                            t.obj.position.z -= speed;
                            someThingChanged = true;
                        }
                        if(t.s === true){
                            t.obj.position.z += speed;
                            someThingChanged = true;
                        }
                        if(t.a === true){
                            t.obj.position.x -= speed;
                            someThingChanged = true;
                        }
                        if(t.d === true){
                            t.obj.position.x += speed;
                            someThingChanged = true;
                        }
                        if(t.uuuu === true){
                            t.obj.position.y += speed;
                            someThingChanged = true;
                        }
                        if(t.dddd === true){
                            t.obj.position.y -= speed;
                            someThingChanged = true;
                        }

                        t.obj.scale.x = q1.value;
                        t.obj.scale.y = q2.value;
                        t.obj.scale.z = q3.value;

                        if(someThingChanged === true){
                            t.setPositionProperties();
                            t.setRotationProperties();
                        } else {
                            t.obj.position.x = parseFloat(t.pxx.value);
                            t.obj.position.y = parseFloat(t.pyy.value);
                            t.obj.position.z = parseFloat(t.pzz.value);


                            t.obj.rotation.x = parseFloat(t.rxxx.value);
                            t.obj.rotation.y = parseFloat(t.ryyy.value);
                            t.obj.rotation.z = parseFloat(t.rzzz.value);
                        }
                    } catch (err) {
                        // err
                    }
                }
                t.renderer.render(t.scene, t.camera);
        }, 50)
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PropChanger;


/***/ })
/******/ ]);