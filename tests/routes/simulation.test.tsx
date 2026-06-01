import inputs from "@tests/data/inputs";
import {
    clearSessionInputsFromStorage,
    persistSessionInputsToStorage,
    readSessionInputsFromStorage,
} from "~/routes/simulation";

function createMockStorage() {
    const store = new Map<string, string>();
    return {
        getItem(key: string) {
            return store.has(key) ? store.get(key)! : null;
        },
        setItem(key: string, value: string) {
            store.set(key, value);
        },
        removeItem(key: string) {
            store.delete(key);
        },
        snapshot() {
            return Object.fromEntries(store.entries());
        },
    };
}

describe("Simulation session storage", () => {
    it("persists and restores simulation session inputs", () => {
        const storage = createMockStorage();

        persistSessionInputsToStorage(inputs, storage, 123456);

        const restored = readSessionInputsFromStorage(storage);

        expect(restored).toBeDefined();
        expect(restored?.duration).toBe(inputs.duration);
        expect(restored?.interventions[0].name).toBe(
            inputs.interventions[0].name,
        );

        // Stored and restored state should not share object identity.
        expect(restored).not.toBe(inputs);
        expect(restored?.interventions).not.toBe(inputs.interventions);
    });

    it("drops corrupted session inputs from storage", () => {
        const storage = createMockStorage();

        storage.setItem("simulation-session-inputs", "not-json");
        storage.setItem(
            "simulation-session-meta",
            JSON.stringify({ schemaVersion: 1, lastUpdated: Date.now() }),
        );

        const restored = readSessionInputsFromStorage(storage);

        expect(restored).toBeNull();
        expect(storage.snapshot()["simulation-session-inputs"]).toBeUndefined();
        expect(storage.snapshot()["simulation-session-meta"]).toBeUndefined();
    });

    it("drops incompatible schema versions", () => {
        const storage = createMockStorage();

        storage.setItem("simulation-session-inputs", JSON.stringify(inputs));
        storage.setItem(
            "simulation-session-meta",
            JSON.stringify({ schemaVersion: 999, lastUpdated: Date.now() }),
        );

        const restored = readSessionInputsFromStorage(storage);

        expect(restored).toBeNull();
        expect(storage.snapshot()["simulation-session-inputs"]).toBeUndefined();
        expect(storage.snapshot()["simulation-session-meta"]).toBeUndefined();
    });

    it("clears session inputs and metadata explicitly", () => {
        const storage = createMockStorage();

        persistSessionInputsToStorage(inputs, storage, 123456);
        clearSessionInputsFromStorage(storage);

        expect(storage.snapshot()["simulation-session-inputs"]).toBeUndefined();
        expect(storage.snapshot()["simulation-session-meta"]).toBeUndefined();
    });
});
