module.exports = {

  ['check for system dep']: (dep) => {

    // Will return string `true` in object `stdout` key, or empty string otherwise:
    return `
      if [ ! -z "$(which ${dep})" ]; then
        echo true
      fi
    `;

  },

  ['make tiny planet']: (args) => {

    // To have IM use input name:
    // -set filename:base "%[basename]" "%[filename:base]-tinyplanet.jpg"

    return `
      magick \
      convert \
      ${args.input} \
      -distort Arc 360 \
      ${args.output}
    `;

  },

};
