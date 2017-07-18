const R = require('ramda');

module.exports = R.mapObjIndexed(R.invoker, {
  toJS: 0,
  toObject: 0,
  toArray: 0,
  keys: 0,
  reverse: 0,
  unshift: 0,
  pop: 0,
  entrySeq: 0,

  get: 1,
  map: 1,
  filter: 1,
  filterNot: 1,
  sort: 1,
  sortBy: 1,
  groupBy: 1,
  push: 1,
  concat: 1,
  merge: 1,
  mergeDeep: 1,

  set: 2,

  // contrib/cursor
  // https://github.com/facebook/immutable-js/blob/master/contrib/cursor/index.d.ts
  deref: 0,
  valueOf: 0,
  toString: 0,
  remove: 1,
  removeIn: 1,
  delete: 1,
  deleteIn: 1,
  cursor: 1
});
