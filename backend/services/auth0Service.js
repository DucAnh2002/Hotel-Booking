const axios = require("axios");
const { connection } = require("mongoose");

// 1. Lấy Management Access Token từ Auth0
const getManagementToken = async () => {
  const response = await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    {
      client_id: process.env.Auth0_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.Auth0_MANAGEMENT_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    },
  );
  return response.data.access_token;
};

// 2. Tạo User mới trên Auth0
exports.createAuth0User = async ({ email, password, name }) => {
  const token = await getManagementToken();

  const response = await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    {
      email,
      password,
      name,
      connection: "Username-Password-Authentication",
      email_verified: true,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data; // Trả về object từ Auth0 chứa user_id
};

// 3. Gán Role cho User trên Auth0
exports.assignRoleToUser = async (auth0UserId, RoleId) => {
  const token = await getManagementToken();

  await axios.post(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0UserId}/roles`,
    { role: [RoleId] },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};
