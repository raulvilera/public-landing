# VileraNet — Pacote Final

Plataforma de Ocorrências Escolares

---

## Arquivos incluídos

| Arquivo | Descrição |
|---|---|
| `index.html` | Landing page VileraNet completa |
| `video_demo_editado.mp4` | Vídeo editado (narração + música + blurs precisos) |
| `apps_script.gs` | Script para gravar leads no Google Sheets |

---

## Vídeo — O que foi feito

- Narração em PT-BR adicionada (inicia imediatamente)
- Música ambiente gerada com ducking automático durante a narração
  (volume cai quando a narração fala, sobe quando ela pausa)
- Blur cirúrgico apenas sobre os campos sensíveis:
  - Nome da escola (card login + navbar)
  - E-mail (card login + navbar + rodapé)
  - Nome do aluno (campo do formulário)
  - RA do aluno
  - Responsável pelo registro
  - Grade de nomes de alunos (área do professor)
  - Conferência de nomes e RAs
  - Rodapé com dados do usuário

---

## Configurar Google Sheets (5 min)

1. Abra o Sheets:
   https://docs.google.com/spreadsheets/d/1lRxhG_P2V4ZLDHJwZ88sgVkiod3gEN7xZNRO6Owbnk0

2. Menu → Extensões → Apps Script

3. Cole o conteúdo de `apps_script.gs` e salve

4. Implantar → Nova implantação
   - Tipo: Aplicativo da Web
   - Executar como: Eu (sua conta)
   - Acesso: Qualquer pessoa (inclusive anônimos)

5. Copie a URL gerada

6. Em `index.html`, substitua:
   ```js
   const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
   pela URL copiada.

---

## Deploy da landing page

**Netlify (recomendado — gratuito):**
1. Acesse netlify.com e faça login
2. Arraste a pasta do projeto para a área de deploy
3. URL gerada automaticamente

**GitHub Pages:**
1. Crie repositório público no GitHub
2. Faça upload dos arquivos
3. Settings → Pages → Branch: main

**Servidor próprio:** copie `index.html` e `video_demo_editado.mp4` para qualquer servidor web.

---

© 2026 VileraNet
