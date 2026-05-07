import { render, screen } from "@testing-library/react";
import { inputs } from "../../app/features/simulation/model";
import {
    applySessionInputsToLoaderData,
    makeLoaderData,
    mapRunRequest,
    mapRunResponse,
    normalizeLoaderData,
    parseCachedDefaults,
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
        expect(mapped.initialInputs.interventions[0]).not.toBe(
            mapped.presets[0],
        );
    });

    it("parses cached defaults stored as SimulationLoaderData", () => {
        const loaderData = makeLoaderData(inputs);

        const parsed = parseCachedDefaults(JSON.stringify(loaderData));

        expect(parsed).toBeDefined();
        expect(parsed?.initialInputs.duration).toBe(inputs.duration);
        expect(parsed?.presets.length).toBe(inputs.interventions.length);
    });

    it("parses cached defaults stored as legacy Inputs payload", () => {
        const parsed = parseCachedDefaults(JSON.stringify(inputs));

        expect(parsed).toBeDefined();
        expect(parsed?.initialInputs.total_population).toBe(
            inputs.total_population,
        );
        expect(parsed?.presets[0].id).toBe(inputs.interventions[0].id);
    });

    it("returns null for invalid cached defaults", () => {
        const parsed = parseCachedDefaults("{invalid-json");

        expect(parsed).toBeNull();
    });

    it("normalizes SimulationLoaderData payloads", () => {
        const loaderData = makeLoaderData(inputs);

        const normalized = normalizeLoaderData(loaderData);

        expect(normalized).toBeDefined();
        expect(normalized?.initialInputs.duration).toBe(inputs.duration);
        expect(normalized?.presets[0].id).toBe(inputs.interventions[0].id);
    });

    it("normalizes legacy Inputs payloads", () => {
        const normalized = normalizeLoaderData(inputs);

        expect(normalized).toBeDefined();
        expect(normalized?.initialInputs.total_population).toBe(
            inputs.total_population,
        );
    });

    it("returns null when normalizing invalid payloads", () => {
        const normalized = normalizeLoaderData({ initialInputs: null });

        expect(normalized).toBeNull();
    });

    it("applies session inputs over loader defaults", () => {
        const defaults = makeLoaderData(inputs);
        const sessionInputs = {
            ...inputs,
            duration: inputs.duration + 10,
        };

        const hydrated = applySessionInputsToLoaderData(
            defaults,
            sessionInputs,
        );

        expect(hydrated.initialInputs.duration).toBe(inputs.duration + 10);
        expect(hydrated.presets[0].id).toBe(defaults.presets[0].id);
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

    it("renders pending run loading", () => {
        render(<RunStatus pending={true} reset={false} />);

        expect(screen.getByRole("loading-placeholder")).toBeTruthy();
    });

    it("renders reset run loading", () => {
        render(<RunStatus pending={false} reset={true} />);

        expect(screen.getByRole("loading-placeholder")).toBeTruthy();
    });

    it("renders empty run body", () => {
        render(
            <RunStatus
                pending={false}
                reset={false}
                result={{ ok: true, status: 200 }}
            />,
        );

        expect(
            screen.getByText(
                "There was an issue with the simulation outcomes.",
            ),
        ).toBeTruthy();
    });

    it("renders successful run results", () => {
        render(
            <RunStatus
                pending={false}
                reset={false}
                result={{
                    ok: true,
                    status: 200,
                    result: JSON.stringify({
                        result: [
                            {
                                background_death: [[0], [0], [0]],
                                total_overdose: [[0], [0], [0]],
                                fatal_overdose: [[0], [0], [0]],
                                state: [[0], [0], [0]],
                                intervention_admission: [[0], [0], [0]],
                            },
                        ],
                    }),
                }}
            />,
        );

        expect(screen.getByRole("result-visualization")).toBeTruthy();
    });

    it("renders error run status", () => {
        render(
            <RunStatus
                pending={false}
                reset={false}
                result={{ ok: false, status: 500, error: "Failed" }}
            />,
        );

        expect(
            screen.getByText(
                "An error happened while attempting to run the simulation. Please try again.",
            ),
        ).toBeTruthy();
    });
});
