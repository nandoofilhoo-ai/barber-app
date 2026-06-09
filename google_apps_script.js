/**
 * GOOGLE APPS SCRIPT - BANCO DE DADOS PARA BARBER APP ERP
 * 
 * INSTRUÇÕES DE IMPLANTAÇÃO:
 * 1. Abra uma nova planilha no Google Planilhas (Google Sheets).
 * 2. No menu superior, clique em "Extensões" > "Apps Script".
 * 3. Delete qualquer código existente e cole este script na íntegra.
 * 4. Clique no ícone de Salvar (disquete).
 * 5. Clique no botão azul "Implantar" (Deploy) no canto superior direito > "Nova implantação" (New deployment).
 * 6. Selecione o tipo de implantação clicando na engrenagem: selecione "App da Web" (Web app).
 * 7. Preencha as configurações:
 *    - Descrição: Banco de Dados Barber App
 *    - Executar como: "Você" (sua conta do Google)
 *    - Quem tem acesso: "Qualquer pessoa" (Anyone) -> ESSENCIAL para permitir chamadas do app frontend.
 * 8. Clique em "Implantar". Se solicitado, conceda as permissões necessárias para o script acessar suas planilhas.
 * 9. Copie a "URL do app da Web" gerada. Ela será parecida com:
 *    https://script.google.com/macros/s/AKfycb.../exec
 * 10. Insira essa URL no painel de Configurações do Barber App.
 */

// Inicia as abas padrão caso não existam
function inicializarPlanilha() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var abasDesejadas = {
    "Membros": ["id", "nome", "cpf", "telefone", "email", "cargo", "data_admissao", "status", "taxa_comissao"],
    "Servicos": ["id", "nome", "descricao", "valor_base", "tempo_estimado", "categoria", "ativo"],
    "Produtos": ["id", "nome", "marca", "categoria", "preco_venda", "preco_compra", "estoque", "unidade", "ativo"],
    "Lancamentos": ["id", "team_member_id", "service_id", "quantidade", "valor", "data_hora", "observacao", "usuario_id", "cancelado", "motivo_cancelamento"],
    "Vendas": ["id", "product_id", "quantidade", "preco_venda", "total", "team_member_id", "data", "usuario_id"]
  };

  for (var nomeAba in abasDesejadas) {
    var sheet = ss.getSheetByName(nomeAba);
    if (!sheet) {
      sheet = ss.insertSheet(nomeAba);
      sheet.appendRow(abasDesejadas[nomeAba]);
      // Formata o cabeçalho
      var range = sheet.getRange(1, 1, 1, abasDesejadas[nomeAba].length);
      range.setFontWeight("bold");
      range.setBackground("#18181b");
      range.setFontColor("#ffffff");
    }
  }
}

// Retorna todos os dados para o frontend (GET)
function doGet(e) {
  inicializarPlanilha();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var resultado = {};

  var abas = ["Membros", "Servicos", "Produtos", "Lancamentos", "Vendas"];
  abas.forEach(function(nomeAba) {
    var sheet = ss.getSheetByName(nomeAba);
    var dados = sheet.getDataRange().getValues();
    var cabecalho = dados[0];
    var linhas = [];

    for (var i = 1; i < dados.length; i++) {
      var obj = {};
      for (var j = 0; j < cabecalho.length; j++) {
        var valor = dados[i][j];
        // Formata datas para string ISO
        if (valor instanceof Date) {
          valor = valor.toISOString();
        }
        obj[cabecalho[j]] = valor;
      }
      linhas.push(obj);
    }
    resultado[nomeAba.toLowerCase()] = linhas;
  });

  return ContentService.createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}

// Grava ou atualiza dados enviados pelo frontend (POST)
function doPost(e) {
  inicializarPlanilha();
  var response = { success: false, message: "" };
  
  try {
    var postData = JSON.parse(e.postData.contents);
    var action = postData.action;
    var data = postData.data;

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "adicionar_linha") {
      var aba = postData.aba; // Ex: "Lancamentos"
      var sheet = ss.getSheetByName(aba);
      if (sheet) {
        var cabecalho = sheet.getDataRange().getValues()[0];
        var novaLinha = [];
        for (var i = 0; i < cabecalho.length; i++) {
          var campo = cabecalho[i];
          var valor = data[campo] !== undefined ? data[campo] : "";
          novaLinha.push(valor);
        }
        sheet.appendRow(novaLinha);
        response.success = true;
        response.message = "Linha adicionada com sucesso em " + aba;
      } else {
        response.message = "Aba não encontrada: " + aba;
      }
    } 
    else if (action === "atualizar_linha") {
      var aba = postData.aba; // Ex: "Membros"
      var id = postData.id;
      var sheet = ss.getSheetByName(aba);
      if (sheet) {
        var dados = sheet.getDataRange().getValues();
        var cabecalho = dados[0];
        var colId = cabecalho.indexOf("id");
        var linhaEncontrada = -1;

        for (var i = 1; i < dados.length; i++) {
          if (dados[i][colId].toString() === id.toString()) {
            linhaEncontrada = i + 1; // 1-based index em Sheets e ignora cabeçalho
            break;
          }
        }

        if (linhaEncontrada !== -1) {
          for (var j = 0; j < cabecalho.length; j++) {
            var campo = cabecalho[j];
            if (data[campo] !== undefined) {
              sheet.getRange(linhaEncontrada, j + 1).setValue(data[campo]);
            }
          }
          response.success = true;
          response.message = "Linha atualizada com sucesso em " + aba;
        } else {
          response.message = "ID não encontrado em " + aba + ": " + id;
        }
      } else {
        response.message = "Aba não encontrada: " + aba;
      }
    }
    else if (action === "sync_completo") {
      // Sincroniza dados completos (reescrevendo tabelas estruturais de forma segura)
      var aba = postData.aba;
      var sheet = ss.getSheetByName(aba);
      if (sheet && Array.isArray(data)) {
        var cabecalho = sheet.getDataRange().getValues()[0];
        sheet.clearContents();
        sheet.appendRow(cabecalho); // Restaura cabeçalho
        
        data.forEach(function(item) {
          var novaLinha = [];
          for (var i = 0; i < cabecalho.length; i++) {
            var campo = cabecalho[i];
            var valor = item[campo] !== undefined ? item[campo] : "";
            novaLinha.push(valor);
          }
          sheet.appendRow(novaLinha);
        });
        response.success = true;
        response.message = "Tabela " + aba + " sincronizada com sucesso!";
      } else {
        response.message = "Aba inválida ou dados incorretos.";
      }
    }
    else {
      response.message = "Ação desconhecida: " + action;
    }

  } catch (error) {
    response.success = false;
    response.message = "Erro de processamento: " + error.toString();
  }

  // Habilita CORS retornando headers corretos
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Configura CORS para requisições de preflight do navegador
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
