// 4.js:  A complete RxJS example
//        1: Make a custom interval observable
//        2: Add unsubscribe functionality

const { Observable } = require("rxjs");

const observer = {
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log("Complete")
};

