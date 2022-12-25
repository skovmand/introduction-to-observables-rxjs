// 9.js:  A network stream, Getting the top story from Hacker News
//        - https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
//        - https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty

const { from, forkJoin, fromEvent } = rxjs;
const { switchMap, map, pluck, tap } = rxjs.operators;
const { ajax } = rxjs.ajax;

// Observable creator for an Observable that emits the response from an url
function getUrl(url) {
  return ajax.get(url).pipe(map((response) => response.response));
}

// Observable creator for an Observable that emits a title from an id
function titleFromId(id) {
  const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  return getUrl(url).pipe(pluck("title"));
}

// A stream of top stories (which does 1 emit with all stories in it)
const topStoryIds$ = getUrl("https://hacker-news.firebaseio.com/v0/topstories.json");

// Stream of THE top story.
const topStory$ = topStoryIds$.pipe(
  map((ids) => ids[0]),
  switchMap((id) => titleFromId(id)),
);

topStory$.subscribe((title) => console.log("TOP STORY: ", title));

// Stream of FIVE top stories
const top5StoryTitles$ = topStoryIds$.pipe(
  map((stories) => stories.slice(0, 5)),
  map((stories) => stories.map((id) => titleFromId(id))),
  switchMap((storyTitleRequests) => forkJoin(storyTitleRequests)),
  switchMap((storyTitles) => from(storyTitles)),
);

// Let's setup the DOM logic
const fetchButton = document.querySelector("#fetchStories");
const storyUl = document.querySelector("#stories");

fromEvent(fetchButton, "click")
  .pipe(switchMap((_) => top5StoryTitles$))
  .subscribe((title) => {
    storyUl.appendChild(textToLi(title));
  });

// -------------
//    Helpers
// -------------

function textToLi(text) {
  const content = document.createTextNode(text);

  let li = document.createElement("li");
  li.appendChild(content);

  return li;
}
