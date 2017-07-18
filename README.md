# Index Kata

## About

State is the devil. All programmers know it. However, getting rid of state is hard. This kata is designed to have various needs for keeping state. Can you get rid of it?

## Description
Imaging to write the part of a service that generates book indexes. There is a contract, that you function *linkTextFor* gets called everytime there is a reference found to a specific word. Let's say you want to index the term *oop*. Your function will get called for every place this word is found in the text. You get two arguments.

1. href - this is a reference for generating a link from the index to the words position. It's a string that consists of the term, a running numberation and some text padding. 

#### Examples
 #index_oop_1
 #index_oop_2
...

2. page - the page number, where the term was found (also as a string because of limitations of the service interface).

## Rules

* There can be several links to the same page, even for the same term. 
* Luckily you always get at least two passes of information about the same term. In the first pass. Your function does't need to return anything. Beginning with the 2nd pass you need to output the result pages, padded with a space to the right (e.g. "26 ").
* Whatever you return from your function after the first pass will be used as link text besides the term (ie. a page number that can be clicked and lead to the original term).

## Specs

See acceptance.spec.js


## Avoid/Contain State

* avoid let, use const
* use immutable data
 1. just dont change them
 2. use freeze
 3. use an immutable library
* minimize side effects
* minimize scope (localize state!)
* contain state, ie. keep the core pure(use pure functions only)
* use state wrapping, ie. world-state as an in-param and an additional return value
* maybe use a Monad, or an Observable, or ..
* other ideas?

## Other considerations

* use proper data structures (e.g. Map, Set instead of {}, [])
* assume the inputs as valid, error handling is not part of the kata