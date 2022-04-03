---
title: "BLOG TITLE"
metaTitle: "BLOG TITLE"
metaDesc: "How to use pages in Next.js exploring the options"
socialImage: images/22-09-2021.jpg
date: "2021-09-22"
tags:
  - nextjs
---

## The main content

Closures in Javascript seem like black magic when you first see them. And sometimes the tenth time. Or when you just haven't had enough coffee. This article is my rough attempt at demystifying them.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) defines closures as:

> A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

Basically, where you define your function determines what scope it has access to during execution.

So, consider this code:

```
let counter = 0;function incrementCounter() {  counter += 1;}console.log(counter); // Outputs 0incrementCounter();console.log(counter); // Outputs 1
```

When incrementCounter is invoked, the JS runtime doesn't find counter in incrementCounter's local scope, so it goes up a level, which happens to be the global context. It finds a variable there named counter there and adds one to the value and stores it back in counter.

But what if we want to have multiple counters? We'd have to have a variable for each counter and add a parameter to incrementCounter. Not too terrible for small programs, but we can do better. This is where closures come in to play.

Thinking back to the definition above, consider this:

```
// Global Context
function createCounter() {
    let counter = 0;
    return function () {
        // Still has access to the context created when createCounter is invoked
        counter += 1;
        return counter;
    }
}

const incrementCounterA = createCounter();
const incrementCounterB = createCounter();
console.log(incrementCounterA()); // Outputs 1
incrementCounterA(); // Counter for A is now 2
incrementCounterB(); // Counter for B is now 1
console.log(incrementCounterA()); // Outputs 3
```

When createCounter gets called, JS creates a context and assigns 0 to counter within that context. Since the anonymous function returned references that variable, it won't get thrown out. Now we've got some persistent state that's unique to that function because on the next line a totally new context is created and a totally new function is assigned to incrementCounterB.

Pretty cool right? Now we can have as many counters as we want and they'll all have their own counter variable. And you don't have to return just a function. You could return an object that has methods to increment, decrement, and get the value of the counter. You can see this in the [module pattern](https://coryrylan.com/blog/javascript-module-pattern-basics), a super important javascript design pattern to know.

Closures can also get you into trouble and I've seen something similar to this in more than a few interviews:

```
var vals = [1, 2, 3, 4];
for(var i = 0; i < vals.length; i += 1) {
  setTimeout(function () {
    console.log(i, vals[i]);
  }, i * 2000);
}
```

First you're asked what it does. It's fairly easy to infer that the intent is to print out the index and value every 2 seconds or so. But that's not what happens.

What actually happens is that by the time the callback is run each time, i is 4 and vals\[i] is undefined. "4 undefined" is printed 4 times.

This is because when a variable is declared using var it is assigned to the first enclosing context. Whenever js looks at i it finds the latest value. So, how do you fix this?

The easiest way is to simply use the let keyword. Variables with let (and const) are block scoped, It's dumb, but I almost didn't guess this once when asked this. I was super nervous and went for the old school, more complicated fix: bind. This looks something like this:

```
var vals = [1, 2, 3, 4];
function logValAtIndex(i, val) {
  console.log(i, val);
}
for(var i = 0; i < vals.length; i += 1) {
  setTimeout(logValAtIndex.bind(null, i, vals[i]), i * 2000);
}
```

If I start talking about how bind works, this article will go on forever. Check out [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
