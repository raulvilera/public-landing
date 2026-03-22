/**
 * VileraNet — Google Apps Script
 * Recebe dados do formulário e grava no Google Sheets.
 *
 * ══════════════════════════════════════════════
 * COMO CONFIGURAR (5 minutos):
 * ══════════════════════════════════════════════
 *
 * 1. Abra o Google Sheets:
 *    https://docs.google.com/spreadsheets/d/1lRxhG_P2V4ZLDHJwZ88sgVkiod3gEN7xZNRO6Owbnk0
 *
 * 2. Menu → Extensões → Apps Script
 *
 * 3. Apague o conteúdo existente e cole este arquivo inteiro
 *
 * 4. Salve (Ctrl+S) e clique em:
 *    Implantar → Nova implantação
 *      Tipo: Aplicativo da Web
 *      Executar como: Eu (sua conta)
 *      Quem tem acesso: Qualquer pessoa (inclusive anônimos)
 *
 * 5. Clique em "Implantar" e autorize as permissões solicitadas
 *
 * 6. Copie a URL gerada (parece com:
 *    https://script.google.com/macros/s/XXXXXXXXXX/exec)
 *
 * 7. Abra index.html e substitua na linha:
 *    const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
 *    pela URL copiada.
 *
 * Pronto! Os cadastros aparecerão na aba "Leads VileraNet" do Sheets.
 */

const SPREADSHEET_ID = '1lRxhG_P2V4ZLDHJwZ88sgVkiod3gEN7xZNRO6Owbnk0';
const SHEET_NAME     = 'Leads VileraNet';

const HEADERS = [
  'Data / Hora',
  'Nome da Escola',
  'Código INEP / CIE',
  'Cidade',
  'Estado',
  'Nome do Responsável',
  'Cargo',
  'E-mail Institucional',
  'Telefone / WhatsApp',
  'Nº de Professores',
  'Como conheceu',
  'Mensagem',
];

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    let   sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);

      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#091525');
      headerRange.setFontColor('#00d4b4');
      headerRange.setFontSize(10);
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, HEADERS.length, 180);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp          || new Date().toLocaleString('pt-BR'),
      data.nomeEscola         || '',
      data.codigoInep         || '',
      data.cidade             || '',
      data.estado             || '',
      data.nomeResponsavel    || '',
      data.cargo              || '',
      data.emailInstitucional || '',
      data.telefone           || '',
      data.numProfessores     || '',
      data.origemContato      || '',
      data.mensagem           || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Teste: abra a URL do Apps Script no navegador para confirmar que está ativo
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: '✅ VileraNet Apps Script ativo' }))
    .setMimeType(ContentService.MimeType.JSON);
}
