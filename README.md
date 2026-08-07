<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🪄 Contos Mágicos | Magic Tales

Gerador de **contos de fadas mágicos e bilíngues (PT-BR / EN-GB)** para crianças, alimentado pelo Google Gemini.

Onde a sabedoria antiga encontra mundos encantados: a criança escolhe seu protagonista, um **filósofo como guia**, um **companheiro mágico** (dragão, unicórnio, coruja, fada ou raposa), a **lição do dia** e o **tamanho da aventura** — e a IA tece uma história original com árvores que brilham com luz própria, moral da história, narração por voz e exportação em texto.

## ✨ Recursos

- 🌍 **Bilíngue** — cada história nasce em português brasileiro e inglês britânico, com visualização lado a lado
- 🧙 **Guia da Sabedoria** — Sócrates, Platão, Aristóteles, Epicuro e Diógenes guiam a jornada
- 🐉 **Companheiros Mágicos** — Faísca o Dragão, Luna a Unicórnia, Sábia a Coruja, Pip a Fadinha e Nina a Raposa
- 📖 **Lição do Dia** — compartilhar, justiça, respeito, gratidão, perseverança, bondade e mais
- 📏 **Tamanho da aventura** — conto curto (3 parágrafos), médio (5) ou longo (7–8)
- ⭐ **Moral da história** em destaque
- 🔊 **Narração por voz** (Web Speech API) em PT-BR e EN-GB
- 📋 **Copiar** e 💾 **baixar a história em .txt**
- 🎂 Vocabulário adaptado à idade da criança (2–12 anos)
- 🛡️ Configurações de segurança para conteúdo infantil

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env.local` com sua chave do Gemini:
   ```
   GEMINI_API_KEY=sua-chave-aqui
   ```
   (Opcional) escolha o modelo de geração:
   ```
   GEMINI_MODEL=gemini-2.5-flash
   ```
3. Rode o app:
   ```bash
   npm run dev
   ```

## 🧠 O modelo

A geração fica em [`services/geminiService.ts`](services/geminiService.ts):

- Modelo padrão: `gemini-2.5-flash` (configurável via `GEMINI_MODEL`)
- Saída estruturada em JSON (`responseSchema`): título, parágrafos e moral em PT-BR e EN-GB
- Prompt especializado: mundo mágico inspirado em Tolkien (árvores luminosas como Laurelin e Telperion), lição conectada à virtude do filósofo, efeito "uma boa ação leva a outra" e final feliz
- `safetySettings` para bloquear conteúdo inadequado

---

View your app in AI Studio: https://ai.studio/apps/drive/1LaAvH2pjTBmg2pvJtGoRH5AY5lIRLBfG
