import { SceneLoader, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders";
import React, { useEffect, useRef, useState } from "react";
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  Sphere,
} from "react-babylonjs";
import * as BABYLON from "babylonjs";

const scenes = [
  {
    id: 0,
    root: "./assets/",
    file: "avatar.glb",
  },
];

export default function GlbCanvas() {
  const [products, setProducts] = useState(scenes);
  const [selectRingItem, setSelectRingItem] = useState(0);
  const [numberRing, setRingNumber] = useState(0);
  // const loadPromise = (root, file, scene) => {
  //   return new Promise((res, rej) => {
  //     BABYLON.SceneLoader.LoadAssetContainer(root, file, scene, function (
  //       container
  //     ) {
  //       //   console.log(container.meshes)

  //       let root = new BABYLON.TransformNode();

  //       container.meshes.map((m) => {
  //         if (!m.parent) {
  //           m.parent = root;
  //         }
  //       });
  //       root.scaling = new BABYLON.Vector3(50, 50, 50);
  //       res(container);
  //     });
  //   });
  // };

  const canvasRef = useRef(null);

  const loadPromise = (root, file, scene) => {
    return new Promise((res, rej) => {
      BABYLON.SceneLoader.LoadAssetContainer(root, file, scene, (container) => {
        let root = new BABYLON.TransformNode();

        container.meshes.map((m) => {
          if (!m.parent) {
            m.parent = root;
          }
        });
        root.scaling = new BABYLON.Vector3(50, 50, 50);
        res(container);
      });
    });
  };

  const main = async (scene) => {
    SceneLoader.ImportMesh("", "./assets/", "avatar.glb", scene);

    // const assetContainers = [];

    // for (let i = 0; i < scenes.length; i++) {
    //   const asset = await loadPromise(scenes[i].root, scenes[i].file, scene);
    //   assetContainers.push(asset);
    // }

    const sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 1, segments: 32 },
      scene
    );

    sphere.position.x = -2;
  };

  const createScene = (scene, renderCanvas) => {
    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 4,
      150,
      BABYLON.Vector3.Zero(),
      scene
    );

    // let camera = new BABYLON.ArcRotateCamera(
    //   "Camera",
    //   -Math.PI / 2,
    //   Math.PI / 2,
    //   4,
    //   new BABYLON.Vector3(0, 0, 0),
    //   scene
    // );

    camera.lowerRadiusLimit = 4;
    camera.upperRadiusLimit = 6;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(renderCanvas, true);
    // Light
    let light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(100, 100, 0),
      scene
    );

    return scene;
  };

  useEffect(() => {
    const renderCanvas = canvasRef.current;
    const engine = new BABYLON.Engine(renderCanvas);
    const scene = new BABYLON.Scene(engine);

    let sceneToRender = createScene(scene, renderCanvas);
    main(scene);

    scene.createDefaultLight();

    engine.runRenderLoop(() => {
      sceneToRender.render();
    });

    window.addEventListener("resize", function () {
      engine.resize();
    });
  });

  return (
    <div className="">
      <canvas className="w-full h-screen" id="renderCanvas" ref={canvasRef} />
    </div>
    // <Engine>
    //   <Scene>
    //     <ArcRotateCamera
    //       name="camera1"
    //       target={Vector3.Zero()}
    //       alpha={Math.PI / 2}
    //       beta={Math.PI / 4}
    //       radius={8}
    //     />
    //     <HemisphericLight
    //       name="light1"
    //       intensity={0.7}
    //       direction={Vector3.Up()}
    //     />
    //     <SceneLoader />
    //   </Scene>
    // </Engine>
  );
}
