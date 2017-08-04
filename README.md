# Index Kata v3

![Index Example][index_example]

## About

State is the devil. All programmers know it. However, getting rid of state is hard. This kata is designed to have various needs for keeping state. You might not be able to banish it completely. Maybe there a way to contain the state or make it easier to deal with?

## Description
Imagine to write part of a service that generates book indexes. There is a contract, that your function *pageReferenceText* gets called (by the book production system) everytime there is a reference found for a specific word. Let's say you want to index the term *cat*. Your function gets called for every place the word *"cat"* is found in the book. 

So your function receives two arguments: 

1. the **term**
2. the **page number** where the term was found.

#### Example

Let's say the term *cat* was found **two** times on **page 27**, and also on **page 28** and **page 29**. You will receive the following calls.

```
pageReferenceText("cat", 27)
pageReferenceText("cat", 27)
pageReferenceText("cat", 28)
pageReferenceText("cat", 29)
```

Strangely enough, you production system does several passes, so you will get the same calls at least twice.

```
// First pass
pageReferenceText("cat", 27)
pageReferenceText("cat", 27)
pageReferenceText("cat", 28)
pageReferenceText("cat", 29)

// Second pass
pageReferenceText("cat", 27)
pageReferenceText("cat", 27)
pageReferenceText("cat", 28)
pageReferenceText("cat", 29)

// there could be more passes

```

### Goal
Your goal is to implement the function *pageReferenceText*. It should return a page number padded by a right space. This will server as the text for the index link.

#### Example
```
pageReferenceText("cat", 27) -> "27 "
```

Later you will need to generate *page ranges* like *27-29* and get rid of multiple links to the same page. Take a look at the specs for the details.


## Rules

* There can be several references to the same page, even for the same term.
* You'll always get at least two passes of information. In the first pass the returned result of your function doesn't matter. Beginning with the 2nd pass you need to output the result pages, padded with a space to the right (e.g. "26 ").
* Whatever you return from your function after the first pass will be used as the index/page reference text by the book production system (ie. a page number or page range).
* You can also safely assume, that all passes have exactly the same order and data.
* During a pass, the page numbers never decrease in subsequent calls for the same term.
* Assume the inputs as valid. Error-handling is not part of the kata.
* The dreadfull special case, where only one term is found for the whole book and all occurances of it are on the same page NEVER happens. You can safely ignore it.

## Acceptance/HighLevel Specs

(Results of each call are denoted after the Arrow "->")

* Return the correct link text as page number padded right by space (e.g. "fp: 27 37") 
```
// First Pass
pageReferenceText("cat", 27) -> Result doesn't matter at first pass
pageReferenceText("cat", 37) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 27) -> "27 "
pageReferenceText("cat", 37) -> "37 "
```

* Don't repeat page numbers (e.g. "fp: 27 46 56") 
```
// First Pass
pageReferenceText("cat", 27) -> Result doesn't matter at first pass
pageReferenceText("cat", 46) -> Result doesn't matter at first pass
pageReferenceText("cat", 46) -> Result doesn't matter at first pass
pageReferenceText("cat", 56) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 27) -> "27 "
pageReferenceText("cat", 46) -> "46 "
pageReferenceText("cat", 46) -> ""
pageReferenceText("cat", 56) -> "56 "
```

* Use page ranges (e.g. "fp: 87-89") 
```
// First Pass
pageReferenceText("cat", 87) -> Result doesn't matter at first pass
pageReferenceText("cat", 88) -> Result doesn't matter at first pass
pageReferenceText("cat", 89) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 87) -> "87-89 "
pageReferenceText("cat", 88) -> ""
pageReferenceText("cat", 89) -> ""

```

* Handle multiple terms

```
// First Pass
pageReferenceText("cat", 87) -> Result doesn't matter at first pass
pageReferenceText("cat", 88) -> Result doesn't matter at first pass

pageReferenceText("dog", 27) -> Result doesn't matter at first pass
pageReferenceText("dog", 28) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 87) -> "87-88 "
pageReferenceText("cat", 88) -> ""

pageReferenceText("dog", 27) -> "27-28 "
pageReferenceText("dog", 28) -> ""
```

