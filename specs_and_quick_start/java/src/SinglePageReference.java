/**
 * Represents a single page reference, e.g. (1, 45)
 */
public final class SinglePageReference {
    private final String ref;
    private final String page;

    public SinglePageReference(String ref, String page) {

        this.ref = ref;
        this.page = page;
    }

    public String getRef() {
        return ref;
    }

    public String getPage() {
        return page;
    }
}
