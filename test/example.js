const Fisheye = require('../index');

(async () => {

  console.log('before');

  const fisheye = new Fisheye({
    image: './input.jpg',
    directory: './test',
    name: 'output',
  });

  try {

    fisheye.view = 'tiny-planet';

    const result = await fisheye.create();

    console.log(result);

  } catch (err) {

    console.error(err);

  }

  try {

    fisheye.view = 'big-sky';

    const result = await fisheye.create();

    console.log(result);

  } catch (err) {

    console.error(err);

  }

  try {

    fisheye.view = 'big-sky';
    fisheye.name = '';
    fisheye.directory = '~/Desktop/';

    const result = await fisheye.create();

    console.log(result);

  } catch (err) {

    console.error(err);

  }

  console.log('after');

})();
