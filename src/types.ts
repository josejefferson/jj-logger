import type { ForegroundColor } from 'chalk'

export type Levels =
	| 'SUCCESS'
	| 'ERROR'
	| 'DEBUG'
	| 'INFO'
	| 'WARNING'

export interface ILog {
	date: string
	hideProduction?: boolean
	hideConsole?: boolean
	ignoreLogger?: boolean
	color?: typeof ForegroundColor
	level?: Levels
	title?: string
	code?: any
	details?: any
	contents?: any[]
	[key: string]: any
}