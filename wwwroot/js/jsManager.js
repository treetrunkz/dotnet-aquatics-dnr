console.log("manager load success!");

let x = location.pathname;
var divParent = document.getElementById("renderJS");

if (x = "/") {
    jshome = document.createElement("script");
    jshome.type = "text/javascript";
    jshome.src = "js/register.js";
    divParent.appendChild(jshome);
}


if (x = "/aquatics" || x == "/immutableTemplate" || x == "/mutableTemplate") {
    filename = document.createElement("script");
    filename.type = "text/javascript";
    filename.src = "/js/addRecord.js";
    divParent.appendChild(filename);
}
    


//function jsManager(d) {

//    let x = location.pathname;
//    var divParent = document.getElementById("renderJS");

//    console.log(x);

//    if (d > 4) {
//        throw ErrorEvent("Not enough files to load!");
//    };

//    var ls = ["js/addRecord.js", "js/database.js", "js/register.js", "js/immutableTemplate.js", "js/mutableTemplate.js"];
//    if (x = "/") {
//        jshome = document.createElement("script");
//        jshome.type = "text/javascript";
//        jshome.src = "js/register.js";
//        divParent.appendChild(jshome);
//    }
//    if (x = "/aquatics" || x == "/immutableTemplate" || x == "/mutableTemplate") {
//        for (x in Array.from(d)) {
//            var filename = "js" + x;
//            filename = document.createElement("script");
//            filename.type = "text/javascript";
//            filename.src = ls[x];
//            divParent.appendChild(filename);
//        }
//        return;
//    }
//}