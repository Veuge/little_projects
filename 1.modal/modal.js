window.onload = (function(){
    var triggerButton = document.getElementById("trigger");
    var modalContainer = document.getElementById("modal");
    var body = document.getElementsByTagName("body");
    var closeButton = document.getElementById("close");

    triggerButton.onclick = function(event){
        console.log("Open!");
        modalContainer.style.display = "block";

    };

    closeButton.onclick = function(event){
        console.log("Close!");
        modalContainer.style.display = "none";
    };
});
