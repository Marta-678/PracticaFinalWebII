const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = (user) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("Generando token para:", user);

  return jwt.sign(
    { _id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const verifyToken = (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { tokenSign, verifyToken };


