import test from 'ava';
import 'babel-core/register';

import sort, { inverse } from '../src/lib/';


const _ = undefined;

function deeperEqual(t, a, b) {
  t.is(a.length, b.length, 'Array lengths must be the same');

  for (let i = 0; i < a.length; i++) {
    t.deepEqual(a[i], b[i], 'Every object must be the same');
  }
}

const schools = [
  { name: 'University High School', type: 'High School', population: 5000, active: true },
  { name: 'UCI', type: 'College', population: 100000, active: true },
  { name: 'MIT', type: 'College', population: 0, active: false },
];

const accounts = [
  { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
  { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
  { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
];


test('Undefined arguments', (t) => {
  t.deepEqual(sort(), [], 'Returns an empty array');
});

test('Undefined argument - sortBy', (t) => {
  deeperEqual(t, sort(schools), schools);
});

test('Undefined argument - array', (t) => {
  deeperEqual(t, sort(_, { name: 1 }), []);
});

test('Inverse sortBy', (t) => {
  deeperEqual(t, inverse({ name: 1 }), { name: -1 });
  deeperEqual(t, inverse({ id: -2 }), { id: 2 });
  deeperEqual(t, inverse({ student: { name: 1 }, id: -2 }), { student: { name: -1 }, id: 2 });
});

test('Accend string sort', (t) => {
  deeperEqual(t, sort(schools, { name: 1 }), [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ]);
});

test('Descend string sort', (t) => {
  deeperEqual(t, sort(schools, { name: -1 }), [
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ]);
});

test('Accend number sort', (t) => {
  deeperEqual(t, sort(schools, { population: 1 }), [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
  ]);
});

test('Descend number sort', (t) => {
  deeperEqual(t, sort(schools, { population: -1 }), [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ]);
});

test('Accend boolean sort', (t) => {
  deeperEqual(t, sort(schools, { population: 1 }), [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
  ]);
});

test('Descend boolean sort', (t) => {
  deeperEqual(t, sort(schools, { population: -1 }), [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ]);
});

test('Multiple sorting operations', (t) => {
  deeperEqual(t, sort(schools, { type: 1, population: -2 }), [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ]);
});

test('Single nested sort', (t) => {
  deeperEqual(t, sort(accounts, { meta: { id: 1 } }), [
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
  ]);
});

test('Multiple nested sorts', (t) => {
  deeperEqual(t, sort(accounts, { meta: { id: 2 }, type: -1 }), [
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  ]);
});
