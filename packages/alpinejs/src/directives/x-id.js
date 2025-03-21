import { interceptClone } from "../clone.js"
import { directive } from "../directives.js"
import { setIdRoot } from '../ids.js'

directive('id', (el, { expression }, { evaluate }) => {
    let names = evaluate(expression)

    names.forEach(name => setIdRoot(el, name))
})

interceptClone((from, to) => {
    // Transfer over existing ID registrations from
    // the existing dom tree over to the new one
    // so that there aren't ID mismatches...
    if (from._x_ids) {
        to._x_ids = from._x_ids
    }
})

