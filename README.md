## @awgv/use-timer-hook

[![Latest NPM version](https://img.shields.io/npm/v/@awgv/use-timer-hook/latest)](https://www.npmjs.com/package/@awgv/use-timer-hook)
![Total amount of NPM downloads](https://img.shields.io/npm/dt/@awgv/use-timer-hook)
<br>
<br>

The hook was specifically created as an abstraction for notifications and is essentially a pausable `setTimeout()`. Neither `setInterval()` nor `Date()` objects are used, so if you need conventional clock functionality, you might want to check out packages that provide date/time information like [amrlabib/react-timer-hook](https://github.com/amrlabib/react-timer-hook).

### Usage

```
npm i @awgv/use-timer-hook --save
```

```
yarn add @awgv/use-timer-hook
```

Even though the hook is pretty self explanatory, it’s well-documented internally, and you can rely on your editor for intelligent code completion.

```javascript
import { useTimer } from '@awgv/use-timer-hook'

export function YourComponent() {
  const {
    timerIsRunning, // ⏲ Returns true if the timer is running.
    remainingTime, // ⏳ Stores the remaining time of a running timer and updates when the timer is paused or restarted.
    restartTimer, // 🔁 Starts or restarts the timer.
    resumeTimer, // ⏯ Resumes a paused timer.
    pauseTimer, // ⏸ Pauses a running timer.
    stopTimer, // ⏹ Completely stops the timer.
  } = useTimer({
    // The duration, in milliseconds, the timer should
    // wait before `callbackToExecuteOnExpiry()` is executed:
    totalDurationInMilliseconds: 1000,
    // A function to be executed after the timer expires:
    callbackToExecuteOnExpiry: () => {},
  })
}
```
