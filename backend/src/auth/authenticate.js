const jwt = require('jsonwebtoken');
const { tokens } = require('./authHandler');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Bearer lskdfjlkdsjfldsjflsdfj
    const token = authHeader.split(' ')[1];
    const tokenIndex = tokens.findIndex((tok) => tok === token);

    if (tokenIndex === -1) {
      return res.sendStatus(403);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user;
      return next();
    });
  } else {
    return res.sendStatus(401);
  }
  return undefined;
};
