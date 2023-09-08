/**
 * =========================================================================================================
 * 
 * @Author          Ellie Seraphine
 * @version         1.2.0
 * @project         Aquatics Inventory Management System
 * 
 * @file site.js 
 * manages the loading of javascript files based on the view. This is a security issue
 * and should be refactored to use a different method of loading scripts. Use for testing purposes only.
 * 
 * =========================================================================================================
 */

let x = location.pathname;
var divParent = document.getElementById("renderJS");

if (x = "/") {
    jshome = document.createElement("script");
    jshome.type = "text/javascript";
    jshome.src = "js/login.js";
    divParent.appendChild(jshome);
}


if (x = "/aquatics" || x == "/immutableTemplate" || x == "/mutableTemplate") {
    filename = document.createElement("script");
    filename.type = "text/javascript";
    filename.src = "/js/ajax-handler.js";
    divParent.appendChild(filename);

    filename = document.createElement("script");
    filename.type = "text/javascript";
    filename.src = "/js/authorization.js";
    divParent.appendChild(filename);

}
    
/**
 * Returns x number of scripts to _Layout.cshtml depending on the current route.
 *
 * @param {number} d The number of files to load, set by the creator or administrator.
 * @return {number} series of filenames to load on DOM node.
 */

function jsManager(d) {

    let x = location.pathname;
    var divParent = document.getElementById("renderJS");

    if (d > 4) {
        throw ErrorEvent("Not enough files to load!");
    };

    var ls = ["js/addRecord.js", "js/database.js", "js/register.js", "js/immutableTemplate.js", "js/mutableTemplate.js"];
    if (x = "/") {
        jshome = document.createElement("script");
        jshome.type = "text/javascript";
        jshome.src = "js/register.js";
        divParent.appendChild(jshome);
    }
    if (x = "/aquatics" || x == "/immutableTemplate" || x == "/mutableTemplate") {
        for (x in Array.from(d)) {
            var filename = "js" + x;
            filename = document.createElement("script");
            filename.type = "text/javascript";
            filename.src = ls[x];
            divParent.appendChild(filename);
        }
        return;
    }
}