import type { Inputs, Intervention } from "~/features/simulation/model";

export interface SimulationLoaderData {
    initialInputs: Inputs;
    presets: Intervention[];
}

export interface SimulationRunResponse {
    ok: boolean;
    status: number;
    result?: string;
    error?: string;
}

export interface SimulationSessionMeta {
    schemaVersion: number;
    lastUpdated: number;
}

export type SimulationStorage = Pick<
    Storage,
    "getItem" | "setItem" | "removeItem"
>;
