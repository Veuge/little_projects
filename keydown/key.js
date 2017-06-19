var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }
        else if(element.attachEvent){
            element.attachEvent("on" + type, handler);
        }
        else{
            element["on" + type] = handler;
        }
    },

    removeHandler: function(element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }
        else if(element.detachEvent){
            element.detachEvent("on" + type, handler);
        }
        else{
            element["on" + type] = null;
        }
    },

    getEvent: function(event){
        return event ? event : window.event;
    },

    getTarget: function(event){
        return event.target || event.srcElement;
    },

    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }
        else{
            event.returnValue = false;
        }
    },

    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }
        else{
            event.cancelBubble = true;
        }
    }
};

window.onload = function(){
    console.log("Here we are!");
    var txt = document.getElementById("text");
    EventUtil.addHandler(text, "keyup", function(event){
        event = EventUtil.getEvent(event);
        if((event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode >= 48 && event.keyCode <= 57)){
            console.log("Numbers: " + event.keyCode);
        }
        else {
            console.log("Operators: " + event.keyCode);
        }
    });
}
