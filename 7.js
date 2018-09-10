// 7.js:  Back to rxjs: Using operators (transforming the data)
//        1: Using map
//        2: Using filter

const { interval } = require("rxjs");
const { map, filter } = require("rxjs/operators");

const observer = {
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log("Complete")
};
