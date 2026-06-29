import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { SYNDEMICS_PINK, SYNDEMICS_CYAN, SYNDEMICS_BLUE } from "~/globals";

const TOOLTIP_TEXT = "Use your cursor for detailed information";

export type Point = [number, number];

interface Region {
    position: number;
    width: number;
    point: Point;
}

export interface PlotMargins {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface LinePlotProps {
    data: Point[];
    perTimestep?: boolean;
    title: string;
    id?: string;
    xTitle?: string;
    yTitle?: string;
    width?: number;
    height?: number;
    margin?: PlotMargins;
}

interface MultiLineData {
    value: Point[];
    name: string;
}

interface MultiLinePlotProps {
    data: MultiLineData[];
    perTimestep?: boolean;
    title: string;
    id?: string;
    xTitle?: string;
    yTitle?: string;
    width?: number;
    height?: number;
    margin?: PlotMargins;
}

function pointRange(
    data: (Point | MultiLineData)[],
    dim: number,
): [number, number] | undefined {
    if (dim > 1 || dim < 0) {
        return undefined;
    }
    const values: number[] = [];
    for (const item of data) {
        if ("value" in item) {
            // MultiLineData
            values.push(...item.value.map((p) => p[dim]));
        } else {
            // Point
            values.push(item[dim]);
        }
    }

    const min = d3.min(values) ?? 0;
    const max = d3.max(values) ?? 0;
    return [min, max];
}

function createTooltip(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    margin: PlotMargins,
) {
    const tooltip = svg.append("g");
    tooltip
        .append("text")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .style("fill", "#777")
        .text(TOOLTIP_TEXT);
    return tooltip;
}

/*
  Draws a line plot from data of the shape [2, N], e.g. [[0,0], [1,1], [2,2]],
  where N is the number of points in the data set.

  The default argument values are chosen arbitrarily based on trial and error
*/
export default function LinePlot(props: LinePlotProps) {
    const {
        data,
        perTimestep,
        title,
        id,
        xTitle,
        yTitle,
        width = 650,
        height = 500,
        margin = {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50,
        },
    } = props;

    // reference for the SVG container
    const plotContainer = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!plotContainer.current) {
            return;
        }

        const svg = d3.select(plotContainer.current);

        // clear content when refreshing
        svg.selectAll("*").remove();

        if (data.length === 0) {
            return;
        }

        const plottedData = perTimestep
            ? data.filter((pt) => pt[0] >= 1)
            : data;
        if (plottedData.length === 0) {
            return;
        }

        const xMin = d3.min(data, (d) => d[0]) ?? 0;
        const xMax = d3.max(data, (d) => d[0]) ?? 0;

        const x = d3
            .scaleLinear()
            .domain([xMin, xMax])
            .range([margin.left, width - margin.right])
            .nice();
        const yMin = d3.min(data, (d) => d[1]) ?? 0;
        const yMax = d3.max(data, (d) => d[1]) ?? 0;
        const y = d3
            .scaleLinear()
            .domain([yMin >= 0 ? 0 : yMin, yMin == yMax ? yMin + 1 : yMax])
            .range([height - margin.bottom, margin.top + 15])
            .nice();
        const line = d3
            .line<Point>()
            .x((d) => x(d[0]))
            .y((d) => y(d[1]));

