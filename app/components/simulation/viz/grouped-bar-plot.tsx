import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { type PlotMargins } from "@components/simulation/viz/line-plot";

interface BarPlotProps {
    data: any;
    primaryKey: string;
    groupKey: string;
    valueKey: string;
    legendLabel: string;
    xTitle?: string;
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
        xTitle,
        yTitle,
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
              .range([height - margin.bottom, margin.top + 35]);

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

        // X-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(placement).tickSizeOuter(0))
            .call(g => g.selectAll(".domain").remove());
        xTitle ? svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height})`)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "after-edge")
            .attr("font-size", "0.8rem")
            .text(xTitle) : null;

        // Y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(20, "s"))
            .call(g => g.selectAll(".domain").remove());
        yTitle ? svg.append("text")
            .attr("transform", `translate(12, ${height / 2}) rotate(-90)`)
            .attr("text-anchor", "middle")
            .attr("font-size", "0.8rem")
            .text(yTitle) : null;


        // legend
        const legendX = d3.scaleBand()
              .domain(color.domain())
              .rangeRound([margin.left, width - margin.right]);
        const legend = svg.append("g")
              .attr("x", legendX)
              .attr("y", margin.top)
              .attr("width", legendX.bandwidth() * color.domain().length)
              .attr("height", 25);
        legend.selectAll("rect")
            .data(color.domain())
            .join("rect")
            .attr("x", legendX)
            .attr("y", margin.top)
            .attr("width", Math.max(0, legendX.bandwidth() - 1))
            .attr("height", 15)
            .attr("fill", color);
        legend.selectAll("text")
            .data(color.domain())
            .join("text")
            .attr("x", (d) => legendX(d) + legendX.bandwidth() / 2 - 1)
            .attr("y", margin.top + 23)
            .attr("font-size", "0.5rem")
            .attr("text-anchor", "middle")
            .text(d => d);
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
