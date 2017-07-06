console.log("Filters");

function sortTable(n) {
    var table = document.getElementById("data-table");
    var rows = table.getElementsByTagName("tr");
    var current = rows[1].getElementsByTagName("td")[n];
    var next;
    var currentValue;
    var nextValue;

    var sortingNumbers = isNumber(current.innerHTML);

    var switching = true
    var direction = "asc";
    var switchcount = 0;

    var i;
    var shouldSwitch;

    while (switching) {
        switching = false;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            current = rows[i].getElementsByTagName("td")[n];
            next = rows[i + 1].getElementsByTagName("td")[n];

            if(! sortingNumbers){
                currentValue = current.innerHTML.toLowerCase();
                nextValue = next.innerHTML.toLowerCase();
            }
            else{
                currentValue = Number(current.innerHTML);
                nextValue = Number(next.innerHTML);
            }

            if (direction == "asc") {
                if (currentValue > nextValue) {
                    shouldSwitch= true;
                    break;
                }
            }
            else if (direction == "desc") {
                if (currentValue < nextValue) {
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        }
        else {
            if (switchcount == 0 && direction == "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }
}

function isNumber(test){
    if(! isNaN(Number(test)))
        return true;
    else
        return false;
}
