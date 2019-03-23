module.exports = {

  ['make tiny planet']: (args) => {

    return `
      magick \
      convert \
      ${args.input} \
      -distort Arc 360 \
      -set filename:base "%[basename]" \
      "%[filename:base]-tinyplanet.jpg"
    `;

  },

};
