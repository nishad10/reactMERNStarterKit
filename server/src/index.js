import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './config'
import Middlewares from './api/middlewares'
import Authentication from './api/authentication'
import UserRouter from './models/user/router'

if (!process.env.JWT_SECRET) {
  const err = new Error('NO JWT_SECRET')
  console.error(err)
}

const app = express()

mongoose
  .connect(config.mongoose.uri, { useMongoClient: true })
  .catch(err => console.error(err))

mongoose.Promise = global.Promise
// App Setup
app.use(
  cors({
    // Add your website url here to allow cors access
    origin: ['http://localhost:3000']
  })
)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/ping', (req, res) => res.send('pong'))
app.get('/', (req, res) =>
  res.json({ source: 'https://github.com/nishad10/reactMERNStarterKit' })
)
app.post('/signup', Authentication.signup)
app.post('/signin', Authentication.signin)
app.get('/auth-ping', Middlewares.loginRequired, (req, res) =>
  res.send('connected')
)
app.use('/user', Middlewares.loginRequired, UserRouter)

app.use((err, req, res, next) => {
  console.log('Error:', err.message)
  res.status(422).json(err.message)
})

// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, () => {
  console.log(`\x1b[32m`, `Server listening on: ${port}`, `\x1b[0m`)
})
