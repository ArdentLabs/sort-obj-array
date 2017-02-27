import test from 'ava';
import 'babel-core/register';

import { fromJS } from 'immutable';
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
  deeperEqual(t, sort(fromJS(schools)), fromJS(schools));
});

test('Undefined argument - array', (t) => {
  deeperEqual(t, sort(_, { name: 1 }), []);
});

test('Accend string sort', (t) => {
  let expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  deeperEqual(t, sort(schools, { name: 1 }), expected);
  deeperEqual(t, sort(fromJS(schools), { name: 1 }), fromJS(expected));

  expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  deeperEqual(t, sort(schools, (a, b) => a.name.localeCompare(b.name)), expected);
  deeperEqual(t, sort(fromJS(schools), (a, b) => a.get('name').localeCompare(b.get('name'))), fromJS(expected));

  expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  deeperEqual(t, sort(schools, inverse({ name: -1 })), expected);
  deeperEqual(t, sort(fromJS(schools), inverse({ name: -1 })), fromJS(expected));
});

test('Descend string sort', (t) => {
  let expected = [
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, { name: -1 }), expected);
  deeperEqual(t, sort(fromJS(schools), { name: -1 }), fromJS(expected));

  expected = [
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, (a, b) => b.name.localeCompare(a.name)), expected);
  deeperEqual(t, sort(fromJS(schools), (a, b) => b.get('name').localeCompare(a.get('name'))), fromJS(expected));

  expected = [
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, inverse({ name: 1 })), expected);
  deeperEqual(t, sort(fromJS(schools), inverse({ name: 1 })), fromJS(expected));
});

test('Accend number sort', (t) => {
  let expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
  ];

  deeperEqual(t, sort(schools, { population: 1 }), expected);
  deeperEqual(t, sort(fromJS(schools), { population: 1 }), fromJS(expected));

  expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
  ];

  deeperEqual(t, sort(schools, (a, b) => a.population - b.population), expected);
  deeperEqual(t, sort(fromJS(schools), (a, b) => a.get('population') - b.get('population')), fromJS(expected));

  expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
  ];

  deeperEqual(t, sort(schools, inverse({ population: -1 })), expected);
  deeperEqual(t, sort(fromJS(schools), inverse({ population: -1 })), fromJS(expected));
});

test('Descend number sort', (t) => {
  let expected = [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, { population: -1 }), expected);
  deeperEqual(t, sort(fromJS(schools), { population: -1 }), fromJS(expected));

  expected = [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, (a, b) => b.population - a.population), expected);
  deeperEqual(t, sort(fromJS(schools), (a, b) => b.get('population') - a.get('population')), fromJS(expected));

  expected = [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, inverse({ population: 1 })), expected);
  deeperEqual(t, sort(fromJS(schools), inverse({ population: 1 })), fromJS(expected));
});

test('Accend boolean sort', (t) => {
  let expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  deeperEqual(t, sort(schools, { active: 1 }), expected);
  deeperEqual(t, sort(fromJS(schools), { active: 1 }), fromJS(expected));

  expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  const compare = (a, b) => String(a.active).localeCompare(String(b.active));
  const immutableCompare = (a, b) => String(a.get('active')).localeCompare(String(b.get('active')));

  deeperEqual(t, sort(schools, compare), expected);
  deeperEqual(t, sort(fromJS(schools), immutableCompare), fromJS(expected));

  expected = [
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  deeperEqual(t, sort(schools, inverse({ active: -1 })), expected);
  deeperEqual(t, sort(fromJS(schools), inverse({ active: -1 })), fromJS(expected));
});

test('Descend boolean sort', (t) => {
  let expected = [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, { active: -1 }), expected);
  deeperEqual(t, sort(fromJS(schools), { active: -1 }), fromJS(expected));

  expected = [
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  const compare = (a, b) => String(b.name).localeCompare(String(a.name));
  const immutableCompare = (a, b) => String(b.get('name')).localeCompare(String(a.get('name')));

  deeperEqual(t, sort(schools, compare), expected);
  deeperEqual(t, sort(fromJS(schools), immutableCompare), fromJS(expected));

  expected = [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
  ];

  deeperEqual(t, sort(schools, inverse({ population: 1 })), expected);
  deeperEqual(t, sort(fromJS(schools), inverse({ population: 1 })), fromJS(expected));
});

test('Multiple sorting operations', (t) => {
  let expected = [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  deeperEqual(t, sort(schools, { type: 1, population: -2 }), expected);
  deeperEqual(t, sort(fromJS(schools), { type: 1, population: -2 }), fromJS(expected));

  expected = [
    { name: 'UCI', type: 'College', population: 100000, active: true },
    { name: 'MIT', type: 'College', population: 0, active: false },
    { name: 'University High School', type: 'High School', population: 5000, active: true },
  ];

  deeperEqual(t, sort(schools, inverse({ type: -1, population: 2 })), expected);
  deeperEqual(t, sort(fromJS(schools), inverse({ type: -1, population: 2 })), fromJS(expected));
});

test('Single nested sort', (t) => {
  let expected = [
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
  ];

  deeperEqual(t, sort(accounts, { meta: { id: 1 } }), expected);
  deeperEqual(t, sort(fromJS(accounts), { meta: { id: 1 } }), fromJS(expected));

  expected = [
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
  ];

  deeperEqual(t, sort(accounts, inverse({ meta: { id: -1 } })), expected);
  deeperEqual(t, sort(fromJS(accounts), inverse({ meta: { id: -1 } })), fromJS(expected));
});

test('Multiple nested sorts', (t) => {
  let expected = [
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  ];

  deeperEqual(t, sort(accounts, { meta: { id: 2 }, type: -1 }), expected);
  deeperEqual(t, sort(fromJS(accounts), { meta: { id: 2 }, type: -1 }), fromJS(expected));

  expected = [
    { meta: { lastLogin: { day: 4 }, id: 7 }, type: 'user' },
    { meta: { lastLogin: { day: 2 }, id: 8 }, type: 'user' },
    { meta: { lastLogin: { day: 6 }, id: 1 }, type: 'admin' },
  ];

  deeperEqual(t, sort(accounts, inverse({ meta: { id: -2 }, type: 1 })), expected);
  deeperEqual(t, sort(fromJS(accounts), inverse({ meta: { id: -2 }, type: 1 })), fromJS(expected));
});
