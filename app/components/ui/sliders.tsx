import * as React from "react"
import { useState } from "react";

export function NamedSlider(
    { inputName, min, max, step, defaultValue, readOnly = false }:
    { inputName: string, min: number, max: number, step: number, defaultValue: number, readOnly?: boolean }
) {
    const [value, setValue] = useState(defaultValue);
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
                        value={value}
                        name={`${inputName}-num`}
                        readOnly={readOnly}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
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
                        value={value}
                        name={`${inputName}-num`}
                        onChange={(event) => setValue(event.target.value)}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        id={`${inputName}-slider`}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </div>
            )}
        </>
    );
}

export function ManagedSlider(
    { name, min, max, step, value, managementFunction, readOnly = false }:
    { name: string, min: number, max: number, step: number, value: number, managementFunction: (number) => void, readOnly?: boolean }
) {
    return(
        <>
            <div className="inputName">{name}</div>
            {readOnly ? (
                <div className="slider">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        name={`${name}-num`}
                        readOnly={readOnly}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        id={`${name}-slider`}
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
                        value={value}
                        name={`${name}-num`}
                        onChange={(event) =>
                            managementFunction(event.target.value)}
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        id={`${name}-slider`}
                        onChange={(event) =>
                            managementFunction(event.target.value)}
                    />
                </div>
            )}
        </>
    );
}
