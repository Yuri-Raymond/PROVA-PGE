<template>
  <div class="form-container">
    <h2>Adicionar Novo Processo</h2>
    <form @submit.prevent="salvarProcesso">
      <label>Número do Processo:</label>
      <input v-model="novoProcesso.numero" required pattern="\d+" title="Apenas números são permitidos"/>

      <label>Órgão Responsável:</label>
      <input v-model="novoProcesso.orgao" required />

      <label>Assunto:</label>
      <input v-model="novoProcesso.assunto" required />

      <label>Status:</label>
      <select v-model="novoProcesso.status">
        <option value="Aberto">Aberto</option>
        <option value="Fechado">Fechado</option>
      </select>

      <button type="submit">Salvar Processo</button>
      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      novoProcesso: {
        numero: '',
        orgao: '',
        assunto: '',
        status: 'Aberto'
      },
      mensagem: ''
    };
  },
  methods: {
    salvarProcesso() {
      if (!this.novoProcesso.numero.match(/^\d+$/)) {
        this.mensagem = "O número do processo deve conter apenas dígitos.";
        return;
      }
      this.$emit('processo-adicionado', { ...this.novoProcesso });
      this.mensagem = "Processo salvo com sucesso!";
      this.novoProcesso = { numero: '', orgao: '', assunto: '', status: 'Aberto' };
      setTimeout(() => this.mensagem = '', 3000);
    }
  }
};
</script>

<style scoped>
.mensagem {
  color: green;
  margin-top: 10px;
}
</style>