function carregarProcessos() {
  const processosSalvos = localStorage.getItem('processos');
  return processosSalvos ? JSON.parse(processosSalvos) : [];
}

function salvarProcessos(processos) {
  localStorage.setItem('processos', JSON.stringify(processos));
}

let ProcessosData = carregarProcessos();

export function obterProcessos() {
  return ProcessosData;
}

export function adicionarProcesso(novoProcesso) {
  if (ProcessosData.some(p => p.numero === novoProcesso.numero)) {
    throw new Error("Já existe um processo com esse número.");
  }
  ProcessosData.push(novoProcesso);
  salvarProcessos(ProcessosData);
}

export function removerProcesso(numero) {
  ProcessosData = ProcessosData.filter(processo => processo.numero !== numero);
  salvarProcessos(ProcessosData);
}

export function adicionarArquivoAoProcesso(numero, arquivoBase64) {
  const processo = ProcessosData.find(p => p.numero === numero);
  if (!processo) {
    throw new Error("Processo não encontrado.");
  }
  processo.arquivos = processo.arquivos || [];
  processo.arquivos.push(arquivoBase64);
  salvarProcessos(ProcessosData);
}

export default { obterProcessos, adicionarProcesso, removerProcesso, adicionarArquivoAoProcesso };
