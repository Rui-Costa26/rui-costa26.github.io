// Site-wide constants. To move to a custom domain, change `site` in astro.config.mjs only.
export const SITE = {
  name: 'Rui Costa',
  email: 'ruipgc26@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rui-costa-ios-dev/',
  github: 'https://github.com/Rui-Costa26',
  locality: 'Lousada',
  region: 'Porto',
  country: 'PT',
  legal: {
    fruidoku: 'https://rui-costa26.github.io/fruidoku-legal/',
    formly: 'https://rui-costa26.github.io/formly-legal/',
    formlyPrivacy: 'https://rui-costa26.github.io/formly-legal/privacy.html',
  },
} as const;
