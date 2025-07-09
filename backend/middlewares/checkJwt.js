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

module.exports = checkJwt;
