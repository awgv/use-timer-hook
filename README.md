## @awgv/use-timer-hook

[![Latest NPM version](https://img.shields.io/npm/v/@awgv/use-timer-hook/latest)](https://www.npmjs.com/package/@awgv/use-timer-hook)
![Total amount of NPM downloads](https://img.shields.io/npm/dt/@awgv/use-timer-hook)
<br>
<br>

The hook was created as an abstraction for notifications and is essentially a pausable `setTimeout()`. Neither `setInterval()` nor `Date()` objects are used, so if you need conventional clock functionality, you might want to check out packages that provide date/time information like [amrlabib/react-timer-hook](https://github.com/amrlabib/react-timer-hook).

### Usage

```
npm i @awgv/use-timer-hook --save
```

```
yarn add @awgv/use-timer-hook
```

The hook is well-documented internally, so you can rely on your editor for intelligent code completion.

```javascript
import { useTimer } from '@awgv/use-timer-hook'

export function YourComponent() {
  const {
    /**
     * ⏲ Returns true if the timer is running.
     */
    timerIsRunning,
    /**
     * ⏳ Stores the running timer’s remaining time and updates when the timer
     * is paused or restarted.
     */
    remainingTime,
    /**
     * 🔁 Starts or restarts the timer.
     */
    restartTimer,
    /**
     * ⏯ Resumes a paused timer.
     */
    resumeTimer,
    /**
     * ⏸ Pauses a running timer.
     */
    pauseTimer,
    /**
     * ⏹ Completely stops the timer.
     */
    stopTimer,
  } = useTimer({
    /**
     * The duration, in milliseconds, the timer should wait before
     * `callbackToExecuteOnExpiry()` is executed.
     */
    totalDurationInMilliseconds: 1000,
    /**
     * A function to be executed after the timer expires.
     */
    callbackToExecuteOnExpiry: () => {},
  })
}
```
