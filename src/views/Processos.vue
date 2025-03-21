<template>
  <div class="processos-container">
    <div class="header">
      <h1>Gerenciamento de Processos</h1>
      <button class="home-btn" @click="irParaHome">Home</button>
    </div>

    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Pesquisar pelo número ou nome das partes envolvidas..." class="search-bar" />
      <button class="new-process-btn" @click="irParaNovoProcesso">+ Novo Processo</button>
    </div>

    <div v-if="filteredProcessos.length">
      <div class="process-list">
        <div v-for="processo in filteredProcessos" :key="processo.numero" class="process-item">
          <button class="delete-btn" @click="deletarProcesso(processo.numero)">✖</button>
          <div class="process-header">
            <p class="process-number"><strong>Número:</strong> {{ processo.numero }}</p>
          </div>
          <div class="process-info">
            <div class="column">
              <p><strong>Cliente:</strong> {{ processo.cliente }}</p>
              <p><strong>Procurador:</strong> {{ processo.procurador }}</p>
              <p><strong>Órgão:</strong> {{ processo.orgao }}</p>
            </div>
            <div class="column">
              <p><strong>Assunto:</strong> {{ processo.assunto }}</p>
              <p><strong>Status:</strong> {{ processo.status }}</p>
              <p><strong>Prazo:</strong> {{ formatarData(processo.prazo) }}</p>
            </div>
          </div>
          <div class="details-btn-container">
            <button class="details-btn" @click="verDetalhes(processo.numero)">Ver mais detalhes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processos: [],
      searchQuery: "",
      usuario: null,
    };
  },
  computed: {
    filteredProcessos() {
      return this.processos.filter(processo =>
        processo.numero.includes(this.searchQuery) ||
        processo.cliente.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        processo.procurador.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    irParaHome() {
      this.$router.push('/');
    },
    irParaNovoProcesso() {
      this.$router.push('/novo-processo');
    },
    carregarProcessos() {
      const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
      this.processos = processosSalvos;
    },
    deletarProcesso(numero) {
      this.processos = this.processos.filter(p => p.numero !== numero);
      localStorage.setItem("processos", JSON.stringify(this.processos));
    },
    formatarData(data) {
      if (!data) return "Não informada";
      const d = new Date(data);
      return d.toLocaleDateString("pt-BR");
    },
    irParaNovoProcesso(numero) {
      if (this.usuario?.tipo === "juridica") {
        this.$router.push(`/novo-processo`);
      } else {
        alert("Você não tem a permissão necessária.");
      }
    },
    verDetalhes(numero) {
      if (this.usuario?.tipo === "juridica") {
        this.$router.push(`/processo/${numero}`);
      } else {
        alert("Você não tem a permissão necessária.");
      }
    },
    carregarUsuario() {
      const usuarioSalvo = JSON.parse(localStorage.getItem("usuarioLogado"));
      this.usuario = usuarioSalvo || { tipo: "fisica" };
    }
  },
  mounted() {
    this.carregarProcessos();
    this.carregarUsuario();
  }
};
</script>

<style scoped>
.processos-container {
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

.home-btn {
  font-size: 16px;
  cursor: pointer;
}

.home-btn:hover {
  background-color: #c7c7c7;
}

.search-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.search-bar {
  width: 70%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.new-process-btn {
  padding: 8px 18px;
  font-size: 16px;
  border: 1px solid #666;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.new-process-btn:hover {
  background-color: #4a9ffa;
}

.process-list {
  list-style: none;
  padding: 0;
}

.process-item {
  position: relative;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.process-header {
  text-align: center;
  margin-bottom: 10px;
}

.process-number {
  font-size: 18px;
  font-weight: bold;
  color: #222;
}

.process-info {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.column {
  flex: 1;
}

.process-info p {
  margin: 4px 0;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  color: #333;
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20%;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.delete-btn:hover {
  background-color: #f35b5b;
  color: white;
}

.details-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.details-btn {
  padding: 8px 20px;
  font-size: 16px;
  background-color: #4a9ffa;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.details-btn:hover {
  background-color: #3377cc;
}

.attachment-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.attachment-bar a {
  margin: 0 10px;
  color: #4a9ffa;
  text-decoration: none;
}

.attachment-bar a:hover {
  text-decoration: underline;
}
</style>
