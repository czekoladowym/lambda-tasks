#!/usr/bin/env node
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const getAllWordsFromArray = function (values) {
  let names = values.split(" ").filter((x) => isNaN(parseFloat(x)));
  let sortedNames = names.sort();
  return sortedNames;
};
const getAllWordsFromArrayByQuantity = function (values) {
  let names = values.split(" ").filter((x) => isNaN(parseFloat(x)));
  let sortedNames = names.sort((a, b) => a.length - b.length);
  return sortedNames;
};
const getAllNumbersFromSmallerFromArray = function (values) {
  let numbers = values.split(" ").filter((x) => !isNaN(parseFloat(x)));
  let sortedNumbers = numbers.sort((a, b) => a - b);
  return sortedNumbers;
};
const getAllNumbersFromBiggerFromArray = function (values) {
  let numbers = values.split(" ").filter((x) => !isNaN(parseFloat(x)));
  let sortedNumbers = numbers.sort((a, b) => b - a);
  return sortedNumbers;
};
const getAllUniqueWordsFromArray = function (values) {
  let uniqueWords = values.split(" ").filter(onlyUniqueWords);
  let fullUniqueWords = uniqueWords.filter((x) => isNaN(parseFloat(x)));
  function onlyUniqueWords(value, index, self) {
    return self.indexOf(value) === index;
  }
  return fullUniqueWords;
};
const getAllUniqueElementsFromArray = function (values) {
  let uniqueElements = values.split(" ").filter(onlyUniqueElements);
  function onlyUniqueElements(value, index, self) {
    return self.indexOf(value) === index;
  }
  return uniqueElements;
};

function restart() {
  rl.question(
    "Hey, enter 10 digits or words writing them through space: ",
    function (values) {
      rl.question(
        "How would you like to sort values: \n1. Words by name (From A to Z)." +
          "\n2. Show digits from the smallest." +
          "\n3. Show digits from the biggest." +
          "\n4. Words by quantity of letters." +
          "\n5. Only unique words." +
          "\n6. Only unique elements (words and digits)." +
          "\n\n Type exit for end all operations." +
          "\n\nSelect(1 - 5) and press Enter: ",
        function select(choice) {
          choice === "1" && console.log(getAllWordsFromArray(values));
          choice === "2" &&
            console.log(getAllNumbersFromSmallerFromArray(values));
          choice === "3" &&
            console.log(getAllNumbersFromBiggerFromArray(values));
          choice === "4" && console.log(getAllWordsFromArrayByQuantity(values));
          choice === "5" && console.log(getAllUniqueWordsFromArray(values));
          choice === "6" && console.log(getAllUniqueElementsFromArray(values));
          choice === "exit" && rl.close();
          restart();
        }
      );
    }
  );
}
restart();
rl.on("close", function () {
  console.log("\nThank you for using!");
  process.exit(0);
});
