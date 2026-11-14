# Controle de Estoque

Aplicação em Vue 3 com Vite. O projeto fica na pasta `vite/`.

## Executar em desenvolvimento

Na raiz do repositório:

```bash
cd vite
npm install
npm run dev
```

Abra o endereço informado pelo Vite no terminal.

## Gerar a versão de produção

Dentro de `vite/`:

```bash
npm run build
```

Os arquivos gerados ficam em `vite/dist/`. Para visualizar essa versão localmente, execute `npm run preview` dentro de `vite/`.

## Estrutura

- `vite/src/`: código da aplicação.
- `vite/src/components/`: componentes Vue reutilizáveis.
- `vite/src/assets/`: imagens e recursos importados pelo código.
- `vite/public/`: arquivos públicos servidos diretamente.
- `vite/vite.config.js`: configuração do Vite.

A aplicação ainda contém a tela inicial do modelo Vue + Vite.
