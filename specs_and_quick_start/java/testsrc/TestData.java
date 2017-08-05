public class TestData {
    private final SinglePageReference spr;
    private final String expectedResult;

    public TestData(SinglePageReference spr, String expectedResult) {

        this.spr = spr;
        this.expectedResult = expectedResult;
    }

    public SinglePageReference getSPR() {
        return spr;
    }

    public String getExpectedResult() {
        return expectedResult;
    }
}
