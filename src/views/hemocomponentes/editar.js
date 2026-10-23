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
        .btn { padding: 10px 15px; background-color: #f0ad4e; color: black; border: none; cursor: pointer; border-radius: 4px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Editar Hemocomponente #<%= hemocomponente.id %></h1>
        
        <form action="/hemocomponentes/editar/<%= hemocomponente.id %>" method="POST">
            
            <div class="form-group">
                <label for="tipo">Tipo de Hemocomponente</label>
                <select id="tipo" name="tipo" class="form-control" required>
                    <option value="Concentrado de Hemácias" <%= hemocomponente.tipo === 'Concentrado de Hemácias' ? 'selected' : '' %>>Concentrado de Hemácias (CH)</option>
                    <option value="Plasma Fresco Congelado" <%= hemocomponente.tipo === 'Plasma Fresco Congelado' ? 'selected' : '' %>>Plasma Fresco Congelado (PFC)</option>
                    <option value="Concentrado de Plaquetas" <%= hemocomponente.tipo === 'Concentrado de Plaquetas' ? 'selected' : '' %>>Concentrado de Plaquetas (CP)</option>
                    <option value="Crioprecipitado" <%= hemocomponente.tipo === 'Crioprecipitado' ? 'selected' : '' %>>Crioprecipitado (CRIO)</option>
                </select>
            </div>

            <div class="form-group">
                <label for="volume_ml">Volume (ml)</label>
                <input type="number" step="0.1" id="volume_ml" name="volume_ml" class="form-control" value="<%= hemocomponente.volume_ml %>" required>
            </div>

            <div class="form-group">
                <label for="data_validade">Data de Validade</label>
                <% 
                    // Formata a data para o padrão YYYY-MM-DD exigido pelo input type="date"
                    let dataFormatada = '';
                    if(hemocomponente.data_validade) {
                        dataFormatada = new Date(hemocomponente.data_validade).toISOString().split('T')[0];
                    }
                %>
                <input type="date" id="data_validade" name="data_validade" class="form-control" value="<%= dataFormatada %>" required>
            </div>

            <div class="form-group">
                <label for="status">Status</label>
                <select id="status" name="status" class="form-control" required>
                    <option value="Em Quarentena" <%= hemocomponente.status === 'Em Quarentena' ? 'selected' : '' %>>Em Quarentena</option>
                    <option value="Disponível" <%= hemocomponente.status === 'Disponível' ? 'selected' : '' %>>Disponível</option>
                    <option value="Reservado" <%= hemocomponente.status === 'Reservado' ? 'selected' : '' %>>Reservado</option>
                    <option value="Utilizado" <%= hemocomponente.status === 'Utilizado' ? 'selected' : '' %>>Utilizado (Transfusão)</option>
                    <option value="Descartado" <%= hemocomponente.status === 'Descartado' ? 'selected' : '' %>>Descartado</option>
                </select>
            </div>

            <button type="submit" class="btn">Atualizar Dados</button>
            <a href="/hemocomponentes" style="margin-left: 15px;">Cancelar</a>
        </form>
    </div>
</body>
</html>
