## Projeto PGE - Gerenciamento de Processos Jurídicos

Este projeto foi desenvolvido em Vue.js para gerenciar processos jurídicos, permitindo que procuradores e clientes interajam de forma eficiente com processos e documentos.

## Tecnologias Utilizadas

- Vue.js - Framework JavaScript para construção da interface do usuário
- PrimeVue - Biblioteca de componentes para Vue.js
- Vite - Ferramenta para build e desenvolvimento rápido

## Estrutura do Projeto

```
prova-pge/
│── public/                 # Arquivos estáticos (favicon, index.html)
│── src/                    
│   ├── assets/             # Estilos e imagens
│   ├── components/         # Componentes reutilizáveis (ex: Botões, Cards)
│   ├── App.vue             # Componente raiz
│   ├── main.js             # Arquivo principal do Vue.js
│── package.json            # Dependências do projeto
│── vite.config.js          # Configuração do Vite
```

## Funcionalidades

### Processos
- Criar, editar e excluir processos
- Associar documentos aos processos
- Filtragem de processos por status

### Clientes
- Cadastro, edição e remoção de clientes
- Visualização de processos associados

### Autenticação e Autorização
- Login de procuradores e clientes
- Restrição de acesso a processos e dados sensíveis

## Instalação e Execução

1. Clone o repositório:
   ```sh
   git clone <URL-DO-REPOSITORIO>
   cd prova-pge
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Execute o projeto:
   ```sh
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173/
   ```


