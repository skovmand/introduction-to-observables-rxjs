// 8.js:  Using fromEvent in the browser
//        1: Open 8.html in a browser
//        2: Create a stream of button click events, mapped to a string.

const { fromEvent } = rxjs;
const { map, delay } = rxjs.operators;

const buttonNode = document.querySelector("#clickButton");
const inputNode = document.querySelector("#textInput");
const outputNode = document.querySelector("#output");

const click$ = fromEvent(buttonNode, "click").pipe(delay(1000));

// Subscribe to click$ and change background color when it fires
click$.subscribe((_) => {
  document.body.style.backgroundColor = "#" + parseInt(Math.random() * 0xffffff).toString(16);
});

// Subscribe to input events on the input node
const typeStream$ = fromEvent(inputNode, "keyup").pipe(
  map((event) => event.target.value),
  delay(2000),
);

typeStream$.subscribe((text) => (outputNode.textContent = text));
