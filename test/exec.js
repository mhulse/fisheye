const exec = require('await-exec');

const { commands } = require('../lib/index');

(async () => {

  try {

    const check = await exec(
      commands['check for system dep']('exiftool')
    );

    console.log(check.stdout.toString().trim());

  } catch(err) {

    console.error(err);

  }

})();

