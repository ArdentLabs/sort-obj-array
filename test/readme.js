import test from 'ava';
import 'babel-core/register';

import sort, { inverse } from '../src/lib/';


function deeperEqual(t, a, b) {
  t.is(a.length, b.length, 'Array lengths must be the same');

  for (let i = 0; i < a.length; i++) {
    t.deepEqual(a[i], b[i], 'Every object must be the same');
  }
}

const accounts = [
  { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
  { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
];

test('First example', (t) => {
  deeperEqual(t, sort(accounts, { meta: { id: 1 } }), [
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
  ]);
});

test('Second example', (t) => {
  const expected = [
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  ];

  deeperEqual(t, sort(accounts, inverse({ meta: { id: 1 } })), expected);
  deeperEqual(t, sort(accounts, { meta: { id: -1 } }), expected);
});


test('Third example', (t) => {
  deeperEqual(t, sort(accounts, { type: -1, meta: { id: 2 } }), [
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  ]);
});
