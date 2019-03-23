const exec = require('await-exec');
const { commands, util } = require('./lib/index');

module.exports = class TinyPlanet {

  constructor(options = {}) {

    this._options = options;

    return this.init();

  }

  init() {

    const o = this._options;

    if ( ! ((typeof o.input === 'string') && (o.input.length > 0) && util.pathExists(o.input))) {
      throw new TypeError(`Expected \`input\` to be a string and resolve to a path that exists, got \`${o.input}\` (${typeof o.input})`);
    }

    if ( ! ((typeof o.output === 'string') && (o.output.length > 0) && util.pathExists(o.output))) {
      throw new TypeError(`Expected \`output\` to be a string and resolve to a path that exists, got \`${o.output}\` (${typeof o.output})`);
    }

    return this.make();

  };

  async make() {

    const o = this._options;

    const magick = await exec(
      commands['make tiny planet']({
        input: util.resolvePath(o.input),
        output: util.resolvePath(o.output),
      })
    );

    const stderr = magick.stderr.toString().trim();

    if (stderr) {
      throw new Error(stderr);
    } else {
      return magick.stdout.toString().trim();
    }

  };

};
