import { default as Home } from "~/routes/home";

describe("Home Test suite", () => {
    it("should work", async () => {
        expect(Home).toBeTruthy();
    });
});
