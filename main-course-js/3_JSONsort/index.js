import axios from "axios";

const endPoints = [
  "https://jsonbase.com/lambdajson_type1/793",
  "https://jsonbase.com/lambdajson_type1/955",
  "https://jsonbase.com/lambdajson_type1/231",
  "https://jsonbase.com/lambdajson_type1/931",
  "https://jsonbase.com/lambdajson_type1/93",
  "https://jsonbase.com/lambdajson_type2/342",
  "https://jsonbase.com/lambdajson_type2/770",
  "https://jsonbase.com/lambdajson_type2/491",
  "https://jsonbase.com/lambdajson_type2/281",
  "https://jsonbase.com/lambdajson_type2/718",
  "https://jsonbase.com/lambdajson_type3/310",
  "https://jsonbase.com/lambdajson_type3/806",
  "https://jsonbase.com/lambdajson_type3/469",
  "https://jsonbase.com/lambdajson_type3/258",
  "https://jsonbase.com/lambdajson_type3/516",
  "https://jsonbase.com/lambdajson_type4/79",
  "https://jsonbase.com/lambdajson_type4/706",
  "https://jsonbase.com/lambdajson_type4/521",
  "https://jsonbase.com/lambdajson_type4/350",
  "https://jsonbase.com/lambdajson_type4/64",
];

function booleanValues(endpoints) {
  let trueValues = 0;
  let falseValues = 0;

  Promise.all(
    endPoints.map((endPoint) =>
      axios.get(endPoint).then((result) => {
        const dataToStr = JSON.stringify(result.data);
        const toFind = /"isDone":(true|false)/;
        const findElemValue = dataToStr.match(toFind)[0].split(":")[1];
        console.log(endPoint + ": isDone - " + findElemValue);
        if (findElemValue === "true") {
          trueValues++;
        } else {
          falseValues++;
        }
      })
    )
  ).then(() => {
    console.log("True values: " + trueValues);
    console.log("False values: " + falseValues);
  });
}

booleanValues(endPoints);
