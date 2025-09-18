import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import React from 'react';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Sofia Chronicles',
  tagline: 'Sofia',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://sofia.intuition.box',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Sofia', // Usually your GitHub org/user name.
  projectName: 'Sofia Chronicles', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/intuition-box/sofiachronicles/blob/main/blog/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Sofia Chronicles',
          blogSidebarTitle: 'Last Articles',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'Sofia Chronicles Logo',
        src: 'img/sofiaLogo.png',
      },
      items: [
        {
          to: '/blog',
          label: 'Sofia Chronicles',
          position: 'right',
        },
        {
          to: '/light-paper',
          label: 'Light Paper',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Social',
          items: [
            {
              html: `
                <a href="https://x.com/0xSofia3" target="_blank" rel="noreferrer noopener" aria-label="Follow us on X">
                  <img src="/img/social/x-icon.png" alt="X" width="24" height="24" />
                </a>
              `,
            },
            {
              html: `
                <a href="https://github.com/intuition-box/Sofia" target="_blank" rel="noreferrer noopener" aria-label="View on GitHub">
                  <img src="/img/social/github-icon.png" alt="GitHub" width="24" height="24" />
                </a>
              `,
            },
            {
              html: `
                <a href="https://discord.gg/39RP6h4WuH" target="_blank" rel="noreferrer noopener" aria-label="Join our Discord">
                  <img src="/img/social/discord-icon.png" alt="Discord" width="24" height="24" />
                </a>
              `,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sofia, Inc. Built with ♡`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
