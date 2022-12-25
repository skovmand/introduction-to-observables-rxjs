// 6.js:  A new fromPromise factory.
//        1: Add a dynamic fromPromise factory
//        2: Make the creation function run on any promise

const { Observable } = require("rxjs");

const thePromise = new Promise((resolve, reject) => {
  console.log("The promise runs!");
  setTimeout(() => resolve("Kurt"), 3000);
});

function fromPromise(promise) {
  return new Observable((observer) => {
    promise
      .then((name) => {
        observer.next(name);
        observer.complete();
      })
      .catch((error) => observer.error("ERROR", error));
  });
}

const name$ = fromPromise(thePromise);

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log("Complete"),
};

name$.subscribe(observer);