## Acceptance/HighLevel Specs for Special/Edge Cases

* Combine page ranges with other results  (e.g. "fp: 83 87-89 99") 
```
// First Pass
pageReferenceText("cat", 83) -> Result doesn't matter at first pass
pageReferenceText("cat", 87) -> Result doesn't matter at first pass
pageReferenceText("cat", 88) -> Result doesn't matter at first pass
pageReferenceText("cat", 89) -> Result doesn't matter at first pass
pageReferenceText("cat", 99) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 83) -> "83 "
pageReferenceText("cat", 87) -> "87-89 "
pageReferenceText("cat", 88) -> ""
pageReferenceText("cat", 89) -> ""
pageReferenceText("cat", 99) -> "99 "

```


* Page Ranges with multiple Upper Border Page Number

```
// First Pass
pageReferenceText("cat", 87) -> Result doesn't matter at first pass
pageReferenceText("cat", 88) -> Result doesn't matter at first pass
pageReferenceText("cat", 89) -> Result doesn't matter at first pass
pageReferenceText("cat", 89) -> Result doesn't matter at first pass
pageReferenceText("cat", 91) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 87) -> "87-89 "
pageReferenceText("cat", 88) -> ""
pageReferenceText("cat", 89) -> ""
pageReferenceText("cat", 89) -> ""
pageReferenceText("cat", 91) -> "91 "

```

* Results must be consistent for all passes after the first

```
// First Pass
pageReferenceText("cat", 83) -> Result doesn't matter at first pass
pageReferenceText("cat", 87) -> Result doesn't matter at first pass
pageReferenceText("cat", 88) -> Result doesn't matter at first pass
pageReferenceText("cat", 89) -> Result doesn't matter at first pass
pageReferenceText("cat", 99) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 83) -> "83 "
pageReferenceText("cat", 87) -> "87-89 "
pageReferenceText("cat", 88) -> ""
pageReferenceText("cat", 89) -> ""
pageReferenceText("cat", 99) -> "99 "

// 3rd Pass
pageReferenceText("cat", 83) -> "83 "
pageReferenceText("cat", 87) -> "87-89 "
pageReferenceText("cat", 88) -> ""
pageReferenceText("cat", 89) -> ""
pageReferenceText("cat", 99) -> "99 "
```

* Results must be consistent for all passes after the first for multiple terms

```
// First Pass
pageReferenceText("cat", 87) -> Result doesn't matter at first pass
pageReferenceText("cat", 88) -> Result doesn't matter at first pass

pageReferenceText("dog", 27) -> Result doesn't matter at first pass
pageReferenceText("dog", 28) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText("cat", 87) -> "87-88 "
pageReferenceText("cat", 88) -> ""

pageReferenceText("dog", 27) -> "27-28 "
pageReferenceText("dog", 28) -> ""

// 3rd Pass
pageReferenceText("cat", 87) -> "87-88 "
pageReferenceText("cat", 88) -> ""

pageReferenceText("dog", 27) -> "27-28 "
pageReferenceText("dog", 28) -> ""
```

## How to use the Kata

You can use the kata as a **playground for any idea of state handling** you might have. That said, I have a suggestion for a particular pattern, which I think is a good fit and also fun to try out: The **History Recording Pattern**. It's a bit inspired by *event sourcing* or the way *monads* work in functional programming languages.

Instead of mixing the logic with the mutation of state, you separate it completely. The first thing, you do in the call is to record the call (the arguments). Later you can derrive your results from recorded history by applying only pure functions. You don't want to mix logic with state recording.

There is also a lot of variance here for writing the logic. You can use recursion or work with higher-order-function like map, filter and reduce. An interesting constraint for the kata is: expression-only, no-loops, no-if.

One interesting way to do the kata is to start with standard mutation based solution and contrast it, with a solution using the history recording pattern.

If you have very limited time, drop the requirement for different terms, use page numbers only.


## History & Background

The kata is a simplified version of a real life coding problem (we generate books at https://owl.institute). And yes! The API of the book production system is really thaaaat bad (the real one is even worse) and also closed source. There wasn't a lot, we could do.

[index_example]: ./img/index.png
