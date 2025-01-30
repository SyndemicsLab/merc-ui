import { default as Home } from "../../app/routes/homepage";
import { render } from "@testing-library/react";


describe('Home Test suite', () => {
    it('should work', async () => {
        render(<Home />);
        expect(Home).toBeTruthy();
    });
});