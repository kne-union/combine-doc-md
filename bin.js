#!/usr/bin/env node
const combine = require('./index');

const componentsPath = process.env.COMPONENTS_PATH;
const docReadmeName = process.env.DOC_README_NAME;
const split = process.env.SPLIT;

const options = {};

if (componentsPath) {
  options.componentsPath = componentsPath;
}

if (docReadmeName) {
  options.docReadmeName = docReadmeName;
}

if (split) {
  options.split = split;
}

combine(options).catch((e) => {
  throw e;
});