        // add the x-axis
        // the constant 80 was chosen arbitrarily
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(
                        data.length < 10 ? data.length : width / 80,
                        data.length < 10 ? "g" : "d",
                    )
                    .tickSizeOuter(0),
            );
        if (xTitle) {
            svg.append("text")
                .attr("transform", `translate(${width / 2}, ${height})`)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "after-edge")
                .attr("font-size", "0.8rem")
                .text(xTitle);
        }

        // add the y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(20, "s"))
            .call((g) => g.selectAll(".domain").remove());
        // transforming the axis label so that it is 12 units closer to the axis
        // and rotating (-90 degrees) so that the bottom of the text faces the
        // axis
        if (yTitle) {
            svg.append("text")
                .attr("transform", `translate(12, ${height / 2}) rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("font-size", "0.8rem")
                .text(yTitle);
        }

        const tooltip = createTooltip(svg, margin);
        // line
        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", `${SYNDEMICS_CYAN}`)
            .attr("stroke-width", 2)
            .attr("d", line(plottedData));

        // discrete data points
        const points = svg.append("g").attr("fill", `${SYNDEMICS_BLUE}`);
        // disable individual data points if there is > 3 years of data
        // (the zeroth week + 52 weeks * 3 years)
        if (plottedData.length <= 157) {
            points
                .selectAll<SVGCircleElement, Point>("circle")
                .data(plottedData)
                .join("circle")
                .attr("cx", (d) => x(d[0]))
                .attr("cy", (d) => y(d[1]))
                .attr("r", 1.5);
        }

        const currentPoint = svg
            .append("circle")
            .attr("fill", `${SYNDEMICS_PINK}`)
            .attr("r", 2.5)
            .attr("visibility", "hidden");

        const regions: Region[] = [];
        for (let i = 0; i < plottedData.length; i++) {
            const center = x(plottedData[i][0]);
            let regionWidth;
            if (i === 0) {
                regionWidth =
                    plottedData.length === 1
                        ? width - margin.left - margin.right
                        : x(plottedData[i + 1][0]) - x(plottedData[i][0]);
            } else if (i === plottedData.length - 1) {
                regionWidth = x(plottedData[i][0]) - x(plottedData[i - 1][0]);
            } else {
                regionWidth =
                    (x(plottedData[i + 1][0]) - x(plottedData[i - 1][0])) / 2;
            }
            regions.push({
                position: center - regionWidth / 2,
                width: regionWidth,
                point: plottedData[i],
            });
        }

        svg.append("g")
            .attr("pointer-events", "all")
            .attr("fill", "none")
            .selectAll<SVGRectElement, Region>("rect")
            .data(regions)
            .join("rect")
            .attr("x", (d) => d.position)
            .attr("y", margin.bottom)
            .attr("width", (d) => d.width)
            .attr("height", height - margin.top - margin.bottom)
            .on("mouseover", (_event, d) => {
                tooltip.select("text").text(`(${d.point[0]}, ${d.point[1]})`);
                currentPoint
                    .attr("cx", x(d.point[0]))
                    .attr("cy", y(d.point[1]))
                    .attr("visibility", "visible");
            })
            .on("mouseout", () => {
                tooltip.select("text").text(TOOLTIP_TEXT);
                currentPoint.attr("visibility", "hidden");
            });
    }, [data, xTitle, yTitle, width, height, margin, plotContainer]);

    return (
        <div className="line-plot">
            {title ? <h2 id={id}>{title}</h2> : null}
            <svg viewBox={`0 0 ${width} ${height}`} ref={plotContainer} />
        </div>
    );
}

export function MultiLinePlot(props: MultiLinePlotProps) {
    const {
        data,
        perTimestep,
        title,
        id,
        xTitle,
        yTitle,
        width = 650,
        height = 500,
        margin = {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50,
        },
    } = props;

    // reference for the SVG container
    const plotContainer = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!plotContainer.current) {
            return;
        }

        const svg = d3.select(plotContainer.current);

        // clear content when refreshing
        svg.selectAll("*").remove();

        if (data.length === 0) {
            return;
        }

        // Keep the axis domain based on the full data, but do not plot week 0.
        let plottedData = data;

        if (perTimestep) {
            plottedData = data.map((series) => ({
                ...series,
                value: series.value.filter((pt) => pt[0] >= 1),
            }));
        }

        const xRange = pointRange(data, 0);
        if (!xRange) {
            return;
        }
        const [xMin, xMax] = xRange;
        const x = d3
            .scaleLinear()
            .domain([xMin, xMax])
            .range([margin.left, width - margin.right])
            .nice();

        const yRange = pointRange(data, 1);
        if (!yRange) {
            return;
        }
        const [yMin, yMax] = yRange;
        const y = d3
            .scaleLinear()
            .domain([yMin >= 0 ? 0 : yMin, yMax])
            .range([height - margin.bottom, margin.top + 15])
            .nice();

        const colors: d3.ScaleOrdinal<number, string, never> = d3
            .scaleOrdinal<number, string, never>()
            .range([SYNDEMICS_PINK, SYNDEMICS_BLUE, SYNDEMICS_CYAN]);

        // put all plotted data into a single, flat array
        const points: (number | string)[][] = plottedData.flatMap((d) =>
            d.value.map((pt) => [x(pt[0]), y(pt[1]), d.name, pt[0], pt[1]]),
        );

        // check the highest data point count across all data, use that to
        // decide how to draw ticks on the x-axis
        const maxPoints = Math.max(...plottedData.map((p) => p.value.length));

        // add the x-axis
        // the constant 80 was chosen arbitrarily
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(
                        maxPoints < 10 ? maxPoints : width / 80,
                        maxPoints < 10 ? "g" : "d",
                    )
                    .tickSizeOuter(0),
            );
        if (xTitle) {
            svg.append("text")
                .attr("transform", `translate(${width / 2}, ${height})`)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "after-edge")
                .attr("font-size", "0.8rem")
                .text(xTitle);
        }

        // add the y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(20, "s"))
            .call((g) => g.selectAll(".domain").remove());
        // transforming the axis label so that it is 12 units closer to the axis
        // and rotating (-90 degrees) so that the bottom of the text faces the
        // axis
        if (yTitle) {
            svg.append("text")
                .attr("transform", `translate(12, ${height / 2}) rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("font-size", "0.8rem")
                .text(yTitle);
        }

        // group the points by series
        const groups = d3.rollup(
            points,
            (v) => Object.assign(v, { z: v[0][2] }),
            (d) => d[2],
        );

        // draw each curve in data as paths
        const line = d3.line<Point>();
        const path = svg
            .append("g")
            .attr("stroke-width", 2)
            .attr("fill", "transparent")
            .selectAll("path")
            .data(groups.values())
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("stroke", (_, i: number): string => colors(i))
            .attr("d", (group) => {
                const pts = group.map(
                    ([x, y]) => [x as number, y as number] as Point,
                );
                return line(pts);
            });

        const currentPoint = svg.append("g").attr("visibility", "hidden");

        currentPoint.append("circle").attr("fill", `#000`).attr("r", 2.5);

        const tooltip = createTooltip(svg, margin);
        svg.on("pointerenter", pointerentered)
            .on("pointermove", pointermoved)
            .on("pointerleave", pointerleft)
            .on("touchstart", (e) => e.preventDefault());

        function pointermoved(event: MouseEvent) {
            const [xm, ym] = d3.pointer(event);
            const index: number | undefined = d3.leastIndex(
                points as Iterable<[number, number]>,
                ([x, y]: [number, number]) => Math.hypot(x - xm, y - ym),
            );
            if (index === undefined) {
                return;
            }
            const [x, y, name, v0, v1] = points[index];
            path.style("stroke", ({ z }) => (z === name ? null : "#ddd"))
                .filter(({ z }) => z === name)
                .raise();
            currentPoint.attr("transform", `translate(${x}, ${y})`);
            tooltip.select("text").text(`${name}: ${v0}, ${v1}`);
        }

        function pointerentered() {
            path.style("mix-blend-mode", null).style("stroke", "#ddd");
            currentPoint.attr("visibility", "visible");
        }

        function pointerleft() {
            path.style("mix-blend-mode", "multiply").style("stroke", null);
            currentPoint.attr("visibility", "hidden");
            tooltip.select("text").text(TOOLTIP_TEXT);
        }
    }, [data, xTitle, yTitle, width, height, margin, plotContainer]);

    return (
        <div className="line-plot">
            {title ? <h2 id={id}>{title}</h2> : null}
            <svg viewBox={`0 0 ${width} ${height}`} ref={plotContainer} />
        </div>
    );
}
