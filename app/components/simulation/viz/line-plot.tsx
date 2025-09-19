import * as d3 from "d3";

export default function LinePlot({
    data,
    width = 640,
    height = 480,
    margin = 20
}) {
    const x = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[0])])
          .range([margin, width - margin]);
    const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d[1])])
          .range([height - margin, margin]);
    const line = d3.line()
          .x(d => x(d[0]))
          .y(d => y(d[1]));

    return(
        <svg width={width} height={height} style={{ maxWidth: "100%", height: "auto", margin: "auto" }}>
            <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
                {data.map((d, i) => {
                    return(
                        <circle key={i} cx={x(d[0])} cy={y(d[1])} r="2.5" />
                    );
                })}
            </g>
        </svg>
    );
}
