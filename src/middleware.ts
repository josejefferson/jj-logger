import { defaultLogger, JJLogger } from './jj-logger'

/**
 * Express middleware
 */
export const logExpress =
	(instance: JJLogger = defaultLogger.instance) =>
	(req: any, res: any, next: Function) => {
		next()
		res.on('finish', () => {
			instance.log().http?.({
				body: req.body,
				hostname: req.hostname,
				ips: req.ips,
				userAgent: req.headers['user-agent'] || null,
				method: req.method,
				url: req.originalUrl,
				referer: req.headers.referrer || req.headers.referer || req.headers.origin,
				time: res.time,
				status: res.statusCode
			})
		})
	}
