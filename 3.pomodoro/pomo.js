function countdown(minutes){
    var now = new Date();
    var later = new Date(Date.parse(now) + (minutes * 60000));
    var count = 0;
    console.log("\nNOW: " +now);
    console.log("LATER: " + later);
    var remainingMin = Math.ceil((later - now)/60000) - 1;

    var newInterval = setInterval(function(){
        var now = new Date();
        count++;
        var remainingSec = 60 - count;
        if(remainingSec == 0){
            count = 0;
            remainingMin = Math.ceil((later - now)/60000) - 1;
        }
        console.log(remainingMin + ":" + remainingSec);
        if(remainingMin <= 0 && remainingSec == 0){
            clearInterval(newInterval);
            console.log("STOP!");
        }
    }, 100);
}

window.onload = function(){
    var i = 0,
        workTime = 2,
        restTime = 5;
    var start = document.getElementById("start");

    start.onclick = function(e){
        start.disabled = true;
        console.log("START!");
        countdown(workTime);
    };
};
