import { EffectComposer, GodRays, SelectiveBloom } from "@react-three/postprocessing";
import { RefObject } from "react";
import store from "src/data/store";
import { Mesh } from "three/src/objects/Mesh";

const PostProcessingEffects = () => {
  const enableEffects = store.useState((s) => s.userSettings.enableEffects);
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const { lightRef, godRaysMeshRef, bodyMeshRefs } = store.useState((s) => s.componentRefs);

  if (!enableEffects) {
    return null;
  }

  return (
    <EffectComposer>
      {godRaysMeshRef?.current ? (
        <GodRays blur={3} decay={0.9} samples={actualScale ? 30 : 120} density={0.96} sun={godRaysMeshRef.current} />
      ) : (
        <></>
      )}
      {/* {lightRef?.current && bodyMeshRefs && bodyMeshRefs?.length > 0 && bodyMeshRefs[0]?.current ? (
        <SelectiveBloom
          lights={[lightRef]}
          // selection={[bodyMeshRefs]}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        />
      ) : (
        <></>
      )} */}
    </EffectComposer>
  );
};

export default PostProcessingEffects;
