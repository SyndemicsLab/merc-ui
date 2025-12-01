import { default as Index } from "../../app/routes/simulation";
import { render } from "@testing-library/react";

describe("Index Test suite", () => {
    it("should work", async () => {
        render(<Index />);
        expect(Index).toBeTruthy();
    });
});
