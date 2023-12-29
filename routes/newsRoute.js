import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import News from '../models/news.js'

const router = express.Router()

// Add a new news
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const newNews = new News({
      ...req.body,
      date: new Date(req.body.date),
    })
    const savedNews = await newNews.save()
    return res.status(201).json(savedNews)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server xatosi' })
  }
})

// Get all news with image and category population
router.get('/get-all-news', async (req, res) => {
  try {
    // Pagination parameters
    const page = Number(req.query.pageNumber) || 1
    const limit = 12
    const skip = (page - 1) * limit

    // Fetch news with pagination
    const [news, count] = await Promise.all([
      News.find().lean().populate('images category').skip(skip).limit(limit),
      News.countDocuments(),
    ])

    // Send response with news and pagination details
    res.json({
      news,
      page,
      pages: Math.ceil(count / limit),
      totalNews: count,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server xatosi' })
  }
})

// Get news by ID with image and category population
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .lean()
      .populate('images category')
    if (!news) {
      return res.status(404).json({ message: 'Yangilik topilmadi' })
    }
    return res.status(200).json(news)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server xatosi' })
  }
})

// Edit news by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedNews) {
      return res.status(404).json({ message: 'Yangilik topilmadi' })
    }
    return res.status(200).json(updatedNews)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server xatosi' })
  }
})

// Delete news by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndRemove(req.params.id)
    if (!deletedNews) {
      return res.status(404).json({ message: 'Yangilik topilmadi' })
    }
    return res.status(200).json({ message: "Yangilik o'chirildi" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server xatosi' })
  }
})

export default router
