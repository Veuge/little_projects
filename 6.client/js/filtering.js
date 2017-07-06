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

function filterTable() {
    // Declare variables
    var input = document.getElementById("myInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("data-table");
    var tr = table.getElementsByTagName("tr");
    console.log(tr[1].cells.length);

    var td;
    var i;
    var j = 0;
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        // while (j < tr[i].cells.length) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
            // j++;
        // }
        // j = 0;
    }
}

function isNumber(test){
    if(! isNaN(Number(test)))
        return true;
    else
        return false;
}
