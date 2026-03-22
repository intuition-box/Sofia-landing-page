import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import PixelBlast from './index';

export default function ThemedPixelBlast(): JSX.Element {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }}>
      <PixelBlast
        variant="diamond"
        pixelSize={4}
        color={isDark ? "#333333" : "#9e9e9e"}
        patternScale={2.25}
        patternDensity={1}
        pixelSizeJitter={0}
        enableRipples={true}
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        speed={2.05}
        edgeFade={0.05}
        transparent
      />
    </div>
  );
}
