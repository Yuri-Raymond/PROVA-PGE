<template>
  <div class="novo-processo-container">
    <h1>Cadastrar Novo Processo</h1>

    <form @submit.prevent="adicionarProcesso">
      <div>
        <label for="numero">Número do Processo</label>
        <input type="text" v-model="novoProcesso.numero" readonly />
      </div>
      
      <div>
        <label for="cliente">Nome do Cliente</label>
        <input type="text" v-model="novoProcesso.cliente" @input="converterParaCapsLock('cliente')" required />
      </div>

      <div class="procurador-container">
        <div class="procurador">
          <label for="procurador">Nome do Procurador</label>
          <input type="text" v-model="novoProcesso.procurador" @input="converterParaCapsLock('procurador')" required />
        </div>
        
        <div class="oab">
          <label for="oab">OAB</label>
          <input type="text" v-model="novoProcesso.oab" required @input="validarOAB" />
          <p v-if="oabError" class="error">{{ oabError }}</p>
        </div>
      </div>
      
      <div>
        <label for="orgao">Órgão</label>
        <input type="text" v-model="novoProcesso.orgao" @input="converterParaCapsLock('orgao')" required />
      </div>

      <div>
        <label for="assunto">Assunto</label>
        <input type="text" v-model="novoProcesso.assunto"/>
      </div>

      <div>
        <label for="tipo">Tipo de Processo</label>
        <select v-model="novoProcesso.tipo" @change="handleTipoProcessoChange" required>
          <option value="Cível">Cível</option>
          <option value="Criminal">Criminal</option>
          <option value="Trabalhista">Trabalhista</option>
          <option value="Familiar">Familiar</option>
          <option value="Tributário">Tributário</option>
          <option value="Previdenciário">Previdenciário</option>
          <option value="Outro">Outro...</option>
        </select>
        <input v-if="novoProcesso.tipo === 'Outro'" type="text" v-model="novoProcesso.tipoOutro" placeholder="Digite o tipo de processo..." />
      </div>

      <div>
        <label for="status">Status</label>
        <select v-model="novoProcesso.status" required>
          <option value="Em andamento">Em andamento</option>
          <option value="Aguardando decisão">Aguardando decisão</option>
          <option value="Sentenciado">Sentenciado</option>
          <option value="Arquivado">Arquivado</option>
        </select>
      </div>

      <div>
        <label for="prazo">Prazo</label>
        <input type="date" v-model="novoProcesso.prazo" />
      </div>

      <div>
        <label for="descricao">Descrição</label>
        <textarea v-model="novoProcesso.descricao" rows="4" placeholder="Descrição resumida do processo"></textarea>
      </div>

      <div>
        <label for="arquivo">Anexar Arquivos</label>
        <input type="file" multiple @change="handleFileUpload" />
        <ul v-if="novoProcesso.arquivos.length">
          <li v-for="(arquivo, index) in novoProcesso.arquivos" :key="index">
            {{ arquivo.nome }}
            <button type="button" @click="deletarArquivo(index)" class="delete-btn">X</button>
          </li>
        </ul>
      </div>

      <div class="form-actions">
        <button type="button" class="voltar" @click="voltarParaProcessos">Voltar</button>
        <button type="submit">Adicionar Processo</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      novoProcesso: {
        numero: this.gerarNumeroProcesso(),
        orgao: '',
        assunto: '',
        tipo: 'Cível',
        tipoOutro: '',
        requerente: '',
        requerido: '',
        status: 'Em andamento',
        prazo: '',
        descricao: '',
        arquivos: [],
        procurador: '',
        oab: ''
      },
      oabError: "",
    };
  },
  methods: {
    gerarNumeroProcesso() {
      const randomNum = Math.floor(1000000 + Math.random() * 9000000);
      const dv = Math.floor(Math.random() * 99);
      const ano = new Date().getFullYear();
      const justica = '8';
      const tribunal = '05';
      const orgao = '0001';

      return `${randomNum}-${dv.toString().padStart(2, '0')}.${ano}.${justica}.${tribunal}.${orgao}`;
    },
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.novoProcesso.arquivos.push({
            nome: file.name,
            conteudo: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    },
    deletarArquivo(index) {
      this.novoProcesso.arquivos.splice(index, 1);
    },
    converterParaCapsLock(campo) {
      this.novoProcesso[campo] = this.novoProcesso[campo].toUpperCase();
    },
    voltarParaProcessos() {
      this.$router.push('/processos');
    },
    adicionarProcesso() {
      const processosSalvos = JSON.parse(localStorage.getItem("processos")) || [];
      processosSalvos.push(this.novoProcesso);
      localStorage.setItem("processos", JSON.stringify(processosSalvos));
      this.$router.push('/processos');
    },
    handleTipoProcessoChange() {
      if (this.novoProcesso.tipo !== 'Outro') {
        this.novoProcesso.tipoOutro = '';
      }
    },
    validarOAB() {
      const oabRegex = /^\d{4,6}\/[A-Z]{2}$/;
      this.oabError = oabRegex.test(this.novoProcesso.oab) ? "" : "Formato: 123456/SP";
    }
  }
};
</script>

<style scoped>
.oab {
  text-align: center;
}

div {
  text-align: left;
}

.novo-processo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #343a40;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input,
select,
textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #949292;
  border-radius: 5px;
  width: 100%;
}

textarea {
  resize: vertical;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #666;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button.voltar {
  color: #333;
}

button.voltar:hover {
  background-color: #f35b5b;
}

button[type="submit"] {
  color: #fff;
  background-color: #333;
}

button[type="submit"]:hover {
  background-color: #4a9ffa;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
</style>
