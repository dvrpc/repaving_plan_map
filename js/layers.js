const yellow_paint_style = {
  "line-width": 4,
  "line-color": "yellow",
  "line-opacity": 0.4,
};

const layers = {
  boundaries: {
    id: "boundaries",
    type: "line",
    source: "boundaries",
    paint: {
      "line-color": "#d4d5d6",
      "line-width": 1,
    },
    filter: ["all", ["==", "dvrpc_reg", "Yes"], ["==", "state", "PA"]],
  },
  plan: {
    id: "planned-segments",
    type: "line",
    source: "plan",
    paint: {
      "line-width": 1.5,
      "line-color": [
        "match",
        ["get", "Calendar year"],
        "2024",
        "#27AE60 ", //green
        "2025",
        "#F39C12", //orange
        "2026",
        "red", //red
        "2027",
        "#A569BD", //purple
        "2028",
        "#3498DB", //blue
        "gray",
      ],
    },
  },
  plan_selected: {
    id: "planned-segments",
    type: "line",
    source: "plan",
    paint: {
      "line-width": 6,
      "line-color": [
        "match",
        ["get", "Calendar year"],
        "2024",
        "#27AE60 ", //green
        "2025",
        "#F39C12", //orange
        "2026",
        "red", //red
        "2027",
        "#A569BD", //purple
        "2028",
        "#3498DB", //blue
        "gray",
      ],
    },
  },
};

export { layers };
