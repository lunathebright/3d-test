import React from "react";
import Globe from "react-globe.gl";

export default function GlobeCanvas() {
  const onClick = (coord) => {
    console.log(coord);
  };

  return (
    <Globe
      // globeImageUrl="/images/gateway.png"
      // globeImageUrl="/images/image.png"
      globeImageUrl="/images/rabbit.jpeg"
      backgroundColor="#000011"
      pointsData={[]}
      atmosphereColor="lightskyblue"
      atmosphereAltitude={0.15}
      onGlobeClick={onClick}
    />
  );
}
