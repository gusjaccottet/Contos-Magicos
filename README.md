<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🪄 Contos Mágicos | Magic Tales

Gerador de **contos de fadas mágicos e bilíngues (PT-BR / EN-GB)** para crianças, alimentado por IA.

Onde a sabedoria antiga encontra mundos encantados: a criança escolhe seu protagonista, um **filósofo como guia**, um **companheiro mágico** (dragão, unicórnio, coruja, fada ou raposa), a **lição do dia** e o **tamanho da aventura** — e a IA tece uma história original com árvores que brilham com luz própria, moral da história, narração por voz e exportação em texto.

## 💸 API 100% gratuita — sem chave

O app funciona **sem nenhuma chave de API** usando a API pública gratuita **[Pollinations.ai](https://pollinations.ai)** — é só rodar e gerar histórias.

Opcionalmente, se você definir `GEMINI_API_KEY` no `.env.local`, o app usa automaticamente o **Google Gemini 2.5 Flash** (também com camada gratuita no Google AI Studio) para histórias com saída estruturada ainda mais consistente.

### Provedores (variável `LLM_PROVIDER`)

| Valor | Comportamento |
|-------|---------------|
| `auto` (padrão) | Usa Gemini se `GEMINI_API_KEY` existir; senão, usa Pollinations (grátis, sem chave) |
| `pollinations` | Sempre usa a API gratuita Pollinations.ai |
| `gemini` | Sempre usa Gemini (exige `GEMINI_API_KEY`) |

### Variáveis de ambiente

```
GEMINI_API_KEY=        # (opcional) chave do Google AI Studio
GEMINI_MODEL=gemini-2.5-flash   # (opcional) modelo Gemini
POLLINATIONS_MODEL=openai       # (opcional) modelo Pollinations
LLM_PROVIDER=auto               # (opcional) auto | pollinations | gemini
```

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
2. Rode o app — **não precisa de chave nenhuma**:
   ```bash
   npm run dev
   ```
3. (Opcional) para usar o Gemini em vez da API gratuita, crie um `.env.local`:
   ```
   GEMINI_API_KEY=sua-chave-aqui
   ```

## 🧠 O modelo

A geração fica em [`services/storyService.ts`](services/storyService.ts):

- **Padrão:** API gratuita Pollinations.ai (sem chave, funciona no navegador)
- **Opcional:** Gemini 2.5 Flash com `responseSchema` (saída JSON estruturada) e `safetySettings`
- Prompt especializado: mundo mágico inspirado em Tolkien (árvores luminosas como Laurelin e Telperion), lição conectada à virtude do filósofo, efeito "uma boa ação leva a outra" e final feliz
- Parsing tolerante: extrai o JSON da resposta mesmo com cercas de código (```json)

---

View your app in AI Studio: https://ai.studio/apps/drive/1LaAvH2pjTBmg2pvJtGoRH5AY5lIRLBfG
