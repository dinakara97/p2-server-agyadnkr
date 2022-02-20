const adminAuthorization = async (req, res, next) => {
  try {
    const { role } = req.user
    if (role != 'Admin') {
      throw { name: 'Forbidden' }
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = adminAuthorization