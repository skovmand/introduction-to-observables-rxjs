// 8.js:  Using fromEvent in the browser
//        1: Open 8.html in a browser
//        2: Create a stream of button click events, mapped to a string.

const { fromEvent } = rxjs;
const { map } = rxjs.operators;

const button = document.querySelector("#clickButton");

const click$ = fromEvent(button, 'click').pipe(
  map(_ => "Clicked!")
);

click$.subscribe(value => console.log(value));
