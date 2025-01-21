const jwt = require("jsonwebtoken");
module.exports = async (email, id, role) => {
  const token = await jwt.sign(
    { email, id, role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3m",
    }
  );
  return token;
};
