## @awgv/use-timer-hook

[![Latest NPM version](https://img.shields.io/npm/v/@awgv/use-timer-hook/latest)](https://www.npmjs.com/package/@awgv/use-timer-hook)
![Total amount of NPM downloads](https://img.shields.io/npm/dt/@awgv/use-timer-hook)
<br>
<br>

The hook was specifically created to help with the implementation of notifications that should disappear after a certain amount of time (also be pausable, [e.g.](https://i.imgur.com/vJDtEOb.gifv)). `Date()` objects aren’t used, so if you need conventional clock functionality, you might want to check out packages that provide date/time information like [amrlabib/react-timer-hook](https://github.com/amrlabib/react-timer-hook).

### Usage

```
npm i @awgv/use-timer-hook --save
```

```
yarn add @awgv/use-timer-hook
```

Even though the hook is pretty self explanatory, it’s also well-documented internally, so you can rely on your editor for autocompletion and information on any of the hook’s members.

```javascript
// YourComponent.js

import { useTimer } from '@awgv/use-timer-hook'

export default function YourComponent() {
  const {
    timerIsRunning,
    remainingTime,
    restartTimer,
    resumeTimer,
    pauseTimer,
    stopTimer,
  } = useTimer({
    totalDurationInMilliseconds: 1000,
    callbackToExecuteOnExpiry: () => {},
  })
}
```
