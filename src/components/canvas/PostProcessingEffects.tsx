import store from "src/data/store";

const PostProcessingEffects = () => {
  const enableGodRays = store.useState((s) => s.userSettings.enableGodRays);

  return null;

  {
    /* <EffectComposer>
    {enableGodRays && bodyRefs[0].current ? (
      <GodRays
        blur={3}
        decay={0.92}
        density={0.96}
        // sun={new Mesh(bodyRefs[0].current.geometry, bodyRefs[0].current.material)}
        sun={bodyRefs[0].current}
      />
    ) : (
      <></>
    )}
    <SelectiveBloom selection={[bodyRefs]} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
  </EffectComposer> */
  }
};

export default PostProcessingEffects;
