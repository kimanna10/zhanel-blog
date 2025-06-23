// const jsonServer = require("json-server");
// const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const cors = require("cors");

// const server = jsonServer.create();
// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults();

// const SECRET_KEY = "my_super_secret_key";
// const expiresIn = "1h";

// server.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// server.use(jsonServer.bodyParser);
// server.use(middlewares);

// function createToken(payload) {
//   return jwt.sign(payload, SECRET_KEY, { expiresIn });
// }

// function verifyToken(token) {
//   return jwt.verify(token, SECRET_KEY, (err, decode) =>
//     decode !== undefined ? decode : err
//   );
// }

// function getNextUserId() {
//   const db = router.db;
//   const users = db.get("users").value();
//   if (users.length === 0) return 1;

//   const maxId = Math.max(...users.map((user) => parseInt(user.id)));
//   return maxId + 1;
// }

// server.post("/auth/signup", (req, res) => {
//   const { username, email, password, gender } = req.body;

//   if (!username || !email || !password) {
//     return res
//       .status(400)
//       .json({ message: "Username, email, and password are required" });
//   }

//   const db = router.db;

//   const existingUser = db
//     .get("users")
//     .find((user) => user.username === username || user.email === email)
//     .value();

//   if (existingUser) {
//     return res.status(409).json({
//       message:
//         existingUser.username === username
//           ? "Username already exists"
//           : "Email already exists",
//     });
//   }

//   const newUser = {
//     id: getNextUserId().toString(),
//     firstName: username.split("")[0].toUpperCase() + username.slice(1),
//     lastName: "User",
//     age: 25,
//     email: email,
//     phone: "+1 000-000-0000",
//     username: username,
//     password: password,
//     gender: gender || "Not specified",
//     image: `https://dummyjson.com/icon/${username}/128`,
//     address: {
//       city: "Unknown",
//       state: "Unknown",
//     },
//   };

//   db.get("users").push(newUser).write();

//   const token = createToken({
//     id: newUser.id,
//     username: newUser.username,
//     email: newUser.email,
//   });

//   const { password: _, ...userWithoutPassword } = newUser;

//   res.status(201).json({
//     message: "User created successfully",
//     token,
//     user: userWithoutPassword,
//   });
// });

// server.post("/auth/login", (req, res) => {
//   const { email, password } = req.body; // Changed from username to email to match your login form

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const db = router.db;
//   const user = db.get("users").find({ email, password }).value();

//   if (!user) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const token = createToken({
//     id: user.id,
//     username: user.username,
//     email: user.email,
//   });

//   // Return user data without password
//   const { password: _, ...userWithoutPassword } = user;

//   res.status(200).json({
//     message: "Login successful",
//     token,
//     user: userWithoutPassword,
//   });
// });

// // Protected route example
// server.get("/dashboard", (req, res) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decoded = verifyToken(token);
//     res.status(200).json({
//       message: "Access granted to protected resource",
//       user: decoded,
//     });
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// // Get current user info (protected route)
// server.get("/auth/me", (req, res) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decoded = verifyToken(token);
//     const db = router.db;
//     const user = db.get("users").find({ id: decoded.id }).value();

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { password: _, ...userWithoutPassword } = user;
//     res.status(200).json({ user: userWithoutPassword });
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// server.use(router);

// server.listen(3000, () => {
//   console.log("JSON Server running on http://localhost:3000");
//   console.log("Available auth endpoints:");
//   console.log("POST /auth/signup - Create new user");
//   console.log("POST /auth/login - Login user");
//   console.log("GET /auth/me - Get current user info (requires token)");
// });

const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const SECRET_KEY = process.env.SECRET_KEY || "my_super_secret_key";
const expiresIn = "1h";

// Настройки CORS для продакшена
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

server.use(cors(corsOptions));
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Функция создания JWT токена
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Функция верификации JWT токена
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Генерация ID для нового пользователя
function getNextUserId() {
  const db = router.db;
  const users = db.get("users").value();
  if (users.length === 0) return 1;

  const maxId = Math.max(...users.map((user) => parseInt(user.id)));
  return maxId + 1;
}

// Регистрация нового пользователя
server.post("/auth/signup", (req, res) => {
  const { username, email, password, gender } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }

  const db = router.db;

  // Проверка на существующего пользователя
  const existingUser = db
    .get("users")
    .find((user) => user.username === username || user.email === email)
    .value();

  if (existingUser) {
    return res.status(409).json({
      message:
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists",
    });
  }

  // Создание нового пользователя
  const newUser = {
    id: getNextUserId().toString(),
    firstName: username.split("")[0].toUpperCase() + username.slice(1),
    lastName: "User",
    age: 25,
    email: email,
    phone: "+1 000-000-0000",
    username: username,
    password: password,
    gender: gender || "Not specified",
    image: `https://dummyjson.com/icon/${username}/128`,
    address: {
      city: "Unknown",
      state: "Unknown",
    },
  };

  // Сохранение пользователя
  db.get("users").push(newUser).write();

  // Генерация токена
  const token = createToken({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
  });

  // Возврат данных без пароля
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    message: "User created successfully",
    token,
    user: userWithoutPassword,
  });
});

// Аутентификация пользователя
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const db = router.db;
  const user = db.get("users").find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = createToken({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  // Возврат данных без пароля
  const { password: _, ...userWithoutPassword } = user;

  res.status(200).json({
    message: "Login successful",
    token,
    user: userWithoutPassword,
  });
});

// Защищенный маршрут (пример)
server.get("/dashboard", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    res.status(200).json({
      message: "Access granted to protected resource",
      user: decoded,
    });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Получение информации о текущем пользователе
server.get("/auth/me", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    const db = router.db;
    const user = db.get("users").find({ id: decoded.id }).value();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Использование стандартных маршрутов JSON-server
server.use("/api", router); // Добавляем префикс /api для всех стандартных маршрутов

// Запуск сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server with Auth running on port ${PORT}`);
  console.log("Available auth endpoints:");
  console.log("POST /auth/signup - Create new user");
  console.log("POST /auth/login - Login user");
  console.log("GET /auth/me - Get current user info (requires token)");
  console.log("API endpoints are available under /api/ prefix");
});
