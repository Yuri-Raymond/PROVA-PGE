<template>
    <div class="profile-container">
      <h1>Perfil do Usuário</h1>
      <ProfileForm :user="userData" @update="updateProfile" />
    </div>
  </template>
  
  <script>
  import ProfileForm from '../components/ProfileForm.vue';
  
  export default {
    name: 'Profile',
    components: {
      ProfileForm
    },
    data() {
      return {
        userData: {
          nome: 'Usuário Exemplo',
          email: 'usuario@email.com',
          senha: ''
        }
      };
    },
    methods: {
      updateProfile(updatedData) {
        console.log('Dados atualizados:', updatedData);
        this.userData = { ...updatedData };
        alert('Perfil atualizado com sucesso!');
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  h1 {
    text-align: center;
  }
  </style>
  