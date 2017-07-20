# Index Kata

![Index Example][index_example]

## About

State is the devil. All programmers know it. However, getting rid of state is hard. This kata is designed to have various needs for keeping state. Can you get rid of it?

## Description
Imagine to write part of a service that generates book indexes. There is a contract, that your function *pageReferenceText* gets called (by the book production system) everytime there is a reference found for a specific word. Let's say you want to index the term *fp* (short for functional programming). Your function will get called for every place this word is found in the book. The function receives two arguments.

1. href - this is a reference for generating a link from the index to the words position. It's a string that consists of the term, a running reference number and some text padding.

#### Examples
 #index_fp_1
 #index_fp_2
...

2. page - the page number, where the term was found

In the **simplified version**, you get no hrefs. Instead, there is only a reference number.

Your goal is to implement the function *pageReferenceText*. It should return a page number padded by a right space. This will server as the text for the index link.

### Example
pageReferenceText("#index_fp_1", 27) -> "27 "

## Rules

* There can be several links to the same page, even for the same term. 
* Luckily you always get at least two passes of information about the same term. In the first pass. Your function does't need to return anything. Beginning with the 2nd pass you need to output the result pages, padded with a space to the right (e.g. "26 ").
* Whatever you return from your function after the first pass will be used as the index/page reference text (ie. a page number or page range).

## Getting Started

```bash
npm install
npm test
```

The first acceptance spec is already green. Remove the x from next xit in "specs_simple/index.spec.js", to get the next pending spec red. Implement the correct behaviour to get it green again. Rinse and repeat. Try to avoid (mutable) state at all costs.

## Specs

See specs_simple/index.spec.js

Run the specs with: *npm test*

You will need to edit the package.json, if you want to switch from the simple to the complete version of the kata.

## Avoid/Contain/Encapsulate/Immutalize/Freeze and Banish the State

* avoid let, use const
* use immutable data
 1. just dont change them
 2. use freeze
 3. use an immutable library
* minimize side effects
* minimize scope (localize state!)
* contain state, ie. keep the core pure (use pure functions only)
* use state wrapping, ie. world-state as an in-param and an additional return value
* maybe use a Monad, or an Observable, or ...
* other ideas?

## Assisting Libraries

There are libs you can try out:

* Immuteable http://facebook.github.io/immutable-js/
  Provides immuteable data types
  
* Ramda http://ramdajs.com/
  A functional library which features non-mutating, side effect free functions

## Other Considerations

* Use proper data structures (e.g. Map, Set instead of {}, []).
* Assume the inputs as valid. Error-handling is not part of the kata.
* You can also safely assume, that all passes yield the same page results, 
  e.g. if you get *(#index_oop_1, 10) -> "10"*, than there is no  *(#index_oop_1, 10) -> p* with *p != 10* in a later pass
* You ARE allowed to modify the acceptance spec as long as the business logic stays intact.
  Actually this might even be required in order to deal with global state in the specs.

[index_example]: ./img/index.png