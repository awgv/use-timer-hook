interface IUseTimer {
  /**
   * ⏲ Returns true if the timer is running.
   */
  timerIsRunning: boolean
  /**
   * ⏳ Stores the running timer’s remaining time and updates when the timer
   * is paused or restarted.
   */
  remainingTime: number
  /**
   * 🔁 Starts or restarts the timer.
   */
  restartTimer: () => void
  /**
   * ⏯ Resumes a paused timer.
   */
  resumeTimer: () => void
  /**
   * ⏸ Pauses a running timer.
   */
  pauseTimer: () => void
  /**
   * ⏹ Completely stops the timer.
   */
  stopTimer: () => void
}

export interface IUseTimerParameters {
  /**
   * The duration, in milliseconds, the timer should wait before
   * `callbackToExecuteOnExpiry()` is executed.
   */
  totalDurationInMilliseconds: number
  /**
   * A function to be executed after the timer expires.
   */
  callbackToExecuteOnExpiry: (...args: any[]) => void
}

/**
 * A pausable timer for React with millisecond precision;
 * useful for notifications or buttons with delayed actions.
 * Destructurable properties:
 *
 * - ⏲ timerIsRunning
 * - ⏳ remainingTime
 * - 🔁 restartTimer
 * - ⏯ resumeTimer
 * - ⏸ pauseTimer
 * - ⏹ stopTimer
 */
export declare function useTimer(parameters: IUseTimerParameters): IUseTimer
