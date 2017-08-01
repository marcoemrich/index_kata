# Index Kata

![Index Example][index_example]

## About

State is the devil. All programmers know it. However, getting rid of state is hard. This kata is designed to have various needs for keeping state. You might be able to banish it completely, but is there a way to contain the state or make it easier to deal with?

## Description
Imagine to write part of a service that generates book indexes. There is a contract, that your function *pageReferenceText* gets called (by the book production system) everytime there is a reference found for a specific word. Let's say you want to index the term *fp* (short for functional programming). Your function will get called for every place this word is found in the book. The function receives two arguments.

1. **href** - this is a reference for generating a link from the index to the words position. It's a string that consists of the term, a running reference number and some text padding.

#### Example

```
  #index_fp_1
  #index_fp_2
  ...
```

To simplify the Kata a little bit, let's drop the term. Instead of the whole href, you get only a running reference number starting with ```1```.
 
#### Example

```
  1
  2
  ...
```


2. **page** - the page number, where the term was found, eg. ```27```


### Goal
Your goal is to implement the function *pageReferenceText*. It should return a page number padded by a right space. This will server as the text for the index link.

#### Example
```
pageReferenceText(1, 27) -> "27 "
```

## Rules

* There can be several links to the same page, even for the same term. 
* Luckily you always get at least two passes of information about the same term. In the first pass. Your function doesn't need to return anything. Beginning with the 2nd pass you need to output the result pages, padded with a space to the right (e.g. "26 ").
* Whatever you return from your function after the first pass will be used as the index/page reference text (ie. a page number or page range).
* You can also safely assume, that all passes yield the same page results, 
  e.g. if you get *pageReferenceText(1, 10) -> "10"*, than there is no  *pageReferenceText(1, 10) -> p* with *p != 10* in a later pass
* The page numbers never decrease in subsequent calls.
* Assume the inputs as valid. Error-handling is not part of the kata.


## Acceptance/HighLevel Specs

Results of each call are denoted after the Arrow "->"

* Return the correct link text as page number padded right by space (e.g. "fp: 27 37") 
```
// First Pass
pageReferenceText(1, 27) -> Result doesn't matter at first pass
pageReferenceText(1, 37) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(1, 27) -> "27 "
pageReferenceText(1, 37) -> "37 "
```

* Don't repeat page numbers (e.g. "fp: 27 46 56") 
```
// First Pass
pageReferenceText(1, 27) -> Result doesn't matter at first pass
pageReferenceText(1, 46) -> Result doesn't matter at first pass
pageReferenceText(1, 46) -> Result doesn't matter at first pass
pageReferenceText(1, 56) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(1, 27) -> "27 "
pageReferenceText(1, 46) -> "46 "
pageReferenceText(1, 46) -> " "
pageReferenceText(1, 56) -> "56 "
```

* Use page ranges (e.g. "fp: 87-89") 
```
// First Pass
pageReferenceText(1, 87) -> Result doesn't matter at first pass
pageReferenceText(1, 88) -> Result doesn't matter at first pass
pageReferenceText(1, 89) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(1, 87) -> "87-89 "
pageReferenceText(1, 88) -> ""
pageReferenceText(1, 89) -> ""

```

* Combine page ranges with other results  (e.g. "fp: 83 87-89 99") 
```
// First Pass
pageReferenceText(1, 83) -> Result doesn't matter at first pass
pageReferenceText(1, 87) -> Result doesn't matter at first pass
pageReferenceText(1, 88) -> Result doesn't matter at first pass
pageReferenceText(1, 89) -> Result doesn't matter at first pass
pageReferenceText(1, 99) -> Result doesn't matter at first pass

// 2nd Pass
pageReferenceText(1, 83) -> "83 "
pageReferenceText(1, 87) -> "87-89 "
pageReferenceText(1, 88) -> ""
pageReferenceText(1, 89) -> ""
pageReferenceText(1, 83) -> "99 "

```


[index_example]: ./img/index.png
