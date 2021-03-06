const Post = require('../models/m_post')
const User = require('../models/m_user')

const posts = {
  getData: async (req, res) => {
    const timeSort = req.query.timeSort == 'asc' ? 1 : -1
    const keyword = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    // asc 遞增(由小到大，由舊到新) createdAt ; 
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    let posts = await Post.find(keyword).populate({
      path: 'user',
      select: 'name photo'
    }).sort({ 'createdAt': timeSort })
    res.status(200).json({ posts })
    // res.send('respond with a resource');
  },
  createPost: async (req, res) => {
    try {
      const data = req.body
      const newPost = await Post.create(
        {
          user: data.user,
          content: data.content,
          type: data.type,
          tags: data.tags,
          image: data.image
        }
      )
      res.status(200).json({ newPost })
    } catch (error) {
      res.status(400).json(error)
    }
  },
  updatePost: async (req, res) => {
    const id = req.params.id
    const data = req.body

    try {
      if (data.content) {
        let post = await Post.findByIdAndUpdate(id, data, { new: true })
        // new:true 返回更新後的資料
        if (post !== null) {
          res.status(200).json({ post })
        } else {
          res.status(400).json({ message: '文章不存在' })
        }

      } else {
        res.status(400).json({ message: '請確認必填欄位!' })
      }

    } catch (error) {
      res.status(404).json({
        message: '文章不存在'
      })
    }
  },
  likePost: async (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    try {
      let { likes } = await Post.findOne({ "_id": id })

      if (likes.includes(userId)) {
        await Post.findByIdAndUpdate(id, { $pull: { "likes": userId } })
        res.status(200).json({ message: '已收回讚!' })
      } else {
        await Post.findByIdAndUpdate(id, { $addToSet: { "likes": userId } })
        res.status(200).json({ message: '按讚成功!' })
      }

    } catch (error) {
      res.status(400).json(error)
    }
  },
  deletePost: async (req, res) => {
    const id = req.params.id
    try {
      let post = await Post.findByIdAndDelete(id)

      if (post !== null) {
        res.status(200).json({ message: '刪除成功' })
      } else {
        res.status(400).json({ message: '找不到文章' })
      }
    } catch (error) {
      res.status(404).json({ message: '找不到文章' })
    }


  }
}

module.exports = posts