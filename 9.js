// 9.js:  Let's create a typewriter effect with RxJS in the browser

const { from, interval, zip } = rxjs;
const { scan } = rxjs.operators;

const headingNode = document.querySelector("#heading");
const paragraphNode = document.querySelector("#paragraph");

const heading = "Aarhus Festuge siger tak for i år";
const paragraph =
  "Aarhus Festuge 2018 har i de sidste 10 dage været fyldt med tusindvis af arrangementer rundt om i Aarhus. Musik, kunst og masser af mennesker har fyldt byens gader, og sensommervejret har heldigvis mestendels været oplagt til fest og fornøjelser.";

function charFromString(string) {
  const stringAsArray = string.split("");
  return from(stringAsArray);
}

const heading$ = charFromString(heading);
const paragraph$ = charFromString(paragraph);
const timer$ = interval(25);

zip(heading$, timer$, (char, index) => char)
  .pipe(scan((acc, cur) => acc + cur, ""))
  .subscribe(char => (headingNode.textContent = char));

zip(paragraph$, timer$, (char, index) => char)
  .pipe(scan((acc, cur) => acc + cur, ""))
  .subscribe(char => (paragraphNode.textContent = char));
