const magick = require('./lib/magick');
const validate = require('./lib/validate');

module.exports = (() => {

  class Fisheye {

    constructor({
      directory = '',
      image = undefined,
      name = '',
      view = '',
    } = {}) {

      this.directory = directory;
      this.image = image;
      this.name = name;
      this.view = view;

    }

    set directory(directory) {

      this._directory = directory;

    }

    get directory() {

      return this._directory;

    }

    set image(image) {

      this._image = image;

    }

    get image() {

      return this._image;

    }

    set view(view) {

      this._view = view;

    }

    get view() {

      return this._view;

    }

    set name(name) {

      this._name = name;

    }

    get name() {

      return this._name;

    }

    async create() {

      const {
        command,
        input,
        output,
      } = await validate({
        directory: this.directory,
        image: this.image,
        name: this.name,
        view: this.view,
      });

      const result = await magick(command, input, output);

      return {
        ... result,
        command,
        input,
        output,
      };

    }

  }

  return Fisheye;

})();
