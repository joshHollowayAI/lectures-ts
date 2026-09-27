export function graph(x, y) {
    Plotly.newPlot("graph", [{
            x,
            y,
            mode: "markers",
            marker: { size: 14, color: "royalblue" }
        }], {
        shapes: x.map((value, i) => ({
            type: "line",
            x0: value,
            x1: value,
            y0: 0,
            y1: y[i],
            line: { color: "royalblue", width: 2 },
            layer: "below"
        }))
    }, {
        responsive: true
    });
}
