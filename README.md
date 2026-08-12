# Contos Mágicos

Gere histórias infantis com filósofos gregos como guias. App React + Vite + TypeScript, pronto para o **Visual Studio 2022 no Windows**.

App original no AI Studio: https://ai.studio/apps/drive/1LaAvH2pjTBmg2pvJtGoRH5AY5lIRLBfG

## Requisitos no Windows

1. [Node.js LTS](https://nodejs.org/) 20 ou superior (inclui npm)
2. [Visual Studio 2022](https://visualstudio.microsoft.com/pt-br/downloads/) com a carga de trabalho **Desenvolvimento do Node.js**
   - Ao abrir a solução, o arquivo `.vsconfig` sugere os componentes certos
3. Chave da API Gemini em https://aistudio.google.com/apikey

Visual Studio Code também funciona: abra `ContosMagicos.code-workspace`.

## Primeiro setup (recomendado)

No Explorador de Arquivos, dê dois cliques em `setup-windows.cmd`  
(ou no PowerShell: `.\setup-windows.ps1`).

O script instala as dependências e cria `.env.local` se ainda não existir.

Depois edite `.env.local`:

```
GEMINI_API_KEY=sua_chave_aqui
```

## Abrir no Visual Studio 2022

1. Execute `abrir-visual-studio.cmd` **ou** abra `ContosMagicos.sln`
2. Aguarde o Visual Studio restaurar o npm (primeira abertura)
3. Confirme que o perfil **Contos Magicos (Vite)** está selecionado
4. Pressione **F5** para iniciar o Vite e abrir o navegador em http://localhost:5173

Pelo terminal integrado do Visual Studio:

```bat
npm install
npm run dev
```

## Visual Studio Code

1. `code ContosMagicos.code-workspace`
2. Aceite a versão do TypeScript do workspace
3. F5 escolhe Chrome ou Edge contra o servidor Vite

## Scripts npm

| Comando | Função |
| --- | --- |
| `npm install` | Instala dependências |
| `npm run dev` | Servidor de desenvolvimento em http://localhost:5173 |
| `npm run dev:open` | Igual ao `dev`, já abrindo o navegador |
| `npm run build` | Typecheck + build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build em http://localhost:4173 |
| `npm run typecheck` | Só o TypeScript |

## Estrutura útil no Visual Studio

```
ContosMagicos.sln          solução do Visual Studio 2022
ContosMagicos.esproj       projeto JavaScript/TypeScript
Properties/launchSettings.json   perfil F5 (porta 5173)
.vsconfig                  componentes recomendados do VS
.env.example               modelo da chave Gemini
setup-windows.cmd          setup com um clique
abrir-visual-studio.cmd    abre a solução no VS instalado
```

Não commite `.env.local` — ele já está no `.gitignore`.
