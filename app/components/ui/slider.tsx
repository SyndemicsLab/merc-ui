import { useState, type ChangeEvent } from "react";
import Tooltip from "@components/ui/tooltip";

interface SliderProps {
    inputVar: string;
    inputText: string;
    inputDescription?: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    managementFunction?: (arg0: number) => void;
    readOnly?: boolean;
    validationMessage?: string;
};

export default function Slider({
    inputVar,
    inputText,
    inputDescription = null,
    min,
    max,
    step,
    defaultValue,
    managementFunction,
    readOnly = false,
    validationMessage,
}: SliderProps) {
    const [value, setValue] = useState(Number(defaultValue));

    const hasManagementFunction = typeof managementFunction === "function";
    const displayValue = hasManagementFunction ? defaultValue : value;
    // when there's no external management function, simply use the state setter
    if (!managementFunction) {
        managementFunction = setValue;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        managementFunction(Number(event.target.value));
    };

    return (
        <>
            <div className="inputName">
                {inputText}
                {inputDescription ?
                    <Tooltip inputName={inputText} body={inputDescription} /> : null}
                {validationMessage ? (
                    <span className="slider-validation-badge">!</span>
                ) : null}
            </div>
            {validationMessage ? (
                <p className="slider-validation-message" role="alert">
                    {validationMessage}
                </p>
            ) : null}
            {readOnly ? (
                <div className="slider">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={defaultValue}
                        name={`${inputVar}`}
                        readOnly={readOnly}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={defaultValue}
                        readOnly={readOnly}
                    />
                </div>
            ) : (
                <div className="slider">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={displayValue}
                        name={`${inputVar}`}
                        onChange={handleChange}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={displayValue}
                        onChange={handleChange}
                    />
                </div>
            )}
        </>
    );
}
