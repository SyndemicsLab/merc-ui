import { default as ContactUs } from "../../app/routes/contactus";
import { render } from "@testing-library/react";


describe('ContactUs Test suite', () => {
    it('should work', async () => {
        render(<ContactUs />);
        expect(ContactUs).toBeTruthy();
    });
});