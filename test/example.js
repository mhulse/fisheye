const TinyPlanet = require('../index');

const options = {
  input: './test/AF1QipMspd7xEt_zPak1U5R3z250U9tOLpPy_1L6aNsA.jpg',
  output: './test',
};

(async () => {

  console.log('before');

  const planet = await new TinyPlanet(options);

  console.log(planet);

  console.log('after');

})();


