import { HandlerInput } from 'ask-sdk'
import { Device, SupportedInterfaces, interfaces } from 'ask-sdk-model'

export const getDevice = (handlerInput: HandlerInput): Device => {
    return handlerInput.requestEnvelope.context.System.device
}

export const getDeviceId = (handlerInput: HandlerInput): string => {
    const device = getDevice(handlerInput)
    return device.deviceId
}

export const getSupportedInterfaces = (handlerInput: HandlerInput): SupportedInterfaces => {
    const device = getDevice(handlerInput)
    return device.supportedInterfaces
}

export const getAudioPlayerInterface = (handlerInput: HandlerInput): interfaces.audioplayer.AudioPlayerInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    return supportedInterfaces.AudioPlayer || {}
}

export const getGeolocationInterface = (handlerInput: HandlerInput): interfaces.geolocation.GeolocationInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    return supportedInterfaces.Geolocation || {}
}
export const getAPLInterface = (handlerInput: HandlerInput): interfaces.alexa.presentation.apl.AlexaPresentationAplInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    return supportedInterfaces['Alexa.Presentation.APL'] || {}
}
export const getVideoAppInterface = (handlerInput: HandlerInput): interfaces.videoapp.VideoAppInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    return supportedInterfaces.VideoApp || {}
}
export const getDisplayInterface = (handlerInput: HandlerInput): interfaces.display.DisplayInterface | {} => {
    const supportedInterfaces = getSupportedInterfaces(handlerInput)
    return supportedInterfaces.Display || {}
}
