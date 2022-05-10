const User = require('../models/m_user')

const user = {
  get: async (req, res) => {
    let users = await User.find()
    res.status(200).json({ users })
  }
}

module.exports = user