import { EffectComposer, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function Effects() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Vignette
        offset={0.38}
        darkness={0.65}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
