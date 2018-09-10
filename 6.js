// 6.js:  A new fromPromise factory.
//        1: Add a dynamic fromPromise factory
//        2: Show that promises run immediately!

const observer = {
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log("Complete")
};
