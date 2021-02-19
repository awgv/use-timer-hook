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

const LOOKUP_TABLE = {
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

export const useTimer = ({
  totalDurationInMilliseconds,
  callbackToExecuteOnExpiry,
}) => {
  const timeoutReference = useRef()

  const [state, dispatch] = useReducer(
    (state, action) => {
      return LOOKUP_TABLE[action.type].call(
        {
          totalDurationInMilliseconds,
        },
        state
      )
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
