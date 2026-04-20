import { sources } from "./js/sources.js";
import { layers } from "./js/layers.js";
import { add_pointer_when_hovering } from "./js/hover.js";
import { make_popup } from "./js/popup.js";
import { make_popup_message } from "./js/click.js";
import { make_map } from "./js/map.js";

const map = make_map();

map.on("load", () => {
  //move labels on top of linework
  const lays = map.getStyle().layers;
  let firstSymbolId;
  for (const lay of lays) {
    if (lay.type === "symbol") {
      firstSymbolId = lay.id;
      break;
    }
  }
  //load sources
  for (const source in sources) map.addSource(source, sources[source]);
  //load layer styles
  for (const layer in layers) map.addLayer(layers[layer], firstSymbolId);

  // set the pointer style when hovering specific layers
  ["planned-segments"].forEach((layer) => {
    add_pointer_when_hovering(map, layer);
  });
});

// make a popup when the user clicks on one or more of the map layers
map.on("click", (e) => {
  // set bbox as area around clicked point
  const bbox = [
    [e.point.x - 5, e.point.y - 5],
    [e.point.x + 5, e.point.y + 5],
  ];

  // get all features near the user's click
  let features = map.queryRenderedFeatures(bbox, {
    layers: ["planned-segments", "packages"],
  });

  // clear highlight if clicking empty space
  if (features.length === 0) {
    map.setFilter("packages-selected", ["==", "route_identifier", ""]);
    return;
  }

  // highlight clicked package feature
  const packageFeature = features.find((f) => f.layer.id === "packages");
  if (packageFeature) {
    map.setFilter("packages-selected", [
      "==",
      "route_identifier",
      packageFeature.properties["route_identifier"],
    ]);
  }
  //filter map layer
  let clicked_Year = features[0].properties["Calendar year"];
  map.setFilter("plan_selected", ["==", "Calendar year", clicked_Year]);

  // as long as there's at least one feature, make the message
  // and then add the popup to the map
  if (features.length > 0) {
    let lat = e.lngLat.wrap().lat;
    let lng = e.lngLat.wrap().lng;
    let message = make_popup_message(features, lat, lng);
    make_popup(e, message, map);
  }
});
//toggle layers
window.toggleLayer = function (el) {
  const layerId = el.getAttribute("data-layer");
  const visibility = map.getLayoutProperty(layerId, "visibility");

  if (visibility === "none") {
    map.setLayoutProperty(layerId, "visibility", "visible");
    el.style.opacity = "1";
  } else {
    map.setLayoutProperty(layerId, "visibility", "none");
    el.style.opacity = "0.4";
  }
};
