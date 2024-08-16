const jwt = require("jsonwebtoken");
const { SECRET } = require("./envconfig");

/** verify token and send to next .
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Token Not Found");
    }
    const isveified = jwt.verify(token, SECRET);
    req.body = { ...req.body, id: isveified.id };
    next();
  } catch (error) {
    res
      .status(401)
      .send({
        succuss: false,
        error: error.message,
        message:
          "Token Not Found Please add Token In Headers -Authorization- field",
      });
  }
}
module.exports = { verifyToken };
