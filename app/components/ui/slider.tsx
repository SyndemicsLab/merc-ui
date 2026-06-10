import { useEffect, useState, type ChangeEvent } from "react";

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
    const [value, setValue] = useState<number | "">(Number(defaultValue));

    useEffect(() => {
        setValue(Number(defaultValue));
    }, [defaultValue]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value;

        if (rawValue === "") {
            setValue("");
            return;
        }

        const nextValue = Number(rawValue);
        setValue(nextValue);
        managementFunction?.(nextValue);
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
                        value={value === 0 ? "" : value}
                        name={`${inputVar}`}
                        onChange={handleChange}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={typeof value === "number" ? value : 0}
                        onChange={handleChange}
                    />
                </div>
            )}
        </>
    );
}
