const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.login = async (req, res) => {
  const { id } = req.params;
  const user = [
    { id: '1', firstName: 'Hugo 01', lastName: 'Hugo 02' },
    { id: '2', firstName: 'Hugo 04', lastName: 'Hugo 03' },
  ].find((x) => x.id === id)

  if (!user) throw "Email and Password did not match.";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "User logged in successfully!",
    token,
  });
};
