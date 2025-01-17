import { default as Homepage } from "../../app/routes/homepage";
import { render } from "@testing-library/react";


describe('Homepage Test suite', () => {
    it('should work', async () => {
        render(<Homepage />);
        expect(Homepage).toBeTruthy();
    });
});