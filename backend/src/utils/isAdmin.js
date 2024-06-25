const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw new Error("Missing or invalid Authorization header");
    }

    const token = bearerToken.split(" ")[1];
    const tokenData = jwt.decode(token);

    if (!tokenData || !tokenData.realm_access || !tokenData.realm_access.roles) {
      throw new Error("Invalid token data");
    }

    const roles = tokenData.realm_access.roles;
    const isAdmin = roles.includes("admin");

    if (isAdmin) {
      // Użytkownik jest administratorem, dodajemy do req dodatkowe informacje o tokenie
      next();
    } else {
      // Użytkownik nie jest administratorem, zwracamy błąd 401
      const error = new Error("Access Denied: You do not have permission to access this.");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
