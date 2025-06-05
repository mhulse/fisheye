import exec from 'await-exec'

export default (() => {
  // to have ImageMagick use the input name in output:
  // -set filename:base "%[basename]" "%[filename:base]-fisheye.jpg"

  // list of available virtual-pixel methods (run `convert -list virtual-pixel`)
  // - Background
  // - Black
  // - CheckerTile
  // - Dither
  // - Edge
  // - Gray
  // - HorizontalTile
  // - HorizontalTileEdge
  // - Mirror
  // - None
  // - Random
  // - Tile
  // - Transparent
  // - VerticalTile
  // - VerticalTileEdge
  // - White

  const _convert = args => {
    return `
      magick \
        convert \
        "${args.input}" \
        -virtual-pixel mirror \
        -background black \
        -roll '+50%+0%' \
        -rotate ${args.rotate} \
        +distort polar 0 \
        "${args.output}"
    `
  }

  const _commands = {
    ['big-sky']: args => {
      const defaults = {
        rotate: 0,
      }

      return _convert({
        ...defaults,
        ...args,
      })
    },

    ['tiny-planet']: args => {
      const defaults = {
        rotate: 180,
      }

      return _convert({
        ...defaults,
        ...args,
      })
    },
  }

  return async (command, input, output) => {
    try {
      await exec(_commands[command]({ input, output }))
      return { code: 0 }
    } catch (err) {
      throw err
    }
  }
})()
