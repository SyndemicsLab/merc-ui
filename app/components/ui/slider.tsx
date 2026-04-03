import { useState, type ChangeEvent } from "react";

export default function Slider({
    inputVar,
    inputText,
    min,
    max,
    step,
    defaultValue,
    managementFunction = null,
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
    const [value, setValue] = useState(Number(defaultValue));

    const displayValue = managementFunction === null ? value : defaultValue;
    // when there's no external management function, simply use the state setter
    if (managementFunction === null) {
        managementFunction = setValue;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(value);
        managementFunction(Number(event.target.value));
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
