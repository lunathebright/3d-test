import { SceneLoader, Vector3 } from '@babylonjs/core';
import '@babylonjs/loaders';
import React, { useEffect, useRef, useState } from 'react';
import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  Sphere,
} from 'react-babylonjs';
import * as BABYLON from 'babylonjs';

const scenes = [
  {
    id: 0,
    root: './assets/',
    file: 'avatar.glb',
  },
];

export default function GlbCanvas() {
  const [products, setProducts] = useState(scenes);
  const [selectRingItem, setSelectRingItem] = useState(0);
  const [numberRing, setRingNumber] = useState(0);

  const canvasRef = useRef(null);

  const onScroll = () => {
    console.log('dd');
  };

  const main = async (scene) => {
    // environment hdr 설정
    // scene.createDefaultEnvironment();
    // const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    //   "/textures/environment.env",
    //   scene
    // );
    // scene.environmentTexture = hdrTexture;

    const photoDome = new BABYLON.PhotoDome(
      'photo dome',
      './textures/autoshop_01_1k.hdr',
      {},
      scene,
    );
    // scene.createDefaultEnvironment({
    //   environmentTexture: "/textures/environment.env",
    // });

    // background color
    // scene.clearColor = new BABYLON.Color3(0.3, 0.2, 0.3);

    // SceneLoader.ImportMesh("", "./assets/", "SpaceModel_Myhome.glb", scene);
    SceneLoader.ImportMesh('', './assets/', '_Alien_Muscle_001_SD.glb', scene);
    // SceneLoader.ImportMesh("", "./assets/", "_M_Defeat_Idle_1.glb", scene);

    // const sphere = BABYLON.MeshBuilder.CreateSphere(
    //   "sphere",
    //   { diameter: 1, segments: 32 },
    //   scene
    // );

    // sphere.position.x = -2;
    // sphere.position.y = 1;
  };

  const createScene = (scene, renderCanvas) => {
    const alpha = Math.PI / 8;
    const beta = Math.PI / 5;
    const radius = 3;
    const target = new BABYLON.Vector3(-8, 0, 0);

    // Universal Camera
    // const camera = new BABYLON.UniversalCamera(
    //   "Camera",
    //   new BABYLON.Vector3(0, 1.8, 5),
    //   scene
    // );

    // ArcRotate Camera
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      alpha,
      beta,
      radius,
      target,
      scene,
    );

    // const camera = new BABYLON.ArcRotateCamera(
    //   "Camera",
    //   -Math.PI / 2,
    //   Math.PI / 2,
    //   4,
    //   new BABYLON.Vector3.Zero(),
    //   scene
    // );

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(renderCanvas, true);

    // Light
    // let light = new BABYLON.HemisphericLight(
    //   "light",
    //   new BABYLON.Vector3(0, 1, 0),
    //   scene
    // );

    const light = new BABYLON.HemisphericLight(
      'HemiLight',
      new BABYLON.Vector3(0, 0, 1),
      scene,
    );

    const light2 = new BABYLON.HemisphericLight(
      'HemiLight',
      new BABYLON.Vector3(0, 0, -1),
      scene,
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

    window.addEventListener('resize', function () {
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
