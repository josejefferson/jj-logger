import { logToConsole } from './console'
import { getOptions } from './get-options'
import { logs } from './logger'
import { setOnFn as setPresetsOnFn } from './presets'
import type { ILogger, ILogReturnPromise } from './types'

/**
 * Create a logger
 *
 * @example
 * log('Title', 'CODE', 'yellow', 'warning')('Contents here...')
 * log('Title', 'CODE').warning('Contents here...')
 */
export function log(...args: any[]): ILogger {
  const opts = getOptions(...args)

  const executeLog = <ILogger>function (...contents: any[]) {
    let logSaveResolve: (value?: unknown) => void
    const logReturn: ILogReturnPromise = new Promise((resolve) => {
      logSaveResolve = resolve
    })

    opts.date = new Date().toISOString()
    logReturn.opts = opts

    try {
      logToConsole(opts, contents)
    } catch (err) {
      console.error(err)
    }

    try {
      logs.log(opts, contents).then(logSaveResolve)
    } catch (err) {
      console.error(err)
    }

    return logReturn
  }

  setPresetsOnFn(executeLog, log, opts)
  return executeLog
}
