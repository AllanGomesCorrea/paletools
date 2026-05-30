# Paletools - Setup & Execução

## Pré-requisitos

- **Node.js** v16+ (recomendado v18 ou v20)
- **npm** (vem junto com o Node.js)
- Navegador Chrome ou Firefox

## Instalação

```bash
cd paletools/src/paletools
npm install
```

## Compilação (Build)

### Build completo (desktop + mobile + tampermonkey)

```bash
npm run build-all
```

### Build apenas desktop (mais rápido para dev)

```bash
npm run build
```

Os arquivos gerados ficam em `paletools/src/paletools/dist/`:

| Arquivo | Descrição |
|---------|-----------|
| `paletools.js` | Versão development (legível, 225KB) |
| `paletools.prod.js` | Versão produção (minificada, 62KB) |
| `paletools-mobile.js` | Versão mobile development |
| `paletools-mobile.prod.js` | Versão mobile produção |
| `paletools.development.user.js` | Tampermonkey (development) |
| `paletools.user.js` | Tampermonkey (produção) |

## Execução no Navegador

### Opção 1: Server Local + Bookmarklet (RECOMENDADO)

**Passo 1 - Iniciar o server local:**

```bash
npx http-server paletools/src/paletools/dist --cors -p 3000
```

O server fica rodando e servindo os arquivos na porta 3000.

**Passo 2 - Criar o bookmarklet:**

No Chrome/Firefox, crie um novo bookmark com esta URL:

```
javascript:void(fetch('http://localhost:3000/paletools.js').then(r=>r.text()).then(eval))
```

**Passo 3 - Usar:**

1. Acesse https://www.ea.com/ea-sports-fc/ultimate-team/web-app/
2. Aguarde o WebApp carregar completamente (moedas visíveis)
3. Clique no bookmark "Paletools"

### Opção 2: Tampermonkey (automático ao abrir o site)

1. Instale a extensão [Tampermonkey](https://www.tampermonkey.net/)
2. Crie um novo userscript com:

```javascript
// ==UserScript==
// @name         Paletools Dev
// @namespace    paletools
// @version      1.0
// @match        https://www.ea.com/ea-sports-fc/ultimate-team/web-app/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

fetch('http://localhost:3000/paletools.js').then(r=>r.text()).then(eval);
```

3. Mantenha o server local rodando (`npx http-server ...`)
4. Toda vez que abrir o WebApp, o Paletools carrega automaticamente

### Opção 3: Console do navegador (teste rápido)

1. Abra o EA WebApp e aguarde carregar
2. F12 → aba Console
3. Cole o conteúdo do arquivo `dist/paletools.js` e pressione Enter

## Fluxo de Desenvolvimento

```
1. Edite o código em src/
2. Compile:        npm run build
3. Recarregue a página do EA WebApp
4. Clique no bookmarklet (ou Tampermonkey faz automaticamente)
```

## Estrutura do Projeto

```
paletools/src/paletools/
├── src/
│   ├── index.js                  # Entry point
│   ├── settings.js               # Configurações persistentes
│   ├── events.js                 # Event bus interno
│   ├── app.js                    # Enable/disable app
│   ├── version.js                # Versão atual
│   ├── core-overrides/           # Patches no código da EA (executam sempre)
│   ├── plugins/                  # Plugins individuais (cada um em sua pasta)
│   ├── services/                 # Serviços (HTTP, market, keyboard, etc.)
│   ├── controls/                 # Componentes UI customizados
│   ├── utils/                    # Utilitários (DOM, notifications, styles)
│   └── localization/             # Traduções
├── eacode/                       # Código da EA WebApp (referência)
├── dist/                         # Output do build (gerado)
├── webpack.config.js             # Config webpack desktop
├── webpack.config.mobile.js      # Config webpack mobile
├── webpack.config.tampermonkey.js # Config webpack tampermonkey
├── webpack.base.js               # Feature flags (habilita/desabilita plugins)
└── package.json                  # Dependências
```

## Criando um Novo Plugin

1. Crie a pasta `src/plugins/meuPlugin/`
2. Crie o arquivo `src/plugins/meuPlugin/index.js`:

```javascript
let plugin;

// #if process.env.MEU_PLUGIN
import { addLabelWithToggle } from "../../controls";
import settings, { saveConfiguration } from "../../settings";

const cfg = settings.plugins.meuPlugin;

function run() {
    const original = ClasseAlvo.prototype.metodo;
    ClasseAlvo.prototype.metodo = function(...args) {
        if (settings.enabled && cfg.enabled) {
            // sua lógica aqui
        }
        return original.call(this, ...args);
    };
}

function menu() {
    const container = document.createElement("div");
    addLabelWithToggle(container, "enabled", cfg.enabled, toggleState => {
        cfg.enabled = toggleState;
        saveConfiguration();
    });
    return container;
}

plugin = {
    run: run,
    order: 10,
    settings: {
        name: "meuPlugin",
        title: 'plugins.meuPlugin.settings.title',
        menu: menu
    }
};
// #endif

export default plugin;
```

3. Registre em `src/plugins/index.js` (import + adicione ao array)
4. Adicione a feature flag em `webpack.base.js`: `MEU_PLUGIN: true`
5. Adicione settings default em `src/settings.js`
6. Compile: `npm run build`

## Troubleshooting

### "Paletools não carrega / não aparece"
- Verifique se o WebApp carregou completamente (moedas e jogadores visíveis)
- Abra F12 → Console e veja se há erros
- Certifique-se que o server local está rodando na porta 3000

### "CORS error ao fazer fetch do bookmarklet"
- Certifique-se de usar `--cors` ao iniciar o http-server
- Verifique se a porta 3000 não está ocupada por outro processo

### "Erro ao compilar (webpack)"
- Rode `npm install` novamente
- Verifique se está na pasta correta: `paletools/src/paletools/`

### Build rápido (apenas dev, sem mobile/tm)
```bash
npm run build
```
