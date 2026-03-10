import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'What is Sofia?',
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'core-concepts',
        'features',
        'gamification',
        'ai-features',
        'resonance',
        'social',
        'known-issues',
      ],
    },
    {
      type: 'category',
      label: 'Litepaper',
      items: [
        'litepaper/introduction',
        'litepaper/network',
        'litepaper/subscription',
        'litepaper/dao',
        'litepaper/features',
        'litepaper/privacy',
        'litepaper/why-unique',
        'litepaper/audience',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
      ],
    },
    {
      type: 'category',
      label: 'Ecosystem',
      items: [
        'ecosystem/phala',
        'ecosystem/gaianet',
        'ecosystem/mastra',
        'ecosystem/intuition',
      ],
    },
  ],
};

export default sidebars;
