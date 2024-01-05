const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.Secret_Key);
      console.log(user.userId);
      req.userId = user.userId;
    } else {
      return res.status(400).json({ message: "unAuthorized user" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "unAuthorized user", error: error });
  }
};

/*
"email" : "email@email.com", 
    "password" : "123",
    "username" : "user"
*/
/*
    "tittle" : "post 1",
    "description" : "works"
*/
