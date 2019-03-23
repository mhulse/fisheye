const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');

const util = {

  resolvePath: (target) => {

    return path.resolve(untildify(target));

  },

  pathExists: async (target, dir = false) => {

    // Check if path’s dir exists, regardless of file:
    target = (dir) ? path.dirname(target) : target;

    return await fs.pathExists(untildify(target));

  },

};

module.exports = util;
