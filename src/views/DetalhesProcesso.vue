<template>
  <div class="detalhes-container">
    <div class="header">
      <h1>Detalhes do Processo</h1>
      <div>
        <button class="back-btn" @click="alterarProcesso">Alterar Processo</button>
        <button class="back-btn" @click="voltarParaProcessos">Voltar</button>
      </div>
    </div>

    <div v-if="processo" class="process-details">
      <div class="process-info">
        <div class="column">
          <p><strong>Número:</strong> {{ processo.numero }}</p>
          <p><strong>Cliente:</strong> {{ processo.cliente }}</p>
          <p><strong>Procurador:</strong> {{ processo.procurador }}</p>
          <p><strong>OAB:</strong> {{ processo.oab }}</p>
          <p><strong>Órgão:</strong> {{ processo.orgao }}</p>
        </div>
        <div class="column">
          <p><strong>Assunto:</strong> {{ processo.assunto }}</p>
          <p><strong>Tipo de Processo:</strong> {{ processo.tipo === 'Outro' ? processo.tipoOutro : processo.tipo }}</p>
          <p><strong>Status:</strong> {{ processo.status }}</p>
          <p><strong>Prazo:</strong> {{ formatarData(processo.prazo) }}</p>
        </div>
      </div>
      <div class="process-description">
        <p><strong>Descrição:</strong> {{ processo.descricao }}</p>
      </div>
      <div class="attachment-bar">
        <p><strong>Arquivos Anexados:</strong></p>
        <div v-if="processo.arquivos && processo.arquivos.length > 0">
          <div v-for="(arquivo, index) in processo.arquivos" :key="index">
            <a :href="arquivo.conteudo" :download="arquivo.nome" target="_blank">{{ arquivo.nome }}</a>
          </div>
        </div>
        <p v-else>Nenhum arquivo anexado.</p>
      </div>
    </div>
    <p v-else>Processo não encontrado.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processo: null
    };
  },
  methods: {
    voltarParaProcessos() {
      this.$router.push('/processos');
    },
    alterarProcesso() {
      this.$router.push(`/editar-processo/${this.processo.numero}`);
    },
    carregarDetalhesProcesso() {
      const numeroProcesso = this.$route.params.numero;
      const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
      this.processo = processosSalvos.find(p => p.numero === numeroProcesso) || null;
    },
    formatarData(data) {
      if (!data) return "Não informada";
      const d = new Date(data);
      return d.toLocaleDateString("pt-BR");
    }
  },
  mounted() {
    this.carregarDetalhesProcesso();
  }
};
</script>

<style scoped>
.detalhes-container {
  max-width: 900px;
  margin: auto;
  padding: 25px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

h1 {
  font-size: 24px;
  color: #333;
}

.back-btn {
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

.back-btn:hover {
  background-color: #c7c7c7;
}

.process-details {
  display: flex;
  flex-direction: column;
}

.process-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.column {
  width: 50%;
}

.process-info p {
  margin: 4px 0;
}

.process-description {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}

.attachment-bar {
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.attachment-bar p {
  font-size: 16px;
  color: #333;
}

.attachment-bar a {
  display: block;
  margin: 5px 0;
  color: #4a9ffa;
  text-decoration: none;
}

.attachment-bar a:hover {
  text-decoration: underline;
}
</style>
