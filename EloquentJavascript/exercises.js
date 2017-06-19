window.onload = function(){
    console.log("EXERCISES CAP. 2");

    console.log("\n1. Looping a triangle");
    var print = "";
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < i; j++) {
            print += "#";
        }
        console.log(print);
        print = "";
    }

    console.log("\n2. Fizz Buzz");
    for (var i = 0; i < 100; i++) {
        var print = "";
        if((i + 1) % 3 === 0){
            print += "Fizz";
        }
        if((i + 1) % 5 === 0){
            print += "Buzz";
        }
        console.log(print || i);
    }

    console.log("\n3. Chess Board");
    var size = 8,
        print = "";
    for (var i = 0; i < size; i++) {
        for(var j = 0; j < size; j++){
            if((i + j) % 2 == 0){
                print += " ";
            }
            else {
                print += "#";
            }
        }
        console.log(print);
        print = "";
    }

    function power(base, exponent){
        if(exponent == 0){
            return 1;
        }
        else{
            return base * power(base, exponent - 1);
        }
    }
    console.log(power(7, 10));

    function findSolution(target) {
        function find(start, history) {
            if (start == target)
                return history;
            else if (start > target)
                return null;
            else
                return find(start + 5, "(" + history + " + 5)") || find(start * 3, "(" + history + " * 3)");
        }
        return find(1, "1");
    }

    console.log(findSolution(24));

    function multiplier(factor){
        return function(number){
            return number*factor;
        }
    }

    var twice = multiplier(2);
    console.log(typeof twice);
    console.log(twice(3));


    console.log("EXERCISES CAP. 3");
    console.log("\n1. Minimun");

    function min(firstValue, ssecondValue){
        return Math.min(firstValue, ssecondValue);
    }

    console.log(min(111,455));

    console.log("\n2. Recursion");
    function isEven(number){
        if(number == 0){
            return true;
        }
        else if(number == 1){
            return false;
        }
        else if (number < 0) {
            return isEven(-number);
        }
        else{
            return isEven(number - 2);
        }
    }
    console.log(isEven(50));
    console.log(isEven(75));
    console.log(isEven(-1));

    console.log("\n3. Bean Counting");
    function countChar(string, char){
        var count = 0;
        for (var i = 0; i < string.length; i++) {
            if(string.charAt(i) == char){
                count++;
            }
        }
        return count;
    }
    function countBs(string){
        return countChar(string, "B");
    }

    console.log(countBs("BBC"));
    console.log(countChar("kakkerlak", "k"));

    console.log("EXERCISES CAP. 4");
    console.log("\n1. The sum of a range");

    function range(start, end, step){
        var arr = [];
        if(step == null){
            step = 1;
        }
        if(step < 0) {
            for (var i = start; i >= end; i += step) {
                arr.push(i);
            }
        }
        else{
            for (var j = start; j <= end; j+=step) {
                arr.push(j);
            }
        }
        return arr;
    }
    function sum(array){
        var sum = 0;
        for(var i = 0; i < array.length; i++){
            sum += array[i];
        }
        return sum;
    }

    console.log(range(1,10));
    console.log(range(5, 2, -1));
    console.log(sum(range(1,10)));

    console.log("\n2. Reverse an array");
    function reverseArray(arr){
        var newArr = [];
        for (var i = arr.length - 1; i >= 0; i--) {
            newArr.push(arr[i]);
        }
        return newArr;
    }

    function reverseArrayInPlace(arr){
        var tmp, old;

        for(var i = 0; i < Math.ceil(arr.length / 2); i++){
            tmp = arr[i];
            old = arr[arr.length - 1 - i];
            console.log("tmp " + tmp + " old " + old);
            arr[arr.length - 1 - i] = tmp;
            arr[i] = old;
        }
    }

    console.log(reverseArray(["A", "B", "C"]));
    var arrayValue = [1, 2, 3, 4, 5];
    reverseArrayInPlace(arrayValue);
    console.log(arrayValue);

    console.log("\n3. A list");
    function arrayToList(array){
        var list = null;
        for(var i = array.length - 1; i >= 0; i--){
            list = {
                value: array[i],
                rest: list
            };
        }
        return list;
    }

    function listToArray(list){
        var array = [], pos = 0;
        for(var node = list; node; node = node.rest){
            array[pos] = node.value;
            pos++;
        }
        return array;
    }

    function prepend(element, list){
        list = {
            value: element,
            rest: list
        };
        return list;
    }

    function nth(list, number){
        if(!list){
            return undefined;
        }
        else if(number == 0){
            return list.value;
        }
        else{
            return nth(list.rest, number - 1);
        }
    }

    console.log(arrayToList([10, 20]));
    console.log(listToArray(arrayToList([10, 20, 30])));
    console.log(prepend(10, prepend(20, null)));
    console.log(nth(arrayToList([10, 20, 30]), 2));

    console.log("\n4. Deep comparison");
    function deepEqual(a, b){
        if (a === b)
            return true;
        if (a == null || typeof a != "object" || b == null || typeof b != "object")
            return false;

        var propsInA = 0, propsInB = 0;

        for (var prop in a)
            propsInA += 1;

        for (var prop in b) {
            propsInB += 1;
            if (!(prop in a) || !deepEqual(a[prop], b[prop]))
                return false;
        }
        return propsInA == propsInB;
    }

    var obj = {here: {is: "an"}, object: 2};
    console.log(deepEqual(obj, obj));
    console.log(deepEqual(obj, {here: 1, object: 2}));
    console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
    console.log(deepEqual(2,2));
    console.log(deepEqual("A",4));
    deepEqual(null, 45);

    console.log("TESTING");
    function greaterThan(n) {
        console.log(n);
        return function(m) {
            console.log(m + ", " + n);
            return m > n;
        };
    }
    var greaterThan10 = greaterThan(10);
    console.log(greaterThan10);
    console.log(greaterThan10(11));

    function noisy(f) {
        console.log(f);
        return function(arg) {
            console.log(arg);
            console.log("calling with", arg);
            var val = f(arg);
            console.log("called with", arg, "- got", val);
            return val;
        };
    }

    noisy(Boolean)(0);

    var ancestry = JSON.parse(ANCESTRY_FILE);
    console.log(ancestry.length);

    function filter(array, test){
        var passed = [];
        for(var i = 0; i < array.length; i++){
            if(test(array[i])){
                passed.push(array[i]);
            }
        }
        return passed;
    }
    console.log(filter(ancestry, function(person){
        return person.born > 1900 && person.born < 1925;
    }));

    function map(array, transform){
        var mapped = [];
        for(var i = 0; i < array.length; i++){
            mapped.push(transform(array[i]));
        }
        return mapped;
    }

    var over90s = filter(ancestry, function(person){
        return person.died - person.born > 90;
    });
    console.log(map(ancestry, function(person){
        return person.name;
    }));

    function reduce(array, combine, start){
        var current = start;
        for (var i = 0; i < array.length; i++) {
            current = combine(current, array[i]);
        }
        return current;
    }
    console.log(reduce([1,2,3,4,5,6,7,8], function(a, b){
        return a + b;
    }, 0));

    console.log(ancestry.reduce(function(min, curr){
        if(curr.born < min.born){
            return curr;
        } else {
            return min;
        }
    }));

    function average(array){
        function plus(a,b){
            return a+b;
        }
        return array.reduce(plus) / array.length;
    }
    function age(person){
        return person.died - person.born;
    }
    function female(person){
        return person.sex == "f";
    }
    function male(person){
        return person.sex == "m";
    }
    console.log(average(ancestry.filter(male).map(age)));
    console.log(average(ancestry.filter(female).map(age)));

    var byName = {};
    ancestry.forEach(function(person) {
        byName[person.name] = person;
    });
    console.log(byName);
    console.log(byName["Philibert Haverbeke"]);

    function reduceAncestors(person, f, defaultValue) {
        function valueFor(person) {
            if (person == null){
                return defaultValue;
            }
            else{
                return f(person, valueFor(byName[person.mother]), valueFor(byName[person.father]));
            }
        }
        return valueFor(person);
    }

    function shredDNA(person, fromMother, fromFather){
        if(person.name == "Pauwels van Haverbeke"){
            return 1;
        }
        else {
            return (fromMother + fromFather) / 2;
        }
    }

    var ph = byName["Philibert Haverbeke"];
    console.log(reduceAncestors(ph, shredDNA, 0)/ 4);

    console.log("EXERCISES CAP. 5");
    console.log("\n1. Flattening");

    var arrays = [[1, 2, 3], [4, 5], [6]];
    console.log("MINE");
    console.log(
        arrays.reduce(
            function(prev, curr){
                return prev.concat(curr);
            }, []
        )
    );

    console.log("BOOK");
    console.log(
        arrays.reduce(
            function(flat, current) {
                return flat.concat(current);
            }, []
        )
    );

    console.log("NOT BUILT IN FUNCTIONS");
    function flat(array){
        var newArray = [];
        for(var i = 0; i < array.length; i++){
            newArray = newArray.concat(array[i]);
        }
        return newArray;
    }

    console.log(flat(arrays));
    console.log("\n2. Mother - child age difference");

    var differences = ancestry.filter(function(person) {
        return byName[person.mother] != null;
    }).map(function(person){
        console.log(byName[person.mother].born);
        return person.born - byName[person.mother].born;
    });
    console.log(average(differences));


    console.log("\n3. Historical life expectancy");
    function groupBy(array, groupOf) {
        var groups = {};
        array.forEach(function(element) {
            var groupName = groupOf(element);
            if (groupName in groups)
                groups[groupName].push(element);
            else
                groups[groupName] = [element];
        });
        return groups;
    }

    var byCentury = groupBy(ancestry, function(person) {
        return Math.ceil(person.died / 100);
    });

    for (var century in byCentury) {
        var ages = byCentury[century].map(function(person) {
            return person.died - person.born;
        });
        console.log(century + ": " + average(ages));
    }

    console.log("\n3. Every and then some");
    function every(array, func){
        for(var i = 0; i < array.length; i++){
            if(!func(array[i])){
                return false;
            }
        }
        return true;
    }

    function some(array, func){
        for (var i = 0; i < array.length; i++) {
            if(func(array[i])){
                return true;
            }
        }
        return false;
    }

    console.log(every([NaN, NaN, NaN], isNaN));
    console.log(every([NaN, NaN, 4], isNaN));
    console.log(some([NaN, 3, 4], isNaN));
    console.log(some([2, 3, 4], isNaN));


    var rabbit = {};
    rabbit.speaks = function(line){
        console.log("The", this.type, "rabbit says", line);
    };
    rabbit.type = "bad";
    rabbit.line = "pueblo roto y enfermo";
    rabbit.speaks("hello carrot");

    function speaker(line){
        console.log("the", this.type, "rabbit is saying", line);
    }
    var badRab = {
        type: "BAD",
        speaker: speaker
    };
    badRab.speaker("I'm going to kill everyone!");

    speaker.apply({type: "Nerd"}, ["Nah!, jk"]);
    var newFunc = speaker.bind({type: "red"}, "Nah!, jk");
    speaker.call({type: "Nice"}, "Cold as f***");

    newFunc();

    var empty = {};
    console.log(empty.toString);
    console.log(empty.toString());
    console.log(Object.prototype);
    console.log("empty object prototype");
    console.log(Object.getPrototypeOf(empty));

    console.log("\nPrototypes!");
    var protoRabbit = {
        name: "Elmo",
        color: "white",
        saySomething: function(something){
            console.log("he says", something);
        }
    };

    var newRabbit = Object.create(protoRabbit);
    console.log(Object.getPrototypeOf(newRabbit));

    console.log("\nConstructors");
    function Rabbit(name, type, word){
        this.name = name,
        this.type = type,
        this.word = word,
        this.speak = function(){
            console.log("My special word is: " + this.word);
        },
        this.greet = function(){
            console.log("Hi my name is", this.name, "and I'm" , this.type);
        }
    }
    var aRabbit = new Rabbit("Carl", "bad", "este es un evento internacional!");
    Rabbit.prototype.talk = function(){
        console.log("this rabbit says", this.word);
    }
    var anotherRabbit = new Rabbit("Mark", "red", "cereal");
    anotherRabbit.talk();
    console.log(Object.getPrototypeOf(anotherRabbit));

    Rabbit.prototype.teeth = "big";
    console.log(anotherRabbit.teeth);
    aRabbit.teeth = "brown";
    console.log(aRabbit.teeth);
    console.log(anotherRabbit.teeth);
    console.log(Rabbit.prototype.teeth);

    function rowHeights(rows){
        return rows.map(function(row){
            return row.reduce(function(max, cell){
                return Math.max(max, cell.minHeight());
            }, 0);
        });
    }

    function colWidths(rows){
        return rows[0].map(function(_, i){
            return rows.reduce(function(max, row){
                return Math.max(max, row[i].minWidth());
            }, 0);
        });
    }

    function drawTable(rows) {
        var heights = rowHeights(rows);
        var widths = colWidths(rows);

        console.log("heights", heights, "widths", widths);

        function drawLine(blocks, lineNo) {
            return blocks.map(function(block) {
                console.log("Array on position", block[lineNo]);
                return block[lineNo];
            }).join(" ");
        }

        function drawRow(row, rowNum) {
            console.log("Row", row, "Row Number", rowNum);
            var blocks = row.map(function(cell, colNum) {
                console.log("Cell", cell, "Col number", colNum);
                return cell.draw(widths[colNum], heights[rowNum]);
            });
            console.log("Blocks" + blocks);
            return blocks[0].map(function(_, lineNo) {
                console.log("Line Number", lineNo);
                return drawLine(blocks, lineNo);
            }).join("\n");
        }
        return rows.map(drawRow).join("\n");
    }

    function repeat(string, times) {
        var result = "";
        for (var i = 0; i < times; i++){
            result += string;
        }
        return result;
    }

    function TextCell(text) {
        this.text = text.split("\n");
    }
    TextCell.prototype.minWidth = function() {
        return this.text.reduce(function(width, line) {
            return Math.max(width, line.length);
        }, 0);
    };
    TextCell.prototype.minHeight = function() {
        return this.text.length;
    };
    TextCell.prototype.draw = function(width, height) {
        var result = [];
        for (var i = 0; i < height; i++) {
            var line = this.text[i] || "";
            result.push(line + repeat(" ", width - line.length));
        }
        return result;
    };

    var rows = [];
    for (var i = 0; i < 5; i++) {
       var row = [];
       for (var j = 0; j < 5; j++) {
           if ((j + i) % 2 == 0){
               row.push(new TextCell("##@"));
           }
           else{
               row.push(new TextCell("  "));
           }
       }
       rows.push(row);
    }
    console.log(drawTable(rows));

    function UnderlinedCell(inner) {
        this.inner = inner;
    }
    UnderlinedCell.prototype.minWidth = function() {
        return this.inner.minWidth();
    };
    UnderlinedCell.prototype.minHeight = function() {
        return this.inner.minHeight() + 1;
    };
    UnderlinedCell.prototype.draw = function(width, height) {
        return this.inner.draw(width, height - 1).concat([repeat("-", width)]);
    };

    function dataTable(data) {
        var keys = Object.keys(data[0]);
        var headers = keys.map(function(name) {
            return new UnderlinedCell(new TextCell(name));
        });
        var body = data.map(function(row) {
            return keys.map(function(name) {
                return new TextCell(String(row[name]));
            });
        });
        return [headers].concat(body);
    }

    console.log(drawTable(dataTable(MOUNTAINS)));

    function Vector(x, y){
        this.x = x;
        this.y = y;
    }

    Vector.prototype.plus = function(vector){
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    Vector.prototype.minus = function(vector){
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    Object.defineProperty(Vector.prototype, "length", {
        get: function(){
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    });

    console.log(new Vector(1, 2).plus(new Vector(2, 3)));
    console.log(new Vector(1, 2).minus(new Vector(2, 3)));
    console.log(new Vector(3, 4).length);

    function StretchCell(inner, width, height) {
        this.inner = inner;
        this.width = width;
        this.height = height;
    }

    StretchCell.prototype.minWidth = function() {
        return Math.max(this.width, this.inner.minWidth());
    };
    StretchCell.prototype.minHeight = function() {
        return Math.max(this.height, this.inner.minHeight());
    };
    StretchCell.prototype.draw = function(width, height) {
        return this.inner.draw(width, height);
    };

    var sc = new StretchCell(new TextCell("abc"), 1, 2);
    console.log(sc.minWidth());
    console.log(sc.minHeight());
    console.log(sc.draw(3, 2));

    var 
}
