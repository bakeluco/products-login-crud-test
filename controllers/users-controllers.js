const User = require("../models/user.js")

const DUMMY_USERS = [
  {
    _id: 123,
    username: "admin",
    email: "email@email.com",
    password:
      "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", //admin
    lastLogin: new Date(),
    role: "admin",
    active: true,
    firstName: "John",
    lasName: "Doe",
    birthday: new Date(),
  },
];

let DUMMY_SESSION = [
  {
    _id: 2,
    user: 123,
    username: "admin",
    active: false,
    login: "2022-01-25T20:26:02.176Z",
    logout: "2022-01-25T20:27:02.176Z",
    token: "ABC806DGEH"
  }
]

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username })
    .then(res => res)
    .catch(e => res.json({ state: false, message: "Invalid username or password" }));

  const session = DUMMY_SESSION.find((s) => s.username == username && s.active);

  if (!user || user.password != password || session)
    return res.json({ state: false, message: "Invalid username or password" });
  else {
    let session = {
      _id: Math.floor(Math.random() * 100),
      user: user._id,
      username: user.username,
      active: true,
      login: new Date(),
      logout: undefined,
      token: "ABC" + Math.floor(Math.random() * 1000) + "DGEH",
    }
    DUMMY_SESSION.push(session)
    return res.json({ state: true, user_id: user._id, token: session.token });
  }
};

const logout = (req, res) => {
  const { _id } = req.body
  let active = false
  let logout = new Date()
  const arr = DUMMY_SESSION.map((s) =>
    s.user == _id && s.active
      ? { ...s, active, logout }
      : s)
    ;
  DUMMY_SESSION = arr
  return res.json({ message: "Logout successful!" })
}


exports.login = login;
exports.logout = logout;