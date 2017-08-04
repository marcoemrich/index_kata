import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class TheIndexer {

    private static void runFirstPass(Indexer i, Iterable<TestData> exampleRefs) {
        for(TestData td : exampleRefs)
            i.GetPageReferenceText(td.getSPR());
    }

    private static void runExpects(Indexer i, Iterable<TestData> exampleRefs) {
        for(TestData td : exampleRefs) {
            String resultPageRefText = i.GetPageReferenceText(td.getSPR());
            Assert.assertEquals("unexpected page ref found", td.getExpectedResult(), resultPageRefText);
        }
    }

    private static void runTest_withTestData(Iterable<TestData> testData) {
        Indexer i = new Indexer();

        runFirstPass(i, testData);
        runExpects(i, testData);
    }

    @Test
    public void t01_should_return_the_correct_link_texts() {
        // https://stackoverflow.com/questions/1160081/why-is-an-array-not-assignable-to-iterable
        List<TestData> testData = Arrays.asList(
            new TestData[]{
                    new TestData(new SinglePageReference("1", "27"), "27 "),
                    new TestData(new SinglePageReference("2", "37"), "37 ")
            }
        );
        runTest_withTestData(testData);
    }

    @Test
    public void t02_should_not_repeat_page_numbers() {
        List<TestData> testData = Arrays.asList(
                new TestData[]{
                        new TestData(new SinglePageReference("1", "27"), "27 "),
                        new TestData(new SinglePageReference("2", "46"), "46 "),
                        new TestData(new SinglePageReference("3", "46"), ""),
                        new TestData(new SinglePageReference("4", "56"), "56 ")
                }
        );
        runTest_withTestData(testData);
    }

    @Test
    public void t03_should_use_page_ranges() {
        List<TestData> testData = Arrays.asList(
                new TestData[]{
                        new TestData(new SinglePageReference("1", "87"), "87-89 "),
                        new TestData(new SinglePageReference("2", "88"), ""),
                        new TestData(new SinglePageReference("3", "89"), "")
                }
        );
        runTest_withTestData(testData);
    }

    @Test
    public void t04_should_use_page_ranges_with_other_results() {
        List<TestData> testData = Arrays.asList(
                new TestData[]{
                        new TestData(new SinglePageReference("1", "83"), "83 "),
                        new TestData(new SinglePageReference("2", "87"), "87-89 "),
                        new TestData(new SinglePageReference("3", "88"), ""),
                        new TestData(new SinglePageReference("4", "89"), ""),
                        new TestData(new SinglePageReference("5", "99"), "99 ")
                }
        );
        runTest_withTestData(testData);
    }

}
