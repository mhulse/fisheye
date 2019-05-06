const fs = require('fs-extra');
const path = require('path');
const untildify = require('untildify');

module.exports = (() => {

  return {

    resolvePath: target => {

      let result;

      try {

        result = path.resolve(untildify(target));

      } catch (err) {}

      return result;

    },

    pathExists: async target => {

      let result = false;

      try {

        result = await fs.pathExists(target);

      } catch (err) {}

      return result;

    },

    getNameParts: (file, parseQueryString = false) => {

      let result;

      try {

        result = path.parse(file, parseQueryString);

        // path.parse('/home/user/dir/file.txt');
        // Returns:
        // { root: '/',
        //   dir: '/home/user/dir',
        //   base: 'file.txt',
        //   ext: '.txt',
        //   name: 'file' }

      } catch (err) {}

      return result; // { … } or undefined.

    },

    dirName: file => {

      return path.dirname(file);

    },

    joinPaths: (... paths) => {

      return path.join(... paths);

    },

    isFile: file => {

      return ( !! path.extname(file));

    },

  };

})();
