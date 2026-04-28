import {
    createContext,
    useContext,
    useReducer,
    type Dispatch,
    type ReactNode,
} from "react";
import type { Inputs } from "~/features/simulation/model";
import {
    inputsReducer,
    type SimulationAction,
} from "~/features/simulation/reducer";

// used to avoid "prop drilling" through objects to access state for simulation
// inputs
export const InputsContext = createContext<Inputs | null>(null);
export const InputsDispatchContext =
    createContext<Dispatch<SimulationAction> | null>(null);

export function InputProvider({
    children,
    initialState,
}: {
    children: ReactNode;
    initialState: Inputs;
}) {
    const [simulationInputs, dispatch] = useReducer(
        inputsReducer,
        initialState,
    );
    return (
        <InputsContext.Provider value={simulationInputs}>
            <InputsDispatchContext.Provider value={dispatch}>
                {children}
            </InputsDispatchContext.Provider>
        </InputsContext.Provider>
    );
}

export function useInputs() {
    const context = useContext(InputsContext);
    if (context === null) {
        throw Error("useInputs must be used within an InputProvider");
    }
    return context;
}

export function useInputsDispatch() {
    const context = useContext(InputsDispatchContext);
    if (context === null) {
        throw Error("useInputsDispatch must be used within an InputProvider");
    }
    return context;
}
