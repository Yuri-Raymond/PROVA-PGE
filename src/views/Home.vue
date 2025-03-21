<template>
  <div class="home">
    <div class="logo-container">
      <img src="../assets/PGE.png" alt="Logo PGE" class="logo" />
    </div>

    <div class="login-container">
      <button v-if="!usuarioLogado" @click="irParaLogin" class="login-btn">Login</button>
      <button v-if="usuarioLogado" @click="logout" class="logout-btn">Logout</button>
    </div>

    <div class="header">
      <h1>Bem-vindo ao Sistema Jurídico</h1>
      <p class="tagline">Gerencie seus processos de forma rápida e segura</p>
    </div>

    <div class="action-container">
      <button @click="irParaProcessos" class="gerenciar-btn">Gerenciar Processos</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarioLogado: !!localStorage.getItem('usuarioLogado')
    };
  },
  methods: {
    irParaLogin() {
      this.$router.push('/login');
    },
    irParaProcessos() {
      this.$router.push('/processos');
    },
    logout() {
      localStorage.removeItem('usuarioLogado');
      alert('Você saiu da conta.');
      this.usuarioLogado = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.home {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}

.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
}
.logo {
  max-width: 450px; 
  max-height: 150px; 
  width: auto;
  height: auto;
}
.login-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
button {
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  text-transform: uppercase;
}
.login-btn {
  background-color: #4a9ffa;
  color: white;
}

.logout-btn {
  background-color: #fd3131;
  color: white;
}

button:hover {
  opacity: 0.9;
}
.header {
  margin-top: 50px;
}

h1 {
  font-size: 36px;
  color: #333;
}

.tagline {
  font-size: 18px;
  color: #777;
  margin-top: 10px;
}
.action-container {
  margin-top: 50px;
}

.gerenciar-btn {
  background-color: #28a745;
  color: white;
  font-size: 18px;
  padding: 14px 30px;
  border-radius: 8px;
}

.gerenciar-btn:hover {
  background-color: #218838;
}
</style>
