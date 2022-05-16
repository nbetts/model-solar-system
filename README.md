# Model Solar System

A model solar system built with Three.js, React and React Three Fiber.

## Running the app

```bash
npm install
npm run dev
```

## To do

- host on GitHub Pages
- fix body labels not sitting above body when actual scale is enabled
- fix camera / logarithmic buffer (not currently working) <https://threejs.org/examples/#webgl_camera_logarithmicdepthbuffer>
- add lens flare: <https://threejs.org/examples/#webgl_lensflares>
- experiment with orbit line rendering and add opacity: <https://threejs.org/examples/#webgl_lines_fat>
- selective bloom for bodies: <https://threejs.org/examples/#webgl_postprocessing_unreal_bloom_selective>
- recursive body type and rendering (to allow support for moons and satellites)
- add ring geometry for body ring such as for Saturn
- add adaptive DPR (performance scaling): <https://github.com/pmndrs/drei#adaptivedpr>
