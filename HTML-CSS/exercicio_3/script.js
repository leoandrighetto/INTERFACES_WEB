function pegarEstados() {
  $.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados", function(listaEstados) {
    listaEstados.sort((a, b) => a.nome.localeCompare(b.nome));
    listaEstados.forEach(function(estado) {
      $("#lista-estados").append(`<option value="${estado.sigla}">${estado.nome}</option>`);
    });
  });
}

function pegarCidades(siglaEstado) {
  $("#lista-cidades").empty().append('<option value="">Selecione</option>');
  $.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`, function(listaCidades) {
    listaCidades.forEach(function(cidade) {
      $("#lista-cidades").append(`<option value="${cidade.nome}">${cidade.nome}</option>`);
    });
  });
}

function validarTudo() {
  const sigla = document.getElementById("campo-sigla").value;
  const nome = document.getElementById("campo-nome").value;
  const data = document.getElementById("campo-data").value;

  if (!/^[A-Za-z]{3,5}$/.test(sigla)) {
    alert("A sigla deve ter de 3 a 5 letras, sem números.");
    return false;
  }

  if (new Date(data) < new Date("1890-01-01")) {
    alert("A data não pode ser menor que 01/01/1890.");
    return false;
  }

  return true;
}
