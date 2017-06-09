/**
 * @Author: Christian Schmitt <crschmit>
 * @Date:   2017-06-08T14:13:24-05:00
 * @Email:  crschmit@gmail.com
 * @Filename: funtools.js
 * @Last modified by:   crschmit
 * @Last modified time: 2017-06-09T09:47:41-05:00
 */

export const fail = thing => { throw new Error(thing) }
export const warn = thing => console.log(`WARNING: ${thing}`)
export const note = thing => console.log(`NOTE: ${thing}`)

export const existy = x => x !== null && x !== undefined // or just x != null
export const truthy = x => existy(x) && x !== false

export const checkJSType = type => x => typeof x === type
export const functionType = checkJSType('function')

export const doWhen =
  cond => action => truthy(cond) ? action() : undefined

export const executeIfHasField =
  name => (...args) => target =>
    doWhen(existy(target[name]))(() => functionType(target[name])
                                  ? target[name](...args)
                                  : target[name])

export const id = x => x
export const swap = f => (x, y) => f(y, x)
export const compose2 = (f, g) => x => f(g(x))
export const compose = (...fs) => fs.reduceRight(swap(compose2), id)

export const complement = pred => x => !pred(x)

export const cons = head => tail => [head, ...tail]
export const head = ([first, ...rest]) => first
export const tail = ([first, ...rest]) => rest

export const concat2 = (as, bs) => [...as, ...bs]
export const concat = (...xxs) =>
  xxs.reduce((prev, curr) => [...prev, ...curr], [])

// (f:A -> B) -> A[][] -> B[]
export const mapCatL = f => (...aas) =>
  aas.reduce((prev, curr) => [...prev, ...(curr.map(f))], [])

// (f:A -> B[]) -> A[] -> B[]
export const mapCat = f => (...as) =>
  as.reduce((acc, a) => [...acc, ...f(a)], [])

// (A -> B)[] -> A -> B[]
export const appF1 = (...fs) => a => fs.map(f => f(a))
// (A -> B)[] -> A[] -> B[]
export const appF = (...fs) => (...as) => as.map(appF1(...fs))
export const appFCat = (...fs) => (...as) => mapCat(appF1(...fs))(...as)
