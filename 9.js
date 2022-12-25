// 9.js:  Let's create a typewriter effect with RxJS in the browser

const { from, interval, zip } = rxjs;
const { scan } = rxjs.operators;

const heading = "Aarhus Festuge siger tak for i år";
const paragraph =
  "Aarhus Festuge 2018 har i de sidste 10 dage været fyldt med tusindvis af arrangementer rundt om i Aarhus. Musik, kunst og masser af mennesker har fyldt byens gader, og sensommervejret har heldigvis mestendels været oplagt til fest og fornøjelser.";

const headingNode = document.querySelector("#heading");
const paragraphNode = document.querySelector("#paragraph");

// A factory for a typewriter stream
function typewriter(string, time) {
  const chars = string.split("");

  const char$ = from(chars);
  const interval$ = interval(time);

  return zip(char$, interval$, (char, interval) => char).pipe(scan((cur, acc) => cur + acc, ""));
}

headingTypewriter$ = typewriter(heading, 100);
paragraphTypewriter$ = typewriter(paragraph, 25);

headingTypewriter$.subscribe((text) => (headingNode.textContent = text));
paragraphTypewriter$.subscribe((text) => (paragraphNode.textContent = text));
