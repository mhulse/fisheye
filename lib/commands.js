module.exports = {

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
