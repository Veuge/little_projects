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
    var input = document.getElementById("filter");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("data-table");
    var tr = table.getElementsByTagName("tr");
    var td;
    // var foundInRow = false;

    var i;
    var j;

    for (i = 1; i < tr.length; i++) {
        for (j = 0; j < tr[i].cells.length; j++) {
            td = tr[i].getElementsByTagName("td")[j];

            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            }
            else {
                if(j ===  tr[i].cells.length - 1){
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function prevPage(paginator){
    console.log("prev page");

    var limit = paginator.limit;
    var nextPage = Number(paginator.current_page) -  1;

    if(nextPage > 0){
        var pathStr = "regulars?" + "limit=" + limit + "&page=" + nextPage;
        var path = encodeURI(pathStr);

        var template = new RegularStudent();
        var arrayOfObjects = getCollection(path, template.jsonArrayToRegularArray);
        title = "Regular Students";

        createTitle(title, template, createElement);
        createDataTable(arrayOfObjects);
    }
}

function nextPage(paginator){
    console.log("next page", paginator);

    var limit = paginator.limit;
    var nextPage = Number(paginator.current_page) + 1;

    if(nextPage <= paginator.total_pages){
        var pathStr = "regulars?" + "limit=" + limit + "&page=" + nextPage;
        var path = encodeURI(pathStr);

        var template = new RegularStudent();
        var arrayOfObjects = getCollection(path, template.jsonArrayToRegularArray);
        title = "Regular Students";

        createTitle(title, template, createElement);
        createDataTable(arrayOfObjects);
    }
}

function isNumber(test){
    if(! isNaN(Number(test)))
        return true;
    else
        return false;
}
