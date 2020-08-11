// const i18n = require('i18next');
// const i18nextBackend = require('i18next-fs-backend');
// const { join } = require('path');
// const config = require('./app.config');

import i18n from 'i18next';
import i18nextBackend from 'i18next-node-fs-backend';
import { join } from 'path';
import isDev from 'electron-is-dev';
import config from './app.config';

const i18nextOptions = {
  fallbackLng: config.fallbackLng,
  lng: 'en',
  ns: 'translation',
  defaultNS: 'translation',
  backend: {
    // path where resources get loaded from
    loadPath: isDev
      ? join(__dirname, '../locales/{{lng}}/{{ns}}.json')
      : join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
    // path to post missing resources
    addPath: isDev
      ? join(__dirname, '../locales/{{lng}}/{{ns}}.missing.json')
      : join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
    // jsonIndent to use when storing json files
    jsonIndent: 2,
  },
  interpolation: {
    escapeValue: false,
  },
  saveMissing: true,
  whitelist: config.languages,
  react: {
    wait: false,
  },
};
i18n.use(i18nextBackend);

if (!i18n.isInitialized) {
  i18n.init(i18nextOptions);
}

export default i18n;
