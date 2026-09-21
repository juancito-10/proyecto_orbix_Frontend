const BASE_URL = "http://localhost:3000/api/v1";

const authService = {
  async login(
    correo: string,
    password: string,
    captcha: string
  ) {
    const response = await fetch(
      `${BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          password,
          captcha,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Error al iniciar sesión"
      );
    }

    return data;
  },

  async forgotPassword(correo: string) {
    const response = await fetch(
      `${BASE_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Error al solicitar recuperación de contraseña"
      );
    }

    return data;
  },

  async resetPassword(
    token: string,
    passwordNueva: string
  ) {
    const response = await fetch(
      `${BASE_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          passwordNueva,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Error al restablecer la contraseña"
      );
    }

    return data;
  },
};

export default authService;