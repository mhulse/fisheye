// https://eslint.org/docs/user-guide/configuring

module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      "no-console": "off",
      "prefer-const": ["error", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
      }]
    }
};
