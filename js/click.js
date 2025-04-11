const make_popup_message = (featurelist, lat, lng) => {
  // Review every feature that was clicked on, and add a section
  // to the popup message for each one, split by a horizontal rule tag
  // console.log(lat);
  let messages = [];

  // Use different popup templates depending on the source layer,
  // in order to account for slightly different columns and names
  featurelist.forEach((feature) => {
    // Handle colorful layer showing all future years
    //  console.log(feature);
    if (feature.layer.source == "plan") {
      let msg = `
        <h4>${feature.properties["Loc Road Name RMS"]} / SR ${feature.properties.sr}</h4>
        <p>Planned Year: ${feature.properties["Calendar Year"]}<br/>
        From: ${feature.properties["Intersection From"]}<br/>
        To: ${feature.properties["Intersection To"]}<br/>
        Municipalities: ${feature.properties["Municipality Name1"]}<br/>
        <a href="https://maps.google.com/maps?q=&amp;layer=c&amp;cbll=${lat},${lng}" rel="nofollow ugc" target="_blank">Open Google Streetview</a>
        </p>
        `;
      if (messages.indexOf(msg) == -1) {
        messages.push(msg);
      }
    }
  });

  return messages.join("<hr>");
};

export { make_popup_message };
