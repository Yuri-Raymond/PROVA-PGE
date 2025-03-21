<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="senha" type="password" placeholder="Senha" required />
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: 'ProfileForm',
  data() {
    return {
      email: '',
      senha: '',
    };
  },
  methods: {
    login() {
      this.$store.commit('setUsuario', { email: this.email });
    },
  },
};
</script>

