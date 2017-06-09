/**
 * @Author: Christian Schmitt <crschmit>
 * @Date:   2017-06-08T09:56:49-05:00
 * @Email:  crschmit@gmail.com
 * @Filename: filter-map.js
 * @Last modified by:   crschmit
 * @Last modified time: 2017-06-08T11:42:09-05:00
 */

const options = {
  classrooms: ['memphis', 'jacksonville', 'phoenix', 'ohio'],
  instructors: ['peter', 'michael', 'yolanda'],
  sessions: ['spring', 'summer', 'fall', 'winter'],
  activities: ['lecture', 'quiz', 'assignment', 'assessment']
}

const chooseOne = (opts) =>
  opts[Math.floor(Math.random() * opts.length)]

// function * choose (opts, n) {
//   let i = 0
//   while (i++ < n) {
//     yield chooseOne(opts)
//   }
// }
const choose = options =>
  function * (n) {
    let i = 0
    while (i++ < n) {
      yield chooseOne(options)
    }
  }

const classrooms = choose(options.classrooms)
const instructors = choose(options.instructors)
const sessions = choose(options.sessions)
const activities = choose(options.activities)

// const data = () => [{
//   classroom: 'memphis',
//   lead: 'peter',
//   sessions: [{
//     session: 'spring',
//     activities: [
//       'lecture',
//       'quiz',
//       'assignment'
//     ]
//   }]
// }]

export const data = () =>
  [...classrooms(10)]
    .map(classroom => ({
      classroom,
      lead: [...instructors(1)][0],
      sessions:
        [...sessions(10)]
          .map(session => ({
            session,
            activities: [...activities(10)]
          }))
    }))

const input = {
  classrooms: ['memphis'],
  instructors: ['peter'],
  session: [],
  activities: []
}

// string -> classroom -> boolean
export const classroomPredicate =
  name => ({ classroom }) => name === classroom

export const instructorPredicate =
  name => ({ lead }) => name === lead

export const sessionPredicate =
  name => ({ sessions }) =>
    sessions.some(({ session }) => name === session)

export const activityPredicate =
  name => ({ sessions }) =>
    sessions.some(({ activities }) =>
                    activities.some(activity => activity === name))
const predicateInput = {
  classrooms: input.classrooms.map(classroomPredicate)
}

// (classroom -> boolean)[] -> classroom -> boolean
const arrayFilterOr =
  arr => (arr.length <= 0)
    ? classroom => true
    : classroom => arr.some(p => p(classroom))

// fork: (h: (b X c) -> d) -> ((f: a -> b) X (g: a -> c)) -> a -> d
const fork = h => (f, g) => a => h(f(a), g(a))

// or: (boolean, boolean) -> boolean
const or = (a, b) => a || b

// fork(or): (p: a -> boolean, q: a -> boolean) -> a -> boolean
const arrayFilterOr =
  arr => (arr.length <= 0)
    ? classroom => true
    : arr.reduce(fork(or))

const and = (a, b) => a && b

const arrayFilter =
  combinator =>
    arr => (arr.length <= 0)
      ? classroom => true
      : arr.reduce(fork(combinator))

// input -> classroom -> boolean
const inputFilter =
  ({ classrooms, instructors, sessions, activities }) =>
    arrayFilter(and)([
      classrooms.map(classroomPredicate),
      instructors.map(instructorPredicate),
      sessions.map(sessionPredicate),
      activities.map(activityPredicate)
    ]).map(arrayFilter(or))

export const search = data => input => data.filter(inputFilter(input))
