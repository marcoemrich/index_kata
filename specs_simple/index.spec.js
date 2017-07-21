const expect = require("unexpected");
const pageReferenceText = require("../src/index.js").pageReferenceText;

const runFirstPass = exampleRefs =>
  exampleRefs.forEach(ref => pageReferenceText(ref.ref, ref.pageNum));

const runExpects = exampleRefs => {
  exampleRefs.forEach(ref => {
    expect(pageReferenceText(ref.ref, ref.pageNum), "to equal", ref.result);
  });
};

// Acceptance Specs
describe("pageReferenceText", function() {
  it("should return the correct link texts as page padded right by space", function() {
    // first pass: pageReferenceText(1, 26) -> doesn't matter
    // 2nd+ pass:  pageReferenceText(1, 26) -> "26 "

    // 26 36 46 56
    const exampleRefs = [
      { ref: 1, pageNum: 26, result: "26 " },
      { ref: 2, pageNum: 36, result: "36 " },
      { ref: 3, pageNum: 46, result: "46 " },
      { ref: 4, pageNum: 56, result: "56 " }
    ];

    runFirstPass(exampleRefs);
    runExpects(exampleRefs);
  });

  xit("should not repeat page numbers", function() {
    // 26 46 56
    const exampleRefs = [
      { ref: 1, pageNum: "26", result: "26 " },
      { ref: 2, pageNum: "46", result: "46 " },
      { ref: 3, pageNum: "46", result: "" },
      { ref: 4, pageNum: "56", result: "56 " }
    ];

    runFirstPass(exampleRefs);
    runExpects(exampleRefs);
  });

  xit("should provide consistent results on a third pass", function() {
    const exampleRefs = [
      { ref: 1, pageNum: "26", result: "26 " },
      { ref: 2, pageNum: "36", result: "36 " }
    ];

    runFirstPass(exampleRefs);
    runExpects(exampleRefs); //2nd pass
    runExpects(exampleRefs); //3rd pass
  });

  xit("should use page ranges", () => {
    // 87-89
    // return a page range in the form <lowPage>-<highPage>
    // for a several page references that have no page gaps between them
    const exampleRefs = [
      { ref: 1, pageNum: "87", result: "87-89 " },
      { ref: 2, pageNum: "88", result: "" },
      { ref: 3, pageNum: "89", result: "" }
    ];

    runFirstPass(exampleRefs);
    runExpects(exampleRefs);
  });

  xit("should combine page ranges with other results", () => {
    // 83 87-89 99
    const exampleRefs = [
      { ref: 1, pageNum: "83", result: "83 " },
      { ref: 2, pageNum: "87", result: "87-89 " },
      { ref: 3, pageNum: "88", result: "" },
      { ref: 4, pageNum: "89", result: "" },
      { ref: 5, pageNum: "99", result: "99 " }
    ];

    runFirstPass(exampleRefs);
    runExpects(exampleRefs);
  });
});
