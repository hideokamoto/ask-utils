# Utility handlers for ASK-SDk (v2)

You can add general / utility handlers to use this package.

## Getting stated

```
$ npm install -S @ask-utils/handlers
```

## Handlers
### RequestHandlers

#### DeleteUserData

After subscribe `AlexaSkillEvent.SkillDisabled` event (`eventName: 'SKILL_DISABLED'`), you can delete a persistent attributes of the user who disabled your skill.

```typescript
import * as  Alexa from 'ask-sdk'
import { DeleteDisabledUserHandler } from '@ask-utils/handlers'

...
export const handler = Alexa..SkillBuilders.standard()
  .addRequestHandlers(
    ...,
    DeleteDisabledUserHandler
  )
  .lambda()
```

#### SessionEndedRequestHandler

Simple handler for `SessionEndedRequest`.

```typescript
import * as  Alexa from 'ask-sdk'
import { SessionEndedRequestHandler } from '@ask-utils/handlers'

...
export const handler = Alexa..SkillBuilders.standard()
  .addRequestHandlers(
    ...,
    SessionEndedRequestHandler
  )
  .lambda()
```
#### RepeatIntentHandler

Simple handler for `AMAZON.RepeatIntent`.
The handler will return session attributes object as `lastResponse`.
You can easy set the `lastResponse` attributes into the sessionAttributes by using the `RecordTheResponseInterceptor`.

```typescript
import * as  Alexa from 'ask-sdk'
import { RecordTheResponseInterceptor, RepeatIntent } from '@ask-utils/handlers'

...
export const handler = Alexa..SkillBuilders.standard()
  .addRequestHandlers(
    ...,
    RepeatIntent
  )
  .addResponseInterceptors(
    ...,
    RecordTheResponseInterceptor
  )
  .lambda()
```


## RequestHandlerFactort (Beta)

You can easy to create a Alexa request handler

```typescript
import { RequestHandlerFactory } from '@ask-utils/handlers'

const LaunchRequestHandler = RequestHandlerFactory.create(
    'LaunchRequest',
    {
        handle (handlerInput) {
            return handlerInput.responseBuilder.speak('hello world').getResponse()
        }
    }
)
```

## Interceptors
### RequestInterceptors

#### SetLaunchCountInterceptor
Record the launch count and last launched timestamp.
The interceptor will work only new session.

|Name|type||default|description|
|:--|:--|:--|
|lastLaunch|number?|undefined|Last launch time (UNIX timestamp)|
|launchCount|number|0|Launch the skill count.|

```typescript
import * as  Alexa from 'ask-sdk'
import moment from 'moment'
import { SetLaunchCountInterceptor } from '@ask-utils/handlers'

...
export const handler = Alexa..SkillBuilders.standard()
  .addRequestHandlers(
    {
      canHandle: () => true,
      handle: (handlerInput) => {
        const {
          launchCount,
          lastLaunch
        } = handlerInput.attributesManager.getSessionAttributes()
        const lastLaunchDate = moment.unix(lastLaunch).toISOString()
        ...
      }
    }
  )
  .addRequestInterceptors(
    ...,
    SetLaunchCountInterceptor
  )
  .lambda()
```

#### ConstantsInjectionIntereptor
You can inject your skill constants to use requestAttributes.

```typescript
import * as  Alexa from 'ask-sdk'
import { ConstantsInterceptorFactory } from '@ask-utils/handlers'

const ConstantsInterceptor = ConstantsInterceptorFactory.init({
  SKILL_NAME: 'awesome skill',
  STATE: {
    START: 'START',
    HELP: 'HELP'
  }
})
...
export const handler = Alexa..SkillBuilders.standard()
  .addRequestHandlers(
    {
      canHandle: () => true,
      handle: (handlerInput) => {
        const {
          CONSTANTS
        } = handlerInput.attributesManager.getRequestAttributes()
        const speech = `Welcome to the ${CONSTANTS.SKILL_NAME} skill!`
        ...
      }
    }
  )
  .addRequestInterceptors(
    ...,
    ConstantsInterceptor
  )
  .lambda()
```

### ResponseInterceptors
#### RecordTheResponseInterceptor

Record the response JSON into the session attributes.
If you use handler to handle `AMAZON.RepeatIntent`, you must use it.

```typescript
import * as  Alexa from 'ask-sdk'
import { RecordTheResponseInterceptor } from '@ask-utils/handlers'

...
export const handler = Alexa..SkillBuilders.standard()
  .addResponseInterceptors(
    ...,
    RecordTheResponseInterceptor
  )
  .lambda()
```