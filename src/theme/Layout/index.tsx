import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import CardNav from '@site/src/components/CardNav';
import PixelBlast from '@site/src/components/PixelBlast';

type Props = WrapperProps<typeof LayoutType>;

export default function Layout(props: Props): JSX.Element {
  const menuItems = [
    {
      label: "About",
      bgColor: "#00020e",
      textColor: "#fff",
      links: [
        { label: "Manifesto", href: "/manifesto", ariaLabel: "Read Manifesto" },
        { label: "Litepaper", href: "/docs/litepaper/introduction", ariaLabel: "Read Litepaper" }
      ]
    },
    {
      label: "Resources",
      bgColor: "#0e0e1a",
      textColor: "#fff",
      links: [
        { label: "Sofia Chronicles", href: "/blog", ariaLabel: "Sofia Chronicles" },
        { label: "GitHub", href: "https://github.com/intuition-box/Sofia", ariaLabel: "View on GitHub" }
      ]
    },
    {
      label: "Social",
      bgColor: "#1d1e2f",
      textColor: "#fff",
      links: [
        { label: "X", href: "https://x.com/0xSofia3", ariaLabel: "Follow us on X" },
        { label: "Discord", href: "https://discord.gg/39RP6h4WuH", ariaLabel: "Join our Discord" }
      ]
    }
  ];

  return (
    <>
      {/* CardNav Menu - Global */}
      <CardNav
        logo="/img/sofiaLogo.png"
        logoAlt="Sofia Logo"
        items={menuItems}
        baseColor="#1a1a1a"
        menuColor="#fff"
        buttonBgColor="#333"
        buttonTextColor="#fff"
        ease="circ.out"
      />

      {/* PixelBlast Background - Global */}
      <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: 0 }}>
        <PixelBlast
          variant="diamond"
          pixelSize={4}
          color="#9e9e9e"
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

      {/* Original Layout with content */}
      <OriginalLayout {...props} />
    </>
  );
}
