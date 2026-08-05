function decodeToken(token) {
  if (!token) return null;

  try {
    const part = token.split(".")[1];
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function isTokenExpired(payload) {
  if (!payload || !payload.exp) return false;

  return payload.exp * 1000 < Date.now();
}

function isAuthenticated() {
  const token = getToken();

  if (!token) return false;

  return !isTokenExpired(decodeToken(token));
}

function getRole() {
  const payload = decodeToken(getToken());

  if (payload && payload.role) return payload.role;

  const user = getUser();

  return user ? user.role : null;
}

function getUserId() {
  const payload = decodeToken(getToken());

  return payload && payload.id ? payload.id : null;
}

function saveSession(token, user) {
  localStorage.setItem("token", token);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
}

export {
  decodeToken,
  getToken,
  getUser,
  isTokenExpired,
  isAuthenticated,
  getRole,
  getUserId,
  saveSession,
  clearSession,
};
