import exec from 'await-exec'
import utility from './utility.js'

export default (() => {
  const _exists = async () => {
    const check = await exec(`
      if command -v magick >/dev/null 2>&1; then
        echo true
      fi
    `)

    const isInstalled = check?.stdout?.toString().trim().toLowerCase() === 'true'

    if (!isInstalled) {
      throw new TypeError('System dependency ImageMagick (magick) not installed')
    }
  }

  const _command = async view => {
    const allowed = ['tiny-planet', 'big-sky']

    if (!(typeof view === 'string' && allowed.includes(view))) {
      // set random as default option:
      view = allowed[Math.floor(Math.random() * allowed.length)]
    }

    return view
  }

  const _input = async image => {
    image = utility.resolvePath(image)

    if (
      !(
        typeof image === 'string' &&
        image.length > 0 &&
        (await utility.pathExists(image))
      )
    ) {
      throw new TypeError(
        `Expected \`image\` to be a string and resolve to a path that exists, got \`${image}\` (${typeof image})`
      )
    }

    return image
  }

  const _name = (input, name) => {
    if (!(typeof name === 'string' && name.length)) {
      name = utility.getNameParts(input).name
    }

    return name
  }

  const _output = async (command, input, name, directory) => {
    // use user-defined output or use input’s directory:
    directory = utility.resolvePath(
      directory ? directory : utility.dirName(input)
    )

    if (
      !(
        typeof directory === 'string' &&
        directory.length > 0 &&
        !utility.isFile(directory) &&
        (await utility.pathExists(directory))
      )
    ) {
      throw new TypeError(
        `Expected \`output\` to be a string and resolve to a path that exists, got \`${directory}\` (${typeof directory})`
      )
    }

    return `${utility.joinPaths(directory, name)}_${command}.jpg`
  }

  return async (options = {}) => {
    await _exists()

    const command = await _command(options.view)
    const input = await _input(options.image)
    const name = await _name(input, options.name)
    const output = await _output(command, input, name, options.directory)

    return {
      command,
      input,
      output,
    }
  }
})()
