const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      res.status(400).json({ message: err.errors[0].message })
      break;
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: err.errors[0].message })
      break;
    case 'SequelizeDatabaseError':
      res.status(400).json({ message: err })
      break;
    case 'AuthenticationFailed':
      res.status(401).json({ message: 'Invalid Token' })
      break;
    case 'JsonWebTokenError':
      res.status(401).json({ message: 'Invalid Token' })
      break;
    case `Forbidden`:
      res.status(403).json({ message: `Unauthorized` })
      break;
    case `NotFound`:
      res.status(404).json({ message: `Movie not found` })
      break;
    case `AlreadyOnBookmark`:
      res.status(400).json({ message: `You already bookmark this movie` })
      break;
    case `EmailInvalid`:
      res.status(400).json({ message: `Invalid Email/Password` })
      break;
    case `PasswordInvalid`:
      res.status(400).json({ message: `Invalid Email/Password` })
      break;
    default:
      console.log(err);
      res.status(500).json({ message: `Internal server error` })
      break;
  }
}

module.exports = errorHandler
