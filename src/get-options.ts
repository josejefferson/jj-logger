import { isColor, isLevel } from './helpers'
import type { ILog, Levels } from './types'

/**
 * Returns a logger options object according to the arguments
 */
export function getOptions(...args: any[]) {
  const options: ILog = {
    date: new Date().toISOString()
  }

  let newOptions = null

  /**
   * If the last argument is object, add it to the options
   * (..., {})
   */
  if (typeof args[args.length - 1] === 'object') {
    newOptions = args[args.length - 1]
    args = args.slice(0, -1)
  }

  if (
    typeof args[args.length - 3] === 'boolean' &&
    typeof args[args.length - 2] === 'boolean' &&
    typeof args[args.length - 1] === 'boolean'
  ) {
    /**
     * If the last three arguments are Boolean
     * (..., true, false, true)
     */
    options.hideProduction = args[args.length - 3]
    options.hideConsole = args[args.length - 2]
    options.ignoreLogger = args[args.length - 1]
    args = args.slice(0, -3)
  } else if (
    typeof args[args.length - 2] === 'boolean' &&
    typeof args[args.length - 1] === 'boolean'
  ) {
    /**
     * If the last two arguments are boolean
     * (..., true, false)
     */
    options.hideProduction = args[args.length - 2]
    options.hideConsole = args[args.length - 1]
    args = args.slice(0, -2)
  } else if (typeof args[args.length - 1] === 'boolean') {
    /**
     * If the last two arguments are boolean
     * (..., true)
     */
    options.hideProduction = args[args.length - 1]
    args = args.slice(0, -1)
  }

  /**
   * Find a color
   * (..., 'blue', ...)
   */
  for (const [i, arg] of Object.entries(args).reverse()) {
    if (isColor(arg)) {
      options.color = arg
      args.splice(+i, 1)
    }
  }

  /**
   * Find a level
   * (..., 'ERROR', ...)
   */
  for (const [i, arg] of Object.entries(args).reverse()) {
    if (isLevel(arg)) {
      options.level = arg.toUpperCase() as Levels
      args.splice(+i, 1)
    }
  }

  if (args.length >= 2) {
    /**
     * Title in the first argument and code in the second
     * ('Title', 'Code', ...)
     */
    options.title = args[0]
    options.code = args[1]
  } else if (args.length === 1) {
    /**
     * Title in the first argument
     * ('Title', ...)
     */
    options.title = args[0]
  }

  Object.assign(options, newOptions)

  return options
}
