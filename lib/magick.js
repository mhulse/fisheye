const exec = require('await-exec');

module.exports = (() => {

  const _commands = {

    ['big-sky']: args => {

      const defaults = {
        rotate: 0,
      };

      return _convert({
        ... defaults,
        ... args,
       });

    },

    ['tiny-planet']: args => {

      const defaults = {
        rotate: 180,
      };

      return _convert({
        ... defaults,
        ... args,
      });

    },

  };

  const _convert = args => {

    // To have IM use input name:
    // -set filename:base "%[basename]" "%[filename:base]-fisheye.jpg"

    // $ convert -list virtual-pixel
    // Background
    // Black
    // CheckerTile
    // Dither
    // Edge
    // Gray
    // HorizontalTile
    // HorizontalTileEdge
    // Mirror
    // None
    // Random
    // Tile
    // Transparent
    // VerticalTile
    // VerticalTileEdge
    // White

    return `
      magick \
        convert \
        ${args.ddd} \
        -virtual-pixel mirror \
        -background black \
        -roll '+50%+0%' \
        -rotate ${args.rotate} \
        +distort polar 0 \
        ${args.output}
    `;

  };

  return async (command, input, output) => {

    try {

      await exec(
        _commands[command]({
          input: input,
          output: output,
        })
      )

      return {
        code: 0,
      }

    } catch (err) {

      throw err;

    }

  };

})();
