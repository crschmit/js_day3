/**
 * @Author: Christian Schmitt <crschmit>
 * @Date:   2017-06-08T09:52:54-05:00
 * @Email:  crschmit@gmail.com
 * @Filename: generators.js
 * @Last modified by:   crschmit
 * @Last modified time: 2017-06-08T09:56:42-05:00
 */

export function * range (start, end) {
  for (let i = start; i < end; i++) {
    yield i
  }
}
