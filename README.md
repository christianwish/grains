# grains

A tiny template engine.

## Install

`$ npm install grains --save-dev`


### Usage

```js
var grains = require('grains'),
    tmpVars = {
        name: 'Tony',
        lastName: 'Stark',
        now: function () {
            return Date.now();
        }
    },
    myTemplate = "Hallo my name is {{name}} {{lastName}}. And the current timestamp is {{now}}",
    result = grains(myTemplate, tmpVars);

console.log(result);
// output like:
// -> "Hallo my name is Tony Stark. And the current timestamp is 1458432580960"

```

### Nesting
```js
var grains = require('grains'),
    tmpVars = {
        name: 'Tony',
        lastName: 'Stark',
        upper: function (parameter) {
            if (typeof parameter === 'string') {
                return parameter.toUpperCase();
            }
        }
    },
    myTemplate = "Hallo my name is {{name}} {{upper(lastName)}}.",
    result = grains(myTemplate, tmpVars);

console.log(result);
// output like:
// -> "Hallo my name is Tony STARK."
```

```js
var grains = require('./grains'),
    tmpVars = {
        name: 'Tony',
				lastName: 'Stark',
        upper: function (parameter) {
            if (typeof parameter === 'string') {
                return parameter.toUpperCase();
            }
        },
        reverse: function (parameter) {
        		return parameter.split('').reverse().join('');
        }
    },
    myTemplate = "Hallo my name is {{name}} {{reverse(upper(lastName))}}.",
    result = grains(myTemplate, tmpVars);

console.log(result);
// output like:
// -> "Hallo my name is Tony KRATS."
```

### Error callback
```js
var grains = require('grains'),
    tmpVars = {
        name: 'Tony'
    },
    errCallback = function (tmpVar) {
        console.log('template Var ' + tmpVar + ' is not defined!');
    },
    myTemplate = "Hallo my name is {{name}} {{lastName}}.",
    result = grains(myTemplate, tmpVars, errCallback);

console.log(result);
// output like:
// -> "template Var lastName is not defined!"
// -> "Hallo my name is Tony ."
```


___

### Author

* [Christian Heyn](https://github.com/christianheyn)
