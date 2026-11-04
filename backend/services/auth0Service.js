const axios = require("axios");

const DOMAIN = (process.env.AUTH0_DOMAIN || "")
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

if (!DOMAIN) {
  throw new Error("AUTH0_DOMAIN chưa được cấu hình trong .env");
}

const BASE_URL = `https://${DOMAIN}/api/v2`;

const ROLE_MAP = {
  admin: "rol_W6m9hdSSyHMphtQ3",
  manager: "rol_N3w1CHahwOOaWXg3",
  reception: "rol_tuPNb0DpVHFdYk5Z",
  restaurant: "rol_0i2oaNA0iq7489Hl",
};

let cachedToken = null;
let tokenExpiresAt = 0;

const getManagementToken = async () => {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.AUTH0_MANAGEMENT_CLIENT_ID;
  const clientSecret = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Thiếu AUTH0_MANAGEMENT_CLIENT_ID hoặc AUTH0_MANAGEMENT_CLIENT_SECRET",
    );
  }

  const response = await axios.post(
    `https://${DOMAIN}/oauth/token`,
    {
      client_id: clientId,
      client_secret: clientSecret,
      audience: `${BASE_URL}/`,
      grant_type: "client_credentials",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  cachedToken = response.data.access_token;
  tokenExpiresAt =
    Date.now() + Math.max(response.data.expires_in - 60, 0) * 1000;

  return cachedToken;
};

const getClient = async () => {
  const token = await getManagementToken();

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Gửi email thiết lập mật khẩu qua Auth0
exports.sendPasswordSetupEmail = async (email) => {
  const response = await axios.post(
    `https://${DOMAIN}/dbconnections/change_password`,
    {
      client_id: process.env.AUTH0_FRONTEND_CLIENT_ID,
      email,
      connection:
        process.env.AUTH0_DB_CONNECTION || "Username-Password-Authentication",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

// Tạo tài khoản Auth0
exports.createAuth0User = async ({ email, password, name }) => {
  if (!email || !password || !name) {
    throw new Error("Thiếu email, password hoặc name khi tạo Auth0 User");
  }

  const client = await getClient();

  const response = await client.post("/users", {
    email,
    password,
    name,
    connection:
      process.env.AUTH0_DB_CONNECTION || "Username-Password-Authentication",
    email_verified: false,
  });

  return response.data;
};

// Lấy thông tin Auth0 User
exports.getAuth0User = async (auth0Id) => {
  const client = await getClient();

  const response = await client.get(`/users/${encodeURIComponent(auth0Id)}`);

  return response.data;
};

// Gán Role
exports.assignRoleToUser = async (auth0UserId, roleId) => {
  const client = await getClient();

  return client.post(`/users/${encodeURIComponent(auth0UserId)}/roles`, {
    roles: [roleId],
  });
};

// Xóa Role
exports.removeRolesFromUser = async (auth0UserId, roleIds) => {
  if (!roleIds?.length) return;

  const client = await getClient();

  return client.delete(`/users/${encodeURIComponent(auth0UserId)}/roles`, {
    data: { roles: roleIds },
  });
};

// Thay thế Role thuộc hệ thống Hotel Booking
exports.replaceUserRole = async (auth0UserId, newRole) => {
  const client = await getClient();

  await client.delete(`/users/${encodeURIComponent(auth0UserId)}/roles`, {
    data: {
      roles: Object.values(ROLE_MAP),
    },
  });

  const newRoleId = ROLE_MAP[newRole];

  if (newRoleId) {
    await client.post(`/users/${encodeURIComponent(auth0UserId)}/roles`, {
      roles: [newRoleId],
    });
  }
};

// Xóa Auth0 User để rollback
exports.deleteAuth0User = async (auth0UserId) => {
  const client = await getClient();

  return client.delete(`/users/${encodeURIComponent(auth0UserId)}`);
};

exports.ROLE_MAP = ROLE_MAP;
