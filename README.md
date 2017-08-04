# Index Kata v3

![Index Example][index_example]

## About

State is the devil. All programmers know it. However, getting rid of state is hard. This kata is designed to have various needs for keeping state. You might not be able to banish it completely, but is there a way to contain the state or make it easier to deal with?

## Description
Imagine to write part of a service that generates book indexes. There is a contract, that your function *pageReferenceText* gets called (by the book production system) everytime there is a reference found for a specific word. Let's say you want to index the term *fp* (short for functional programming). Your function will get called for every place this word is found in the book. 

We will simplify this a bit just for the kata. Let's drop the handling for different terms. So your function receives only one argument: the *page number* where the term was found.

#### Example

Let's say the term was found *two* times on *page 27*, and also on *page 28* and *page 29*. You will receive the following calls.

```
pageReferenceText(27)
pageReferenceText(27)
pageReferenceText(28)
pageReferenceText(29)
```

Strangly enough, you production system does several passes, so you will get the same calls at least twice.

```
// First pass
pageReferenceText(27)
pageReferenceText(27)
pageReferenceText(28)
pageReferenceText(29)

// Second pass
pageReferenceText(27)
pageReferenceText(27)
pageReferenceText(28)
pageReferenceText(29)

// there could be more passes

```

### Goal
Your goal is to implement the function *pageReferenceText*. It should return a page number padded by a right space. This will server as the text for the index link.

#### Example
```
pageReferenceText(1, 27) -> "27 "
```

Later you will need to generate *page ranges* like *27-29* and get rid of multiple links to the same page. Take a look at the specs for the details.


## Rules

* There can be several links to the same page, even for the same term. 
* You'll always get at least two passes of information. In the first pass. Your function doesn't need to return anything. Beginning with the 2nd pass you need to output the result pages, padded with a space to the right (e.g. "26 ").
* Whatever you return from your function after the first pass will be used as the index/page reference text by the book production system (ie. a page number or page range).
* You can also safely assume, that all passes have exactly the same order and data.
* During a pass, the page numbers never decrease in subsequent calls.
* Assume the inputs as valid. Error-handling is not part of the kata.


## Acceptance/HighLevel Specs

(Results of each call are denoted after the Arrow "->")

* Return the correct link text as page number padded right by space (e.g. "fp: 27 37") 
```
// First Pass
pageReferenceText(27) -> Result doesn't matter at first pass
pageReferenceText(37) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(27) -> "27 "
pageReferenceText(37) -> "37 "
```

* Don't repeat page numbers (e.g. "fp: 27 46 56") 
```
// First Pass
pageReferenceText(27) -> Result doesn't matter at first pass
pageReferenceText(46) -> Result doesn't matter at first pass
pageReferenceText(46) -> Result doesn't matter at first pass
pageReferenceText(56) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(27) -> "27 "
pageReferenceText(46) -> "46 "
pageReferenceText(46) -> ""
pageReferenceText(56) -> "56 "
```

* Use page ranges (e.g. "fp: 87-89") 
```
// First Pass
pageReferenceText(87) -> Result doesn't matter at first pass
pageReferenceText(88) -> Result doesn't matter at first pass
pageReferenceText(89) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(87) -> "87-89 "
pageReferenceText(88) -> ""
pageReferenceText(89) -> ""

```

* Combine page ranges with other results  (e.g. "fp: 83 87-89 99") 
```
// First Pass
pageReferenceText(83) -> Result doesn't matter at first pass
pageReferenceText(87) -> Result doesn't matter at first pass
pageReferenceText(88) -> Result doesn't matter at first pass
pageReferenceText(89) -> Result doesn't matter at first pass
pageReferenceText(99) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(83) -> "83 "
pageReferenceText(87) -> "87-89 "
pageReferenceText(88) -> ""
pageReferenceText(89) -> ""
pageReferenceText(99) -> "99 "

```

## Acceptance/HighLevel Specs for Special/Edge Cases

* Page Ranges with multiple Upper Border Page Number

```
// First Pass
pageReferenceText(87) -> Result doesn't matter at first pass
pageReferenceText(88) -> Result doesn't matter at first pass
pageReferenceText(89) -> Result doesn't matter at first pass
pageReferenceText(89) -> Result doesn't matter at first pass
pageReferenceText(91) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(87) -> "87-89 "
pageReferenceText(88) -> ""
pageReferenceText(89) -> ""
pageReferenceText(89) -> ""
pageReferenceText(91) -> "91 "

```

* Results must be consistent for all passes

```
// First Pass
pageReferenceText(83) -> Result doesn't matter at first pass
pageReferenceText(87) -> Result doesn't matter at first pass
pageReferenceText(88) -> Result doesn't matter at first pass
pageReferenceText(89) -> Result doesn't matter at first pass
pageReferenceText(99) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(83) -> "83 "
pageReferenceText(87) -> "87-89 "
pageReferenceText(88) -> ""
pageReferenceText(89) -> ""
pageReferenceText(99) -> "99 "

// 3rd Pass
pageReferenceText(83) -> "83 "
pageReferenceText(87) -> "87-89 "
pageReferenceText(88) -> ""
pageReferenceText(89) -> ""
pageReferenceText(99) -> "99 "
```

## How to use the Kata

You can use the kata as a playground for any idea of state handling you might have. That said, I have a suggestion for a particular pattern, which I think is a good fit and also fun to try out: The **History Recording Pattern**. It's a bit inspired by *event sourcing* or the way *monads* work in functional programming languages.

Instead of mixing the logic with the mutation of state, you separate it completely. The first thing, you do in the call is to record the call (the page number argument). Later you can derrive your results from recorded history by applying only pure functions. You don't want to mix logic with state recording.

There is also a lot of variance here for writing the logic. You can use recursion or work with higher-order-function like map, filter and reduce. An interesting constraint for the kata is: expression-only, no-loops, no-if.

One interesting way to do the kata is to start with standard mutation based solution and contrast it, with a solution using the history recording pattern.

## History

I derrived the kata from a real life coding problem I had and simplified the problem for the kata (like a lot). And yes! The API of the book production is really thaaaat bad and also closed source.

## Programming Language

The Kata orginated at #JSCC17 (see http://jscraftcamp.org). I also pulled it from a real project I'm doing at https://owl.institute. Therefore it has a JavaScript background and there is also a quick start with some setup and the specs in the folder *"specs_and_quick_start"* to get started fast. 

It is however not dependent on JavaScript at all. **If someone would like to provide different language quick starts: Pull Requests are very welcome! :)**


[index_example]: ./img/index.png
