import { type Inputs } from "~/features/simulation/model";
import inputs from "@tests/data/inputs";
import {
    addIntervention,
    changeChangingPopulation,
    changeDuration,
    changeFatalOverdoseProportion,
    changeInterventionOverdose,
    changeInterventionPopulation,
    changeInterventionTransition,
    changeTotalPopulation,
    deleteIntervention,
    inputsReducer,
    renameIntervention,
} from "~/features/simulation/reducer";
import { PROPORTION_MAX } from "~/globals";

function makeState(): Inputs {
    return JSON.parse(JSON.stringify(inputs)) as Inputs;
}

describe("Simulation reducer domain transitions", () => {
    it("renames an intervention and updates related transitions", () => {
        const state = makeState();

        const next = renameIntervention(state, 1, "");

        const renamed = next.interventions.find((i) => i.id === 1);
        expect(renamed?.name).toBe("");

        const postTransition = renamed?.transitions.find((t) => t.id === 1);
        expect(postTransition?.name).toBe("Post-");

        const naltrexone = next.interventions.find((i) => i.id === 2);
        const transitionToRenamed = naltrexone?.transitions.find(
            (t) => t.id === 1,
        );
        expect(transitionToRenamed?.name).toBe("");
    });

    it("adds a blank intervention deterministically", () => {
        const state = makeState();

        const next = addIntervention(state, "Intervention");

        expect(next.interventions.length).toBe(state.interventions.length + 1);

        const added = next.interventions[next.interventions.length - 1];
        expect(added.name).toBe("New Intervention 1");
        expect(added.active).toBe(true);
        expect(added.population).toBe(0);
        expect(added.overdose).toEqual([
            { probability: 0, injection: true },
            { probability: 0, injection: false },
        ]);

        expect(state.interventions.length).toBe(inputs.interventions.length);
    });

    it("deletes an active intervention and rebalances No Treatment", () => {
        const state = makeState();

        const selected = inputsReducer(state, {
            type: "intervention select",
            id: 1,
        });
        const beforeNoTreatment = selected.interventions.find(
            (i) => i.id === 0,
        );
        const toDelete = selected.interventions.find((i) => i.id === 1);

        const next = deleteIntervention(selected, 1);

        expect(next.interventions.find((i) => i.id === 1)).toBeUndefined();

        const afterNoTreatment = next.interventions.find((i) => i.id === 0);
        expect(afterNoTreatment?.active).toBe(true);
        expect(afterNoTreatment?.population).toBe(
            (beforeNoTreatment?.population ?? 0) +
                (toDelete?.population ?? 0) +
                (toDelete?.postPopulation ?? 0),
        );

        next.interventions.forEach((intervention) => {
            expect(
                intervention.transitions.some(
                    (transition) => transition.id === 1,
                ),
            ).toBe(false);
        });
    });

    it("changes intervention population and rebalances No Treatment", () => {
        const state = makeState();

        const next = changeInterventionPopulation(state, 1, 50000);

        const intervention = next.interventions.find((i) => i.id === 1);
        expect(intervention?.population).toBe(50000);

        const newPost = Math.round(
            ((intervention?.transitions[0].probability ?? 0) / 100) * 50000,
        );
        expect(intervention?.postPopulation).toBe(newPost);

        const treated = next.interventions
            .filter((i) => i.id !== 0)
            .reduce(
                (acc, i) => acc + i.population + (i.postPopulation ?? 0),
                0,
            );
        const noTreatment = next.interventions.find((i) => i.id === 0);
        expect(noTreatment?.population).toBe(next.total_population - treated);
    });

    it("rejects intervention population when it exceeds total population", () => {
        const state = makeState();

        const next = changeInterventionPopulation(
            state,
            1,
            state.total_population + 1,
        );

        expect(next).toBe(state);
    });

    it("changes intervention transition probability with rounding", () => {
        const state = makeState();

        const next = changeInterventionTransition(state, 1, 0, 12.345678);
        const intervention = next.interventions.find((i) => i.id === 1);
        const updatedTransition = intervention?.transitions.find(
            (t) => t.id === 0,
        );

        expect(updatedTransition?.probability).toBe(12.3457);
    });

    it("rejects transition updates that exceed probability limit", () => {
        const state = makeState();
        const naltrexone = state.interventions.find((i) => i.id === 2);
        const unchanged = naltrexone?.transitions.find(
            (t) => t.id === 0,
        )?.probability;

        const next = changeInterventionTransition(
            state,
            2,
            0,
            PROPORTION_MAX + 1,
        );

        expect(next).toBe(state);
        const current = next.interventions
            .find((i) => i.id === 2)
            ?.transitions.find((t) => t.id === 0)?.probability;
        expect(current).toBe(unchanged);
    });

    it("changes only the targeted overdose probability", () => {
        const state = makeState();

        const next = changeInterventionOverdose(state, 1, true, 3.5);
        const intervention = next.interventions.find((i) => i.id === 1);
        const injector = intervention?.overdose.find(
            (od) => od.injection === true,
        );
        const nonInjector = intervention?.overdose.find(
            (od) => od.injection === false,
        );

        expect(injector?.probability).toBe(3.5);
        expect(nonInjector?.probability).toBe(
            state.interventions
                .find((i) => i.id === 1)
                ?.overdose.find((od) => od.injection === false)?.probability,
        );
    });

    it("changes duration via scalar helper", () => {
        const state = makeState();

        const next = changeDuration(state, 104);

        expect(next.duration).toBe(104);
        expect(state.duration).toBe(inputs.duration);
    });

    it("changes total population and rebalances No Treatment", () => {
        const state = makeState();

        const next = changeTotalPopulation(state, 250000);

        expect(next.total_population).toBe(250000);
        const treated = next.interventions
            .filter((i) => i.id !== 0)
            .reduce(
                (acc, i) => acc + i.population + (i.postPopulation ?? 0),
                0,
            );
        const noTreatment = next.interventions.find((i) => i.id === 0);
        expect(noTreatment?.population).toBe(250000 - treated);
    });

    it("rejects total population below current treated minimum", () => {
        const state = makeState();
        const treatedMinimum = state.interventions
            .filter((i) => i.id !== 0)
            .reduce(
                (acc, i) => acc + i.population + (i.postPopulation ?? 0),
                0,
            );

        const next = changeTotalPopulation(state, treatedMinimum - 1);

        expect(next).toBe(state);
    });

    it("changes changing_population via scalar helper", () => {
        const state = makeState();

        const next = changeChangingPopulation(state, -500);

        expect(next.changing_population).toBe(-500);
        expect(state.changing_population).toBe(inputs.changing_population);
    });

    it("changes fatal_overdoses via scalar helper", () => {
        const state = makeState();

        const next = changeFatalOverdoseProportion(state, 25.5);

        expect(next.fatal_overdoses).toBe(25.5);
        expect(state.fatal_overdoses).toBe(inputs.fatal_overdoses);
    });
});
