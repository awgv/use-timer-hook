import { useReducer, useEffect, useRef } from 'react'

const ACTIONS = {
  RESTART_TIMER: 'RESTART_TIMER',
  RESUME_TIMER: 'RESUME_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  STOP_TIMER: 'STOP_TIMER',
}

const STATUSES = {
  IS_RUNNING: 'IS_RUNNING',
  IS_PAUSED: 'IS_PAUSED',
  IS_STOPPED: 'IS_STOPPED',
}

const { RESTART_TIMER, RESUME_TIMER, PAUSE_TIMER, STOP_TIMER } = ACTIONS
const { IS_RUNNING, IS_PAUSED, IS_STOPPED } = STATUSES

const lookupTableForTheReducer = {
  [RESTART_TIMER]: function () {
    return {
      status: IS_RUNNING,
      timerStartedAt: Date.now(),
      remainingTime: this.totalDurationInMilliseconds,
    }
  },
  [RESUME_TIMER]: (state) => ({
    ...state,
    status: IS_RUNNING,
    timerStartedAt: Date.now(),
  }),
  [PAUSE_TIMER]: (state) => ({
    ...state,
    status: IS_PAUSED,
    remainingTime: state.remainingTime - (Date.now() - state.timerStartedAt),
  }),
  [STOP_TIMER]: (state) => {
    return {
      ...state,
      status: IS_STOPPED,
    }
  },
}

/**
 * @typedef {Object} useTimer
 *
 * @property {boolean} timerIsRunning
 *           ⏲ Returns true if the timer is running.
 * @property {number} remainingTime
 *           ⏳ Stores the remaining time of a running timer and updates when the timer is paused or restarted.
 * @property {Function} restartTimer
 *           🔁 Starts or restarts the timer.
 * @property {Function} resumeTimer
 *           ⏯ Resumes a paused timer.
 * @property {Function} pauseTimer
 *           ⏸ Pauses a running timer.
 * @property {Function} stopTimer
 *           ⏹ Completely stops the timer.
 */

/**
 * A pausable timer for React with millisecond precision;
 * useful for notifications or buttons with delayed actions.
 *
 * @param {Object} parameter
 *        A timer’s settings.
 * @param {number} parameter.totalDurationInMilliseconds
 *        The duration, in milliseconds, the timer should wait before
 *        `callbackToExecuteOnExpiry()` is executed.
 * @param {Function} parameter.callbackToExecuteOnExpiry
 *        A function to be executed after the timer expires.
 *
 * @returns {useTimer}
 *          Destructurable properties: ⏲ timerIsRunning, ⏳ remainingTime,
 *          🔁 restartTimer, ⏯ resumeTimer, ⏸ pauseTimer, ⏹ stopTimer.
 */
export const useTimer = ({
  totalDurationInMilliseconds,
  callbackToExecuteOnExpiry,
}) => {
  const timeoutReference = useRef()

  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type in lookupTableForTheReducer) {
        return lookupTableForTheReducer[action.type].call(
          {
            totalDurationInMilliseconds,
          },
          state
        )
      }

      throw new Error('[useTimer] Invalid useReducer action type requested.')
    },
    {
      status: IS_STOPPED,
      timerStartedAt: 0,
      remainingTime: totalDurationInMilliseconds,
    }
  )

  useEffect(() => {
    if (state.status === IS_RUNNING) {
      timeoutReference.current = setTimeout(() => {
        callbackToExecuteOnExpiry()
        dispatch({
          type: STOP_TIMER,
        })
      }, state.remainingTime)
    }

    if ([IS_PAUSED, IS_STOPPED].includes(state.status)) {
      clearTimeout(timeoutReference.current)
    }
  }, [state, callbackToExecuteOnExpiry])

  return {
    timerIsRunning: state.status === IS_RUNNING ? true : false,
    remainingTime: state.remainingTime,
    restartTimer: () =>
      dispatch({
        type: RESTART_TIMER,
      }),
    resumeTimer: () =>
      dispatch({
        type: RESUME_TIMER,
      }),
    pauseTimer: () =>
      dispatch({
        type: PAUSE_TIMER,
      }),
    stopTimer: () =>
      dispatch({
        type: STOP_TIMER,
      }),
  }
}
