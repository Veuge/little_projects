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

function prevPage(args){
    var limit = args[0].limit;
    var nextPage = Number(args[0].current_page) - 1;

    var path = fromClassnameToPath(args[1].constructor.name);
    var conversionFunction = Object.getOwnPropertyNames(args[1].constructor.prototype)[2];;

    if(nextPage > 0){
        requestNextPage(path, limit, nextPage, args[1], conversionFunction);
    }
}

function nextPage(args){
    var limit = args[0].limit;
    var nextPage = Number(args[0].current_page) + 1;

    var path = fromClassnameToPath(args[1].constructor.name);
    var conversionFunction = Object.getOwnPropertyNames(args[1].constructor.prototype)[2];;

    if(nextPage <= args[0].total_pages){
        requestNextPage(path, limit, nextPage, args[1], conversionFunction);
    }
}

function requestNextPage(path, limit, nextPage, object, conversionFunction){
    var pathStr = path + "?" + "limit=" + limit + "&page=" + nextPage;
    var path = encodeURI(pathStr);

    var arrayOfObjects = getCollection(path, object[conversionFunction]);
    title = object.constructor.name;

    createTitle(title, object, createElement);
    createDataTable(arrayOfObjects);
}

function isNumber(test){
    if(! isNaN(Number(test)))
        return true;
    else
        return false;
}
