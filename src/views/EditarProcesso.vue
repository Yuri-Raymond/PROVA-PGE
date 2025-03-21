<template>
  <div v-if="processo" class="editar-processo-container">
    <h1>Editar Processo</h1>
    <form @submit.prevent="salvarAlteracoes">
      <div>
        <label for="numero">Número do Processo</label>
        <input type="text" v-model="processo.numero" readonly />
      </div>

      <div>
        <label for="cliente">Cliente</label>
        <input type="text" v-model="processo.cliente" @input="converterParaCapsLock('cliente')" required />
      </div>
      
      <div class="procurador-container">
        <div class="procurador">
          <label for="procurador">Procurador</label>
          <input type="text" v-model="processo.procurador" @input="converterParaCapsLock('procurador')" required />
        </div>

        <div class="oab">
          <label for="oab">OAB</label>
          <input type="text" v-model="processo.oab" required @input="validarOAB" />
          <p v-if="oabError" class="error">{{ oabError }}</p>
        </div>
      </div>

      <div>
        <label for="orgao">Órgão</label>
        <input type="text" v-model="processo.orgao" @input="converterParaCapsLock('orgao')" required />
      </div>

      <div>
        <label for="assunto">Assunto</label>
        <input type="text" v-model="processo.assunto" />
      </div>

      <div>
        <label for="status">Status</label>
        <select v-model="processo.status">
          <option value="Em andamento">Em andamento</option>
          <option value="Aguardando decisão">Aguardando decisão</option>
          <option value="Sentenciado">Sentenciado</option>
          <option value="Arquivado">Arquivado</option>
        </select>
      </div>

      <div>
        <label for="prazo">Prazo</label>
        <input type="date" v-model="processo.prazo" />
      </div>

      <div>
        <label for="descricao">Descrição</label>
        <textarea v-model="processo.descricao" rows="4"></textarea>
      </div>

      <div>
        <label for="arquivo">Anexar Arquivos</label>
        <input type="file" multiple @change="handleFileUpload" />
        <ul v-if="processo.arquivos.length">
          <li v-for="(arquivo, index) in processo.arquivos" :key="index">
            {{ arquivo.nome }}
            <a :href="arquivo.conteudo" download>Baixar</a>
            <button type="button" @click="deletarArquivo(index)" class="delete-btn">X</button>
          </li>
        </ul>
      </div>

      <div class="form-actions">
        <button type="button" class="voltar" @click="voltar">Cancelar</button>
        <button type="submit">Salvar Alterações</button>
      </div>
    </form>
  </div>

  <div v-else>
    <p>Carregando dados do processo...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processo: null,
      oabError: "",
    };
  },
  methods: {
    carregarDados() {
      const numeroProcesso = this.$route.params.numero;
      const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
      const processoEncontrado = processosSalvos.find(p => p.numero === numeroProcesso);

      if (processoEncontrado) {
        this.processo = processoEncontrado;
      } else {
        this.processo = {
          numero: '',
          cliente: '',
          procurador: '',
          orgao: '',
          assunto: '',
          status: '',
          prazo: '',
          descricao: '',
          oab: '',
          arquivos: []
        };
      }
    },
    salvarAlteracoes() {
      let processos = JSON.parse(localStorage.getItem("processos")) || [];
      const index = processos.findIndex(p => p.numero === this.processo.numero);
      if (index !== -1) {
        processos[index] = this.processo;
        localStorage.setItem("processos", JSON.stringify(processos));
        this.$router.push(`/processo/${this.processo.numero}`);
      }
    },
    voltar() {
      this.$router.push(`/processo/${this.processo.numero}`);
    },
    converterParaCapsLock(campo) {
      this.processo[campo] = this.processo[campo].toUpperCase();
    },
    validarOAB() {
      const oabRegex = /^\d{4,6}\/[A-Z]{2}$/;
      this.oabError = oabRegex.test(this.processo.oab) ? "" : "formato: 123456/SP";
    },
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.processo.arquivos.push({
            nome: file.name,
            conteudo: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    },
    deletarArquivo(index) {
      this.processo.arquivos.splice(index, 1);
    }
  },
  mounted() {
    this.carregarDados();
  }
};
</script>

<style scoped>
.editar-processo-container {
  max-width: 600px;
  margin: auto;
  padding: 25px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #949292;
  border-radius: 5px;
  margin-top: 5px;
}

textarea {
  resize: vertical;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button[type="submit"] {
  color: #fff;
  background-color: #333;
}

button[type="submit"]:hover {
  background-color: #4a9ffa;
}

button.voltar {
  color: #fff;
  background-color: #f35b5b;
  border: none;
}

button.voltar:hover {
  background-color: #c0392b;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.procurador-container {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.procurador-container .procurador,
.procurador-container .oab {
  flex: 1;
}

.oab {
  max-width: 96px;
}

.error {
  color: #f35b5b;
  margin-top: 5px;
}

ul {
  margin-top: 10px;
  padding-left: 20px;
}

ul li {
  list-style-type: disc;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button[type="button"].delete-btn {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #f35b5b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"].delete-btn:hover {
  background-color: #e04f4f;
}
</style>
