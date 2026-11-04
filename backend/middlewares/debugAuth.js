// Debug thông tin Authorization trước khi checkJwt
const debugAuthorization = (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const hasBearer = authHeader.startsWith("Bearer ");
  const token = hasBearer ? authHeader.slice(7).trim() : "";

  console.log("\n========== DEBUG AUTHORIZATION ==========");
  console.log("Request:", req.method, req.originalUrl);
  console.log("Authorization exists:", Boolean(authHeader));
  console.log("Bearer format:", hasBearer);
  console.log("Token exists:", Boolean(token));

  // Chỉ log số lượng phần, tuyệt đối không log nội dung token
  console.log("JWT segments:", token ? token.split(".").length : 0);
  console.log("Token length:", token.length);

  console.log("=========================================\n");

  next();
};

// Debug kết quả sau khi checkJwt xác thực
const debugAuthenticatedUser = (req, res, next) => {
  console.log("\n========== DEBUG AUTHENTICATED USER ==========");
  console.log("req.auth exists:", Boolean(req.auth));
  console.log("Auth0 sub exists:", Boolean(req.auth?.sub));
  console.log("Auth0 sub:", req.auth?.sub || "UNDEFINED");
  console.log("Audience:", req.auth?.aud || "UNDEFINED");
  console.log("Issuer:", req.auth?.iss || "UNDEFINED");
  console.log("================================================\n");

  next();
};

module.exports = {
  debugAuthorization,
  debugAuthenticatedUser,
};
