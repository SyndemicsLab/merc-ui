import { default as About } from "../../app/routes/respond";
import { render } from "@testing-library/react";

describe("About Test suite", () => {
    it("should work", async () => {
        render(<About />);
        expect(About).toBeTruthy();
    });
});
