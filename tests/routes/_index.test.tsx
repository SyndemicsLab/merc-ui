import { loader, action, default as Index } from "../../app/routes/_index";
import { render } from "@testing-library/react";


describe('loader Test suite', () => {
    it('should work', async () => {
        const request = new Request("http://localhost:3000/");
        const response = await loader({
            request,
            params: {},
            context: {}
        });

        expect(response).toBeInstanceOf(Response);
    });
});

describe('action Test suite', () => {
    it('should work', async () => {
        const body = new URLSearchParams({ test: "test" });
        const request = new Request("http://localhost:3000/", { method: "POST", body });
        const response = await action({
            request,
            params: {},
            context: {}
        });

        expect(response).toBeInstanceOf(Response);
    });
});

describe('Index Test suite', () => {
    it('should work', async () => {
        render(<Index />);
        expect(Index).toBeTruthy();
    });
});