export default function ManagedSlider(
    { name, min, max, step, value, managementFunction, readOnly = false }:
    { name: string, min: number, max: number, step: number, value: any, managementFunction: Function, readOnly?: boolean }
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
			onChange={(event) => managementFunction(event.target.value)}
                    />
                    <input
			type="range"
			min={min}
			max={max}
			step={step}
			value={value}
			id={`${name}-slider`}
			onChange={(event) => managementFunction(event.target.value)}
                    />
		</div>
	    )}
        </>
    );
}
