function countdown(endTime, interval){
    var now = new Date().getTime();
    var difference = endTime - now;
    var remainingMin = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var remainingSec = Math.floor((difference % (1000 * 60)) / 1000) + 1;
    if(remainingMin < 0){
        console.log("0:" + remainingSec);
    }
    else {
        console.log(remainingMin + ":" + remainingSec);
    }
    if (difference < 0) {
        clearInterval(interval);
        console.log("EXPIRED");
    }
}

window.onload = function(){
    // DOM references
    var iWorkTime = document.getElementById("worktime"),
        iRestTime = document.getElementById("resttime"),
        iTrigger = document.getElementById("start"),
        workTime,
        restTime;

    iTrigger.onclick = function(){
        // User input values
        workTime = iWorkTime.value;
        restTime = iRestTime.value;

        // Sets the stage to work
        var work = true,
        stageLen = work ? workTime : restTime;

        var startTime = new Date().getTime();
        var endTime = new Date(startTime + stageLen * 60000).getTime();

        console.log(startTime + " " + endTime);
        var interval = setInterval(function(){
            countdown(endTime, interval);
        }, 1000);
    };
};
