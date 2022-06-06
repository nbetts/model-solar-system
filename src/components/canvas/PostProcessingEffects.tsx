import { EffectComposer, GodRays } from "@react-three/postprocessing";
import store from "src/data/store";

const PostProcessingEffects = () => {
  const quality = store.useState((s) => s.userSettings.quality);
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const { lightSourceMeshRef } = store.useState((s) => s.componentRefs);

  return (
    <EffectComposer>
      {quality === "High" && lightSourceMeshRef?.current ? (
        <GodRays
          blur={3}
          decay={0.9}
          samples={actualScale ? 30 : 120}
          density={0.98}
          sun={lightSourceMeshRef.current}
        />
      ) : (
        <></>
      )}
    </EffectComposer>
  );
};

export default PostProcessingEffects;
