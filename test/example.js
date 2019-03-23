const TinyPlanet = require('../index');

const options = {};

(async () => {

  options.input = './test/AF1QipMspd7xEt_zPak1U5R3z250U9tOLpPy_1L6aNsA.jpg';
  options.output = options.input.replace('.jpg', '-tinyplanet.jpg');

  console.log('before');

  try {

    const planet = await new TinyPlanet(options);
    console.log(planet);

  } catch(err) {

    console.error(err);

  }

  console.log('after');

})();


