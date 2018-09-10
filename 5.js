// 5.js:  A complete custom implementation.

const { Observable } = require("rxjs");

function intervalCreationFn(observer) {
  let i = 0;
  const interval = setInterval(() => observer.next(i++), 500);

  return () => clearInterval(interval);
}

const interval$ = new Observable(intervalCreationFn);

const observer = {
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log("Complete")
};

const subscription = interval$.subscribe(observer);

setTimeout(() => subscription.unsubscribe(), 5000);
