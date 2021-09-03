const jwt = require('jsonwebtoken');
const sessionService = require('../services/session/session.service');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const sessionId = req.headers.sessionid;

  if (authHeader) {
    // Bearer lskdfjlkdsjfldsjflsdfj
    const token = authHeader.split(' ')[1];
    
    // Check admin between sessions
    try {
      const sessionObjectInDatabase = await sessionService.findOne(sessionId);
      if (!sessionObjectInDatabase) {
        return res.sendStatus(401);
      }
    } catch {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      return next();
    });

  } else {
    return res.sendStatus(401);
  }
  return undefined;
};
