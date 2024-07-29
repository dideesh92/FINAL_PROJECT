const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.Authtoken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = verifyAdmin;
