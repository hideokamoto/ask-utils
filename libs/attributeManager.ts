import { HandlerInput } from 'ask-sdk'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateSessionAttributes = (handlerInput: HandlerInput, updateObject: {[attributeName: string]: any}): void => {
    const atts = handlerInput.attributesManager.getSessionAttributes()
    handlerInput.attributesManager.setSessionAttributes(Object.assign(atts, updateObject))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSessionAttributes = (handlerInput: HandlerInput): {[attributeName: string]: any} => {
    return handlerInput.attributesManager.getSessionAttributes()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSessionAttribute = (handlerInput: HandlerInput, attributeName: string): any => {
    const atts = getSessionAttributes(handlerInput)
    return atts[attributeName]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPersistentAttributes = async <Default = {[key: string]: any}>(handlerInput: HandlerInput, defaultAttributes: Default) => {
    try {
        const data = await handlerInput.attributesManager.getPersistentAttributes()
        if (!data) return defaultAttributes
        return data
    } catch (e) {
        return defaultAttributes
    }
}
