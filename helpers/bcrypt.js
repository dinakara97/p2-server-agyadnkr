const bcrpyt = require('bcrypt')

const hashPassword = password => {
  return bcrpyt.hashSync(password, 8)
}

const comparePassword = (password, hash) => {
  return bcrpyt.compareSync(password, hash)
}

module.exports = {
  hashPassword,
  comparePassword
}