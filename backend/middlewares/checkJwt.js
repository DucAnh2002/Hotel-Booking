const { expressjwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

console.log("Expected audience:", process.env.AUTH0_AUDIENCE);

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,

  algorithms: ["RS256"],
  credentialsRequired: true,
});

const debugToken = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  console.log("Authorization exists:", Boolean(authHeader));
  console.log("Bearer format:", authHeader.startsWith("Bearer "));
  console.log("JWT segments:", token.split(".").length);
  console.log("JWT length:", token.length);

  next();
};

((module.exports = checkJwt), debugToken);
