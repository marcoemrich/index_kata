## Getting Started

```bash
npm install
npm test
```

The first acceptance spec is already green. Remove the x from next xit in "specs_simple/index.spec.js", to get the next pending spec red. Implement the correct behaviour to get it green again. Rinse and repeat. Try to avoid (mutable) state at all costs.

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
* You ARE allowed to modify the acceptance spec as long as the business logic stays intact.
  Actually this might even be required in order to deal with global state in the specs.