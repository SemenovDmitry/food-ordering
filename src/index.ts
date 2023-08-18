import express, { Application, NextFunction, Request, Response } from 'express'

import router from './router'
import errorHandler from './middlewares/errorHandler'
import requestLogger from './middlewares/requestLogger'
import requireJsonContent from './middlewares/requireJsonContent'
import errorLogger from './middlewares/errorLogger'
import invalidPathHandler from './middlewares/invalidPathHandler'

const app: Application = express()

const PORT: number = 3001

app.use(requireJsonContent)
app.use(express.json()) // TODO: почитать про сериализацию полей, что бы не возвращать
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

app.use('/api', router)

app.get('/api', (req: Request, res: Response, next: NextFunction) => {
  return res.json({ running: true })
})

app.use(errorLogger)
app.use(errorHandler)
app.use(invalidPathHandler)

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`)
})
