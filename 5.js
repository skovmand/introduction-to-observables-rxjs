// 5.js:  A complete custom implementation.

function Observable(creationFn) {
  this.subscribe = creationFn;
}

function intervalCreationFn(observer) {
  let i = 0;
  const interval = setInterval(() => observer.next(i++), 500);

  return () => clearInterval(interval);
}

const interval$ = new Observable(intervalCreationFn);

const observer = {
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log("Complete"),
};

const unsubscribe = interval$.subscribe(observer);

setTimeout(() => unsubscribe(), 5000);
