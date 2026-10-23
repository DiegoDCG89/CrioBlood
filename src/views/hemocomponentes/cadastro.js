<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title><%= title %></title>
    <style>
        .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-control { width: 100%; padding: 8px; box-sizing: border-box; }
        .btn { padding: 10px 15px; background-color: #28a745; color: white; border: none; cursor: pointer; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Cadastrar Novo Hemocomponente</h1>
        <form action="/hemocomponentes/novo" method="POST">
            
            <div class="form-group">
                <label for="lote_id">ID do Lote de Origem</label>
                <input type="number" id="lote_id" name="lote_id" class="form-control" value="<%= lote_id %>" required>
            </div>

            <div class="form-group">
                <label for="tipo">Tipo de Hemocomponente</label>
                <select id="tipo" name="tipo" class="form-control" required>
                    <option value="">Selecione...</option>
                    <option value="Concentrado de Hemácias">Concentrado de Hemácias (CH)</option>
                    <option value="Plasma Fresco Congelado">Plasma Fresco Congelado (PFC)</option>
                    <option value="Concentrado de Plaquetas">Concentrado de Plaquetas (CP)</option>
                    <option value="Crioprecipitado">Crioprecipitado (CRIO)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="volume_ml">Volume (ml)</label>
                <input type="number" step="0.1" id="volume_ml" name="volume_ml" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="data_extracao">Data da Extração / Processamento</label>
                <input type="date" id="data_extracao" name="data_extracao" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="data_validade">Data de Validade</label>
                <input type="date" id="data_validade" name="data_validade" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="status">Status Inicial</label>
                <select id="status" name="status" class="form-control" required>
                    <option value="Em Quarentena">Em Quarentena (Aguardando Sorologia)</option>
                    <option value="Disponível">Disponível</option>
                </select>
            </div>

            <button type="submit" class="btn">Salvar Hemocomponente</button>
            <a href="/hemocomponentes" style="margin-left: 15px;">Cancelar</a>
        </form>
    </div>
</body>
</html>
