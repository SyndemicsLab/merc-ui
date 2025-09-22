import * as d3 from "d3";

export default function LinePlot({
    data,
    width = 640,
    height = 480,
    margin = 20
}) {
    const x = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[0])])
          .range([margin, width - (2 * margin)]);
    const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[1])])
          .range([height - margin, margin]);
    const line = d3.line()
          .x(d => x(d[0]))
          .y(d => y(d[1]));
    const xLine = d3.line()
          .x(d => d > 0 ? width - margin : margin)
          .y(d => height - margin );
    const xAxis = x.ticks(width / 40).map(value => ({
        value, xOffset: x(value)
    }));
    const yLine = d3.line()
          .x(d => margin)
          .y(d => d > 0 ? height - margin : margin - 1);
    const yAxis = y.ticks(height / 20).map(value => ({
        value, yOffset: y(value)
    }));

    return(
        <svg width={width} height={height} style={{ maxWidth: "100%", height: "auto", margin: "auto", overflow: "visible" }}>
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d={xLine([0, 1])}
            />
            {xAxis.map(({value, xOffset}) => (
                <g key={value} transform={`translate(${xOffset}, ${height - margin})`}>
                    <line y2={6} stroke="currentColor" strokeWidth="2" />
                    <text
                        key={value}
                        style={{
                            fontSize: "0.6em",
                            textAnchor: "middle",
                            transform: "translateY(20px)"
                        }}
                    >
                        {value}
                    </text>
                </g>
            ))}
            <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d={yLine([0, 1])}
            />
            {yAxis.map(({value, yOffset}) => (
                <g key={value} transform={`translate(${margin}, ${yOffset})`}>
                    <line x2={-6} stroke="currentColor" strokeWidth="2" />
                    <text
                        key={value}
                        style={{
                            fontSize: "0.6em",
                            textAnchor: "middle",
                            alignmentBaseline: "central",
                            transform: "translateX(-20px)"
                        }}
                    >
                        {value}
                    </text>
                </g>
            ))}
            <path fill="none" stroke="#003771" strokeWidth="2" d={line(data)} />
            <g fill="#3D9BE9" stroke="#003771" strokeWidth="2">
                {data.map((d, i) => {
                    return(
                        <circle key={i} cx={x(d[0])} cy={y(d[1])} r="3.5" />
                    );
                })}
            </g>
        </svg>
    );
}
