<big><h1 align="center">sort-obj-array</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/sort-obj-array">
    <img src="https://img.shields.io/npm/v/sort-obj-array.svg" alt="NPM Version">
  </a>

  <a href="http://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/npm/l/sort-obj-array.svg" alt="License">
  </a>

  <a href="https://github.com/ardent-labs/sort-obj-array/issues">
    <img src="https://img.shields.io/github/issues/ardent-labs/sort-obj-array.svg" alt="Github Issues">
  </a>
</p>

<p align="center"><big>
Sort an array of objects using an intuitive object syntax
</big></p>


## Features
  - Stable sorting
  - Nested sorting
  - No dependencies

## Install

```sh
npm install sort-obj-array
```

## Usage

```javascript
import sort from 'sort-obj-array';

const accounts = [
  { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
  { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
];

sort(accounts, {
  meta: {
    id: 1
  }
});

/* Returns:
[
  { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
  { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
]
*/

sort(accounts, {
  type: -1,
  meta: {
    id: 2
  }
});

/* Returns:
[
  { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
  { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
  { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
]
*/

```

## License

- **MIT** : http://opensource.org/licenses/MIT

## Contributing

Contributions are highly welcome and even encouraged!
