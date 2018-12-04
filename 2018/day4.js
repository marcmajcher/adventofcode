'use strict';

/* eslint-env node */

// const input = require('./day4_input');
const input = [
  '[1518-11-05 00:55] wakes up',
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
];

const shifts = input.map((e) => {
  const [, month, day, hour, min, text] = e.match(/^\[1518-(\d\d)-(\d\d) (\d\d):(\d\d)\] (.*)$/);
  let action = null;
  let id = null;
  if (text.includes('begins')) {
    [, id, action] = text.match(/^Guard #(\d+) (begin)s shift$/);
  }
  else if (text.includes('wakes')) {
    action = 'wake';
  }
  else if (text.includes('asleep')) {
    action = 'sleep';
  }
  return ({ month, day, hour, min, action, id });
}).sort((a, b) => {
  if (a.month === b.month) {
    if (a.day === b.day) {
      if (a.hour === b.hour) {
        return a.min - b.min;
      }
      return a.hour - b.hour;
    }
    return a.day - b.day;
  }
  return a.month - b.month;
});

// console.log(shifts.map(e => `${e.month}-${e.day} ${e.hour}:${e.min} ${e.id} ${e.action}`));

const sleep = {};
const minutes = {};
let currentId = null;
let sleepAt = null;

// log sleep minutes, assuming that the guard never falls asleep before midnight, 
// and the shift is never more than an hour

for (let i = 0; i < shifts.length; i++) {
  switch (shifts[i].action) {
    case 'begin':
      currentId = shifts[i].id;
      sleepAt = null;
      if (!sleep[currentId]) {
        sleep[currentId] = 0;
        minutes[currentId] = new Array(60).fill(0);
      }
      break;
    case 'sleep':
      sleepAt = parseInt(shifts[i].min, 10);
      break;
    case 'wake':
      sleep[currentId] += shifts[i].min - sleepAt;
      for (let min = sleepAt; min < shifts[i].min; min++) {
        minutes[currentId][min]++;
      }
      break;
    default:
      break;
  }
}

const sleepyId = Object.entries(sleep).sort((a, b) => b[1] - a[1])[0][0];
const sleepyTime = minutes[sleepyId].reduce((a, c) => Math.max(a, c), 0);
console.log(minutes[sleepyId].indexOf(sleepyTime) * parseInt(sleepyId, 10));
