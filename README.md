# Projeto Amparo

Um Progressive Web App (PWA) projetado para auxiliar pessoas com Transtorno do Espectro Autista (TEA) durante momentos de crise. O aplicativo provê um botão de emergência acessível que aciona contatos de confiança via WhatsApp.

## 🚀 Como Rodar Localmente (Desenvolvimento)

1. Certifique-se de possuir o [Node.js](https://nodejs.org/) instalado.
2. Navegue até o diretório do projeto: `cd projeto-amparo`
3. Instale as dependências com os peer dependencies legados: `npm install --legacy-peer-deps`
4. Inicie o servidor em modo de desenvolvimento: `npm run dev`
5. Abra o navegador no link fornecido no terminal (provavelmente `http://localhost:5173/`).

## 📦 Como Testar o PWA (Modo Produção)

Para testar o PWA (Service Worker, Instalabilidade, Modo Offline), você precisa rodar o projeto em um modo de build otimizado.

1. Construa o projeto: `npm run build`
2. Sirva o painel em modo preview local: `npm run preview`

## 🎨 Funcionalidades
- **Início**: Botão "Preciso de Ajuda" com contagem regressiva, cancelamento em 3s, chamada à API de Vibração (feedback tátil). Dispara a URL `wa.me` com as informações customizadas.
- **Contatos**: Armazenamento offline de contatos de emergência usando `localStorage`.
- **Configurações**: Habilite a captura de GPS (geolocalização), Modo Escuro, Alto Contraste para melhor legibilidade, ou aumente o tamanho da fonte.

## ⚙️ Tecnologias
- **React 19 + Vite**: Arquitetura ágil e modular baseada em PWA.
- **Vanilla CSS3**: Sistema puro e otimizado usando variáveis CSS para temas acessíveis dinâmicos.
- **Vite PWA Plugin**: Facilita a geração de service worker (suporte offline) com estratégias automáticas em build.
- **Lucide Icons**: SVG dinâmicos.
