exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.farmer = (req, res) => {
  res.status(200).send("farmer Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
