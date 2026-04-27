import { default as About } from "../../app/routes/respond";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("About Test suite", () => {
    it("should work", async () => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>,
        );
        expect(About).toBeTruthy();
    });
});
