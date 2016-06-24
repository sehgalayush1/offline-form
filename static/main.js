if ('serviceWorker' in navigator) {
 console.log('Service Worker is supported');
 navigator.serviceWorker.register('static/sw.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}


function sendForm() {
    return addFormToOutbox().then(() => {
        return navigator.serviceWorker.ready;
    }).then(reg => {
        return reg.sync.register('send-form');
    }).then(() => {
        console.log('Sync registered!');
    }).catch(() => {
        console.log('Sync registration failed :(');
    });
}


function addFormToOutbox() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var request, db; 
                
    if(!window.indexedDB)
    {
        console.log("Your Browser does not support IndexedDB");
    }
    else
    {
        request = window.indexedDB.open("Form", 2);
        request.onerror = function(event){
            console.log("Error opening DB", event);
        }
        request.onupgradeneeded   = function(event){
            console.log("Upgrading");
            db = event.target.result;
            var objectStore = db.createObjectStore("form_data", { keyPath : "email" });
        };
        request.onsuccess  = function(event){
            console.log("Success opening DB");
            db = event.target.result;
        }
    }
                
    $("#btn").click(function(){
        var email = $("#email").val();
        var pswd = $("#pswd").val();
        var cpswd = $("#cpswd").val();
        var tw = $("#tw").val();
        var fb = $("#fb").val();
        var gp = $("#gp").val();
        var fn = $("#fn").val();
        var ln = $("#ln").val();
        var pn = $("#pn").val();
        var ad = $("#ad").val();
                    
        var transaction = db.transaction(["form_data"],"readwrite");
        transaction.oncomplete = function(event) {
            console.log("Success :)");
        };
                    
        transaction.onerror = function(event) {
            console.log("Error :(");
        };  
        var objectStore = transaction.objectStore("form_data");
                    
        objectStore.add({email: email, pswd: pswd, cpswd: cpswd, tw: tw, fb: fb, gp: gp, fn: fn, ln: ln, pn: pn, ad: ad});
    });
}


