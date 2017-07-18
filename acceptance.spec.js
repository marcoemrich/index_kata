const expect = require('unexpected');
const linkTextFor = require('./index.js').linkTextFor;

const runFirstPass = exampleRefs =>
  exampleRefs.forEach(ref => linkTextFor(ref.href, ref.pageNum));

const runExpects = exampleRefs => {
  exampleRefs.forEach(ref => {
    expect(
      linkTextFor(ref.href, ref.pageNum),
      'to equal', ref.result
    );
  });
}

describe("linkTextFor", function () {
  it("should return the correct link texts the page and a space", function () {
    // oop 26 27 28 29
    let exampleRefs = [
      { href: "#index_oop_1", pageNum: "26", result: "26 " },
      { href: "#index_oop_2", pageNum: "27", result: "27 " },
      { href: "#index_oop_3", pageNum: "28", result: "28 " },
      { href: "#index_oop_4", pageNum: "29", result: "29 " }
    ];

    runFirstPass(exampleRefs)
    runExpects(exampleRefs);
  });

  xit("should not repeat page numbers", function () {
    // oop 26 27 29
    let exampleRefs = [
      { href: "#index_oop_1", pageNum: "26", result: "26 " },
      { href: "#index_oop_2", pageNum: "27", result: "27 " },
      { href: "#index_oop_3", pageNum: "27", result: "" },
      { href: "#index_oop_4", pageNum: "29", result: "29 " }
    ];

    runFirstPass(exampleRefs)
    runExpects(exampleRefs);
  });

  xit("should worj with two terms", function () {
    // fp 11 12
    // orm 12 14
    var exampleRefs = [
      { href: "#index_fp_1", pageNum: "11", result: "11 " },
      { href: "#index_fp_2", pageNum: "12", result: "12 " },

      { href: "#index_orm_1", pageNum: "12", result: "12 " },
      { href: "#index_orm_2", pageNum: "14", result: "14 " },
    ];

    runFirstPass(exampleRefs)
    runExpects(exampleRefs);
  });

  xit("should return the correct link text for several intervined passes", function () {
    var exampleRefs = [
      // operator 50 54 82
      { href: "#index_operator_1", pageNum: "50", result: "50 " },
      { href: "#index_operator_2", pageNum: "50", result: "" },
      { href: "#index_operator_3", pageNum: "54", result: "54 " },

      { href: "#index_operator_2", pageNum: "50", result: "" },
      { href: "#index_operator_3", pageNum: "54", result: "54 " },
      { href: "#index_operator_4", pageNum: "82", result: "82 " }
    ];

    runFirstPass(exampleRefs)
    runExpects(exampleRefs);
  });

  xit("should use page ranges", () => {
    // foo 87-89
    var exampleRefs = [
      { href: "#index_foo_1", pageNum: "87", result: "87-89 " },
      { href: "#index_foo_2", pageNum: "88", result: "" },
      { href: "#index_foo_3", pageNum: "89", result: "" },
    ];

    runFirstPass(exampleRefs)
    runExpects(exampleRefs);
  });

  xit("should combine page ranges with other results", () => {
    // foo 83 87-89 99
    var exampleRefs = [
      { href: "#index_foo_1", pageNum: "83", result: "83 " },
      { href: "#index_foo_2", pageNum: "87", result: "87-89 " },
      { href: "#index_foo_3", pageNum: "88", result: "" },
      { href: "#index_foo_4", pageNum: "89", result: "" },
      { href: "#index_foo_5", pageNum: "99", result: "99 " },
    ];

    runFirstPass(exampleRefs)
    runExpects(exampleRefs);
  });

});
