console.log("manager load success!");

var divParent = document.getElementById("renderJS");
var js = document.createElement("script");

let x = location.pathname;
console.log(x);
js.type = "text/javascript";
console.log(x == "/aquatics")

if (x == "/") {
    js.src = "js/register.js";
}

if (x == "/aquatics" || x == "/immutableTemplate" || x == "/mutableTemplate") {
    js.src = "js/database.js";
}

divParent.appendChild(js);
//if (currentLocation.pathName = '/') {
//    console.log("run1");
//}
//if (currentLocation.pathname = '/Aquatics') {
//    console.log("run2");
//}
//if (currentLocation.pathname = '/') {
//    js.src = "js/register.js";
//}
//if (currentLocation.pathname = ("/aquatics")) {
//    js.src = "js/database.js";
//}

/*divParent.appendChild(js);*/