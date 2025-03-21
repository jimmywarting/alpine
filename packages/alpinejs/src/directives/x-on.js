import { directive, into, mapAttributes, prefix, startingWith } from '../directives.js'
import { evaluateLater } from '../evaluator.js'
import { skipDuringClone } from '../clone.js'
import on from '../utils/on.js'

mapAttributes(startingWith('@', into(prefix('on:'))))

directive('on', skipDuringClone((el, { value, modifiers, expression }, { cleanup }) => {
    let evaluate = expression ? evaluateLater(el, expression) : () => {}

    // Forward event listeners on portals.
    if (el.tagName.toLowerCase() === 'template') {
        if (! el._x_forwardEvents) el._x_forwardEvents = []
        if (! el._x_forwardEvents.includes(value)) el._x_forwardEvents.push(value)
    }

    let removeListener = on(el, value, modifiers, e => {
        evaluate(() => {}, { scope: { '$event': e }, params: [e] })
    })

    cleanup(() => removeListener())
}))
