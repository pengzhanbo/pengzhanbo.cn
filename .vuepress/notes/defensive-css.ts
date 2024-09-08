import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  link: '/defensive-css/',
  dir: '防御性CSS',
  sidebar: [
    {
      text: '防御性 CSS',
      link:'/defensive-css/',
      items: [
        'flex-box-wrapping',
        'image-distortion',
        'long-content',
        'component-spacing',
        'auto-fit-fill',
        'background-repeat',
        'grid-fixed-values',
        'variable-fallback',
        'fixed-sizes',
        'minimum-content-size-in-flexbox',
        'minimum-content-size-in-grid',
        'grouping-vendor-selector',
        'image-maximum-width',
        'sticky-with-grid',
        'scroll-chaining',
        'scroll-gutter',
        'scrollbar-on-demand',
        'using-space-between',
        'text-over-image',
        'vertical-media-queries',
        'accidental-hover-on-mobile',
        'image-inner-border',
        'default-flexbox-stretching',
        'input-zoom-on-ios-safari',
        'button-minimum-width',
      ],
    },
  ],
})
