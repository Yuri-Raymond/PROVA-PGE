<template>
  <div class="login-container">
    <button class="close-btn" @click="voltarParaHome">✖</button>
    <h1>Login</h1>

    <div class="form-group">
      <label>Tipo de Acesso</label>
      <select v-model="tipoAcesso">
        <option value="fisica">Cliente</option>
        <option value="juridica">Procurador</option>
      </select>
    </div>

    <form @submit.prevent="login">
      <div class="form-group" v-if="tipoAcesso === 'juridica'">
        <label>OAB</label>
        <input type="text" v-model="oab" required @input="validarOAB" />
        <p v-if="oabError" class="error">{{ oabError }}</p>
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required @input="validarEmail" />
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit">Entrar</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tipoAcesso: "fisica",
      email: "",
      emailError: "",
      password: "",
      oab: "",
      oabError: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      if (this.emailError) {
        this.errorMessage = this.emailError;
        return;
      }
      if (this.tipoAcesso === "juridica" && this.oabError) {
        this.errorMessage = this.oabError;
        return;
      }

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify({ tipo: this.tipoAcesso, email: this.email, oab: this.oab })
      );
      alert("Login bem-sucedido!");
      this.$router.push("/");
    },
    validarOAB() {
      const oabRegex = /^\d{4,6}\/[A-Z]{2}$/;
      this.oabError = oabRegex.test(this.oab)
        ? ""
        : "Formato inválido. A OAB deve seguir o formato: 123456/SP";
    },
    validarEmail() {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      this.emailError = gmailRegex.test(this.email)
        ? ""
        : "Insira um email válido (@gmail.com)";
    },
    voltarParaHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.login-container {
  position: relative;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}
h1 {
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  font-weight: bold;
}
input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
.error {
  color: #f35b5b;
  margin-top: 5px;
  font-size: 14px;
}
.close-btn {
  position: absolute;
  top: 0px;
  left: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #555;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #f35b5b;
}
</style>
