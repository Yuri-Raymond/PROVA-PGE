import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    processos: [],
    usuario: null,
  }),
  actions: {
    setUsuario(usuario) {
      this.usuario = usuario;
    },
    addProcesso(processo) {
      this.processos.push(processo);
    },
  },
});
