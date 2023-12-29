import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
dotenv.config()

import connect from './config/dbConfig.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors('*'))

import categoriesRoute from './routes/categoriesRoute.js'
import connectionsRoute from './routes/connectionsRoute.js'
import dominionsRoute from './routes/dominionsRoute.js'
import educationsRoute from './routes/educationsRoute.js'
import imagesRoute from './routes/imagesRoute.js'
import mediasRoute from './routes/mediasRoute.js'
import neighbourhoodsRoute from './routes/neighbourhoodsRoute.js'
import newsRoute from './routes/newsRoute.js'
import organizationsRoute from './routes/organizationsRoute.js'
import usersRoute from './routes/usersRoute.js'
import videosRoute from './routes/videosRoute.js'

app.use('/api/users', usersRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/videos', videosRoute)
app.use('/api/connections', connectionsRoute)
app.use('/api/dominions', dominionsRoute)
app.use('/api/educations', educationsRoute)
app.use('/api/images', imagesRoute)
app.use('/api/medias', mediasRoute)
app.use('/api/neighbourhoods', neighbourhoodsRoute)
app.use('/api/news', newsRoute)
app.use('/api/organizations', organizationsRoute)

const port = process.env.PORT || 5000
app.listen(port, () => {
  connect()
  console.log(`Server listening on port ${port}`)
})
