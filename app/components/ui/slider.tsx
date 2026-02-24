import { useState, type ChangeEvent } from "react";

export default function Slider({
    inputName,
    min,
    max,
    step,
    defaultValue,
    managementFunction,
    readOnly = false,
}: {
    inputName: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    managementFunction?: (arg0: number) => void;
    readOnly?: boolean;
}) {
    if (!managementFunction) {
        const [value, setValue] = useState(defaultValue);
        managementFunction = setValue;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        managementFunction(Number(event.target.value));
    };

    return (
        <>
            <div className="inputName">{inputName}</div>
            {readOnly ? (
                <div className="slider">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={defaultValue}
                        name={`${inputName}-num`}
                        readOnly={readOnly}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={defaultValue}
                        id={`${inputName}-slider`}
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
                        value={defaultValue}
                        name={`${inputName}-num`}
                        onChange={handleChange}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={defaultValue}
                        id={`${inputName}-slider`}
                        onChange={handleChange}
                    />
                </div>
            )}
        </>
    );
}
