// 3.js:  A simple start
//        1. An observable that emits Hello World
//        2. Extract the observer

const { of } = require("rxjs");

const hello$ = of("Hello World!");

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log("Complete"),
};

hello$.subscribe(observer);
