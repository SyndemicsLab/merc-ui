import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from "react";

export default function Slider({
    inputVar,
    inputText,
    min,
    max,
    step,
    defaultValue,
    managementFunction,
    readOnly = false,
    numberInputMode = "immediate",
}: {
    inputVar: string;
    inputText: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    managementFunction?: (arg0: number) => void;
    readOnly?: boolean;
    numberInputMode?: "immediate" | "deferred";
}) {
    const [value, setValue] = useState(Number(defaultValue));
    const [textValue, setTextValue] = useState(String(defaultValue));

    const hasManagementFunction = typeof managementFunction === "function";
    const displayValue = hasManagementFunction ? defaultValue : value;
    const shouldDeferNumberInput = numberInputMode === "deferred";
    // when there's no external management function, simply use the state setter
    if (!managementFunction) {
        managementFunction = setValue;
    }

    useEffect(() => {
        if (!shouldDeferNumberInput) {
            return;
        }

        setTextValue(String(displayValue));
    }, [displayValue, shouldDeferNumberInput]);

    const clamp = (nextValue: number) => Math.min(max, Math.max(min, nextValue));

    const sanitizeNumberInput = (rawValue: string) => {
        // Keep only digits and one decimal point. Minus signs are disallowed for this mode.
        let sanitized = rawValue.replace(/[^0-9.]/g, "");
        const firstDot = sanitized.indexOf(".");
        if (firstDot !== -1) {
            sanitized =
                sanitized.slice(0, firstDot + 1) +
                sanitized.slice(firstDot + 1).replace(/\./g, "");
        }

        return sanitized;
    };

    const commitTextValue = (rawValue: string) => {
        const sanitized = sanitizeNumberInput(rawValue);
        if (sanitized === "") {
            setTextValue("0");
            managementFunction(0);
            return;
        }

        const parsed = Number(sanitized);
        const clamped = clamp(Number.isNaN(parsed) ? 0 : parsed);
        setTextValue(String(clamped));
        managementFunction(clamped);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!shouldDeferNumberInput || event.target.type === "range") {
            managementFunction(Number(event.target.value));
            return;
        }

        const sanitized = sanitizeNumberInput(event.target.value);
        setTextValue(sanitized);

        if (sanitized === "") {
            return;
        }

        const parsed = Number(sanitized);
        if (!Number.isNaN(parsed)) {
            managementFunction(parsed);
        }
    };

    const handleNumberBlur = () => {
        if (!shouldDeferNumberInput) {
            return;
        }

        commitTextValue(textValue);
    };

    const handleNumberKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!shouldDeferNumberInput || event.key !== "Enter") {
            return;
        }

        commitTextValue(textValue);
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
                        value={shouldDeferNumberInput ? textValue : displayValue}
                        name={`${inputVar}`}
                        onChange={handleChange}
                        onBlur={handleNumberBlur}
                        onKeyDown={handleNumberKeyDown}
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
