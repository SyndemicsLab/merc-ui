import * as d3 from "d3";
import { type PlotMargins } from "@components/simulation/viz/line-plot";
import { useRef, useEffect } from "react";

interface BarPlotProps {
    data: any;
    primaryKey: string;
    groupKey: string;
    valueKey: string;
    legendLabel: string;
    yTitle?: string;
    width?: number;
    height?: number;
    margin?: PlotMargins;
}

export default function GroupedBarPlot(props: BarPlotProps) {
    let {
        data,
        primaryKey,
        groupKey,
        valueKey,
        legendLabel,
        yTitle = "",
        width = 650,
        height = 500,
        margin = {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50
        }
    } = props;

    // reference for the SVG container
    const plotContainer = useRef(null);

    useEffect(() => {
        const svg = d3.select(plotContainer.current);

        // clear content when refreshing
        svg.selectAll("*").remove();

        // define the function that determines where the bar is drawn
        const placement = d3.scaleBand()
              .domain(new Set(data.map(d => d[primaryKey])))
              .range([margin.left, width - margin.right])
              .paddingInner(0.04)
              .paddingOuter(0.1);

        const groups = new Set(data.map(d => d[groupKey]));
        const x = d3.scaleBand()
              .domain(groups)
              .range([0, placement.bandwidth()])
              .padding(0.03);
        const color = d3.scaleOrdinal([`#f0325f`, `#003771`, `#3d9be9`])
              .domain(groups);

        const y = d3.scaleLinear()
              .domain([0, d3.max(data, d => d[valueKey])]).nice()
              .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .selectAll()
            .data(d3.group(data, d => d[primaryKey]))
            .join("g")
            .attr("transform", ([key]) => `translate(${placement(key)}, 0)`)
            .selectAll()
            .data(([, d]) => d)
            .join("rect")
                .attr("x", d => x(d[groupKey]))
                .attr("y", d => y(d[valueKey]))
                .attr("width", x.bandwidth())
                .attr("height", d => y(0) - y(d[valueKey]))
                .attr("fill", d => color(d[groupKey]));

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(placement).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove());

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(20, "s"))
            .call(g => g.selectAll(".domain").remove());
    }, [data, yTitle, width, height, margin, plotContainer]);

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            style={{ maxWidth: "100%", height: "auto", overflow: "visible" }}
            ref={plotContainer}
        />
    );
}
