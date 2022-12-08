import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders/';

export default function GlbCanvas() {
  const canvasRef = useRef(null);

  const main = (scene) => {
    // environment hdr 설정
    // scene.createDefaultEnvironment();
    // const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    //   './textures/environment.env',
    //   scene,
    // );
    // scene.environmentTexture = hdrTexture;

    const skybox = BABYLON.MeshBuilder.CreateBox(
      'skyBox',
      { size: 10000.0 },
      scene,
    );
    const skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      './textures/environment_autoshop.env',
      scene,
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    BABYLON.SceneLoader.ImportMesh(
      '',
      './assets/',
      '_Alien_Muscle_001_SD.glb',
      scene,
    );
  };

  const createScene = (scene, renderCanvas) => {
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      Math.PI / 5,
      Math.PI / 6,
      3,
      new BABYLON.Vector3(-8, 0, 0),
      scene,
    );

    // Universal Camera
    // const camera = new BABYLON.UniversalCamera(
    //   'Camera',
    //   new BABYLON.Vector3(0, 1.8, 5),
    //   scene,
    // );

    camera.setTarget(new BABYLON.Vector3(0, 1.7, 0));
    camera.attachControl(renderCanvas, true);

    const light = new BABYLON.HemisphericLight(
      'HemiLight',
      new BABYLON.Vector3(0, 1, 0),
      scene,
    );
    light.intensity = 20;

    return scene;
  };

  useEffect(() => {
    const renderCanvas = canvasRef.current;
    const engine = new BABYLON.Engine(renderCanvas);
    const scene = new BABYLON.Scene(engine);

    const sceneToRender = createScene(scene, renderCanvas);
    main(scene);

    scene.createDefaultLight();

    engine.runRenderLoop(() => {
      sceneToRender.render();
    });

    window.addEventListener('resize', function () {
      engine.resize();
    });
  }, []);

  return (
    <div>
      <canvas className="h-full w-full" id="renderCanvas" ref={canvasRef} />
    </div>
  );
}
