function testSimple() {
    let input = [6, 1, 2, 6, 3, 2, 1]; // first number is size of array
    let actual = maximizeArray(input);
    console.log(arrayEquals([2, 3, 1, 6, 1, 2], actual));
}

function testOrdered() {
    let input = [6, 1, 1, 2, 2, 3, 6]; // first number is size of array
    let actual = maximizeArray(input);
    console.log(arrayEquals([2, 2, 3, 6, 1, 1], actual));
}

function testReverseOrdered() {
    let input = [6, 6, 3, 2, 2, 1, 1]; // first number is size of array
    let actual = maximizeArray(input);
    console.log(arrayEquals([1, 6, 3, 1, 2, 2], actual));
}

function maximizeArray(values) {
    let length = values.shift();
    
    return replaceEachElementWithNextHighestAvailableValue(values, length);
}

function replaceEachElementWithNextHighestAvailableValue(values, length) {
    let frequencies = getFrequenciesByValue(values);
    let keys = Object.keys(frequencies);
    let maximizedArray = [];
    values.forEach(function (element) {
        let nextItem = getNextItem(element, keys, length, frequencies);
        maximizedArray.push(parseInt(nextItem));
        frequencies[nextItem]--;
        if (frequencies[nextItem] == 0) {
            delete frequencies[nextItem];
        }
    });

    return maximizedArray;
}

function getFrequenciesByValue(values) {
    let frequencies = {};
    values.forEach(function (element, index) {
        if (element in frequencies) {
            frequencies[element]++;
            return;
        }
        
        frequencies[element] = 1;
    });
    
    return frequencies;
}

function getNextItem(element, keys, length, frequencies) {
    let nextItem = '';
    let i = 0;
    let nextIndex = keys.indexOf(element+'') + 1;
    do {
        if (nextIndex >= keys.length) {
            nextIndex = 0;
        }
        nextItem = keys[nextIndex];
        if (i++ > length) {
            break;
        }
        nextIndex++;
    } while (frequencies[nextItem] == 0 || !(nextItem in frequencies));
    
    return nextItem;
}

function arrayEquals(a, b) { // source: https://flexiple.com/javascript/javascript-array-equality/
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}