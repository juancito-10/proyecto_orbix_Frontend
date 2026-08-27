const authService = {

  async login(
    correo: string,
    password: string,
    captcha: string
  ) {

    const response = await fetch(

      "http://localhost:3000/api/v1/auth/login",

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

      throw new Error(data.message || "Error al iniciar sesión");

    }

    return data;

  },

};

export default authService;