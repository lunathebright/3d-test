import { Color3, Vector3 } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Box,
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  Sphere,
} from "react-babylonjs";

export default function BabylonCanvas() {
  return (
    <Engine canvasId="babylon-canvas">
      <Scene>
        {/* <FreeCamera
          name="camera1"
          position={new Vector3(0, 5, -15)}
          target={Vector3.Zero()}
        /> */}
        <ArcRotateCamera
          name="arcRotateCamera"
          alpha={Math.PI / 2}
          beta={Math.PI / 4}
          radius={8}
          target={Vector3.Zero()}
        />
        <HemisphericLight
          name="hemisphericLight"
          intensity={1}
          direction={Vector3.Up()}
        />
        <Sphere
          name="sphere"
          diameter={2}
          poxition={new Vector3(-2, 0, 0)}
          segments={2}
        />
        <Box
          name="name"
          diffuseColor="#df5f5f"
          specularColor={Color3.Black()}
        />
      </Scene>
    </Engine>
  );
}
