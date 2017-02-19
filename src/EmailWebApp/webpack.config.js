/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
function buildConfig(env) {
  return require(`./config/${env}.js`)({ env });
}

module.exports = buildConfig;