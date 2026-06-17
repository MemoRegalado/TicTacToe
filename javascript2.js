let array = [1, 2, 3, 4 ,5];
console.log(array[2]);

array.push(6);
console.log(array);

let newArray = array.map (element => element * 2);
console.log(newArray);

let arrayOnlyEven = array.filter (element => element % 2 === 0);
console.log(arrayOnlyEven);

let arrayAverage = array.reduce ((sum, num) => sum + num, 0) / array.length
console.log(arrayAverage);