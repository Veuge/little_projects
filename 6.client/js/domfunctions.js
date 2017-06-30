function createDataTable(objectArray){
    var content = document.getElementById("content");
    var newTable = document.createElement("table");
    newTable.setAttribute("id", "data-table");
    content.appendChild(newTable);

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
    var newLink;
    var attr;
    var text;
    var actual;
    var str;
    var i;
    var classname = object.constructor.name.toLowerCase() + " " + object.id;

    newRow = document.createElement("tr");
    newRow.className = "item " + classname;
    for(attr in object){
        if(object.hasOwnProperty(attr)){
            newCell = document.createElement("td");
            text = document.createTextNode(object[attr]);
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

function createDetails(container, object){
    var newDescriptionList = document.createElement("dl");
    var newDataTerm;
    var newDataDesc;
    var text;
    var attr;

    for(attr in object){
        if (object.hasOwnProperty(attr)) {
            newDataTerm = document.createElement("dt");
            text = document.createTextNode(attr);
            newDataTerm.appendChild(text);
            newDescriptionList.appendChild(newDataTerm)

            newDataDesc = document.createElement("dd");
            text = document.createTextNode(object[attr]);
            newDataDesc.appendChild(text);
            newDescriptionList.appendChild(newDataDesc);
        }
    }
    container.appendChild(newDescriptionList);
}
