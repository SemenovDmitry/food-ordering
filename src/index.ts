import express, { Application, Request, Response } from 'express'

import router from './router'

const app: Application = express()

const PORT: number = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.get('/', (req: Request, res: Response) => res.json({ running: true }))

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT} !`)
})
