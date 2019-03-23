const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');

const util = {

  resolvePath: (target) => {

    return path.resolve(untildify(target));

  },

  pathExists: async (target) => {

    return await fs.pathExists(untildify(target));

  },

};

module.exports = util;
