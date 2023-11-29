const script = require('../package.json').scripts['test:teardown'];
const { execSync } = require('child_process');
module.exports = function () {
  execSync(script);
};
