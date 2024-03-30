const User = require("../models/user.js");
const jwt = require('jsonwebtoken');

const token_issue = (user) => {
  const accessToken = jwt.sign(
    { name: user.name, surname: user.surname },
    process.env.JWT_KEY,
    { expiresIn: 900 }
  ); //15 minutes
  const refreshToken = jwt.sign(
    { name: user.name, surname: user.surname },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
  return { accessToken: accessToken, refreshToken: refreshToken };
};

const tokenChecker = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return { result: true, payload: decoded };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { result: false, code: 2 };
    } else {
      return { result: false, code: 3 };
    }
  }
};

const tokenRefresher = (refreshToken) => {
  console.log("Refreshing token");
  const checkToken = tokenChecker(refreshToken);
  if (checkToken.result) {
    return {
      result: true,
      content: jwt.sign(
        checkToken.payload,
        process.env.JWT_KEY,
        { expiresIn: 900 }
      ),
    };
  } else if (checkToken.code === 2) {
    return { result: false, content: "Token expired" };
  } else {
    return { result: false, content: "Token is invalid" };
  }
};

const verify_credentials = async (username, password) => {
  const user = await User.findOne({ username: username });
  if (user) {
    if (user.password === password) return { code: 1, user: user };
    else return { code: 3, user: {} };
  } else {
    return { code: 2, user: {} };
  }
};

const login_process = async (username, password) => {
  const result = await verify_credentials(username, password);
  if (result.code === 1) {
    const token_obj = token_issue(result.user);
    return { message: "Successs", token_obj: token_obj };
  } else if (result.code === 2) {
    return { message: "User does not exist!", token_obj: {} };
  } else if (result.code === 3) {
    return { message: "Invalid password!", token_obj: {} };
  }
};

const authorize = (req, res) => {
  const tokens = req.cookies ? req.cookies.tokenCookie : undefined;
  if (tokens) {
    const checkAccess = tokenChecker(tokens.accessToken);
    if (checkAccess.result) {
      res.status(200).json("Authorized!");
    } else {
      const refreshAccess = tokenRefresher(tokens.refreshToken);
      if (refreshAccess.result) {
        res.cookie(
          "tokenCookie",
          {
            accessToken: refreshAccess.content,
            refreshToken: tokens.refreshToken,
          },
          {
            maxAge: 3600000,
            httpOnly: true,
            secure: false,
            sameSite: "none",
          }
        );
        res.status(200).json("Authorized!");
      } else {
        res.status(401).json(refreshAccess.content);
      }
    }
  } else {
    res.status(401).json("No token presented");
  }
};

module.exports = {
  login_process,
  authorize,
};
