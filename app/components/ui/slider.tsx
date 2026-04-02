import { useState, type ChangeEvent } from "react";

export default function Slider({
    inputVar,
    inputText,
    min,
    max,
    step,
    defaultValue,
    managementFunction,
    readOnly = false,
}: {
    inputVar: string;
    inputText: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    managementFunction?: (arg0: number) => void;
    readOnly?: boolean;
}) {
    const [value, setValue] = useState(defaultValue);

    if (!managementFunction) {
        managementFunction = setValue;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        managementFunction(Number(event.target.value));
        setValue(Number(event.target.value));
    };

    return (
        <>
            <div className="inputName">{inputText}</div>
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
                        value={managementFunction ? defaultValue : value}
                        name={`${inputVar}`}
                        onChange={handleChange}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={managementFunction ? defaultValue : value}
                        onChange={handleChange}
                    />
                </div>
            )}
        </>
    );
}
