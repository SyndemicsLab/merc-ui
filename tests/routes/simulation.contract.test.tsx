/// <reference types="jest" />

import { render, screen } from "@testing-library/react";
import { inputs } from "../../app/features/simulation/model";
import {
    makeLoaderData,
    mapRunRequest,
    mapRunResponse,
    RunStatus,
} from "../../app/routes/simulation";

describe("Simulation route contract", () => {
    it("maps loader defaults into explicit initialInputs and presets", () => {
        const mapped = makeLoaderData(inputs);

        expect(mapped.initialInputs).toBeDefined();
        expect(mapped.presets).toBeDefined();
        expect(mapped.initialInputs.interventions.length).toBe(
            mapped.presets.length,
        );

        // Ensure presets and editable initial state are separate object graphs.
        expect(mapped.initialInputs).not.toBe(mapped.presets as unknown);
        expect(mapped.initialInputs.interventions).not.toBe(mapped.presets);
        expect(mapped.initialInputs.interventions[0]).not.toBe(mapped.presets[0]);
    });

    it("maps run request into a plain JSON payload", () => {
        const payload = mapRunRequest(inputs) as {
            interventions: Array<{ name: string }>;
        };

        expect(payload).toBeDefined();
        expect(payload.interventions[0].name).toBe(
            inputs.interventions[0].name,
        );
        expect(payload).not.toBe(inputs as unknown);
    });

    it("maps successful run response", () => {
        const response = new Response("ok", { status: 200 });

        const mapped = mapRunResponse(response, "done");

        expect(mapped.ok).toBe(true);
        expect(mapped.status).toBe(200);
        expect(mapped.result).toBe("done");
        expect(mapped.error).toBeUndefined();
    });

    it("maps failed run response", () => {
        const response = new Response("failed", { status: 500 });

        const mapped = mapRunResponse(response, "backend error");

        expect(mapped.ok).toBe(false);
        expect(mapped.status).toBe(500);
        expect(mapped.error).toBe("backend error");
    });

    it("renders pending run status", () => {
        render(<RunStatus pending={true} />);

        expect(screen.getByText("Running simulation...")).toBeTruthy();
    });

    it("renders success run status", () => {
        render(<RunStatus pending={false} result={{ ok: true, status: 200 }} />);

        expect(screen.getByText("Simulation complete.")).toBeTruthy();
    });

    it("renders error run status", () => {
        render(
            <RunStatus
                pending={false}
                result={{ ok: false, status: 500, error: "Failed" }}
            />,
        );

        expect(screen.getByRole("alert").textContent).toBe("Failed");
    });
});
