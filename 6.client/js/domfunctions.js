function createDataTable(objectArray){
    var table = document.getElementById("data-table");

    restartEmptySettings(table);
    createTableHeader(table, objectArray[0]);
    objectArray.forEach(function createRows(object){
        createTableRow(table, object);
    });
}


function createTableHeader(table, object){
    var newHeader;
    var attr;
    var newCell;
    var text;

    newHeader = document.createElement("tr");
    for(attr in object){
        if(object.hasOwnProperty(attr)){
            newCell = document.createElement("th");
            text = document.createTextNode(attr);
            newCell.appendChild(text);
            newHeader.appendChild(newCell);
        }
    }
    table.appendChild(newHeader);
}

function createTableRow(table, object){
    var newRow;
    var newCell;
    var newBtn;
    var attr;
    var text;
    var actual;
    var str;
    var i;

    newRow = document.createElement("tr");
    newRow.className = "item";
    for(attr in object){
        if(object.hasOwnProperty(attr)){
            newCell = document.createElement("td");
            if(Array.isArray(object[attr]) && typeof object[attr][0] == "object"){
                actual = object[attr];
                str = "";
                for(i = 0; i < actual.length; i++){
                    str += actual[i][objectProperty] + " ";
                }
                text = document.createTextNode(str);
            }
            else{
                text = document.createTextNode(object[attr]);
            }
            newCell.appendChild(text);
            newRow.appendChild(newCell);
        }
    }
    table.appendChild(newRow);
}

function restartEmptySettings(node){
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}
