import chalk from 'chalk'
import type { ILog, Preset, PresetFunction } from './types'

const LOG = false
const NO_LOG = true
const PROD = false
const DEV = true
const LOGGER = false
const NO_LOGGER = true

export const presets: Preset[] = [
  [
    'success',
    (opts) => ({ params: ['SUCCESS', 'greenBright', PROD, LOG, LOGGER, opts] })
  ],

  [
    'warning',
    (opts) => ({
      params: ['WARNING', 'yellowBright', PROD, LOG, LOGGER, opts]
    })
  ],

  [
    'error',
    (opts) => ({ params: ['ERROR', 'redBright', PROD, LOG, LOGGER, opts] })
  ],

  [
    'info',
    (opts) => ({ params: ['INFO', 'cyanBright', PROD, LOG, LOGGER, opts] })
  ],

  ['debug', (opts) => ({ params: ['DEBUG', DEV, LOG, NO_LOGGER, opts] })],

  [
    'http',
    (opts, content) => {
      const details = content[0]
      opts.code ??= details.status || '???'
      const status =
        details.status >= 400 ? chalk.white(details.status) : details.status
      let text = `${details.method} (${status}) ${details.url} - ${
        details.time ?? '???'
      }ms`
      if (details.ips?.length) text += ' - ' + details.ips?.join(', ')
      if (details.referer) text += ' - ' + details.referer

      return {
        params: [
          'HTTP',
          'INFO',
          'gray',
          DEV,
          !(process.env.LOG_HTTP && NO_LOG),
          Object.assign(opts, { details })
        ],
        content: [text]
      }
    }
  ],

  [
    'db',
    (opts, content) => {
      const details = content[0]
      const text = `${details.event} - ${details.collection} - ${details.id}`
      return {
        params: [
          'DB',
          'INFO',
          'gray',
          DEV,
          !(process.env.LOG_DB && NO_LOG),
          Object.assign(opts, { details })
        ],
        content: [text]
      }
    }
  ]
]

/**
 * Add a Preset
 * @param name Presets name
 * @param fn Presets function
 * @example
 * presets.add('test', (opts, content) => {
 *   return {
 *     params: ['Test title', 'green'], // Logger parameters
 *     content: [] // Replaces the content of the logger (optional)
 *   }
 * })
 *
 * log().test('Hello World')
 */
export function add(name: string, fn: PresetFunction) {
  presets.push([name, fn])
}

export function setOnFn(log: any, Logger: any, opts: ILog) {
  for (const preset of presets) {
    const [presetName, presetFunction] = preset
    log[presetName] = (...content: any[]) => {
      return Logger(...presetFunction(opts, content).params)(
        ...(presetFunction(opts, content).content || content)
      )
    }
  }
}
