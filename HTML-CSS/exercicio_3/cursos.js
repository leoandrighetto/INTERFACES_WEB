// js/cursos.js

document.addEventListener('DOMContentLoaded', () => {
  const botaoFiltrar = document.getElementById('botao-filtrar');
  const inputCurso = document.getElementById('campo-curso');
  const tabela = document.getElementById('tabela-cursos').getElementsByTagName('tbody')[0];
  const botaoAtualizar = document.getElementById('botao-atualizar');

  botaoFiltrar.addEventListener('click', () => {
    const pesquisa = inputCurso.value.trim();
    fetch(`https://ingresso.ifrs.edu.br/prematricula/ws/listarCursosIW20242.php?curso=${encodeURIComponent(pesquisa)}`)
      .then(response => response.json())
      .then(data => {
        // limpa tabela antes
        tabela.innerHTML = '';
        data.forEach((curso, i) => {
          const linha = tabela.insertRow();
          linha.style.backgroundColor = (i % 2 === 0) ? '#cccccc' : '#ffffff';

          // coluna seleção - radio button
          const celulaRadio = linha.insertCell();
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = 'selecionado';
          radio.value = curso.id;
          celulaRadio.appendChild(radio);

          // outras colunas
          const celulas = [
            curso.nome || curso.nomeCurso || '',
            curso.modalidade || '',
            curso.turno || '',
            curso.semestre || '',
            curso.campus || ''
          ];

          celulas.forEach(texto => {
            const celula = linha.insertCell();
            celula.textContent = texto;
          });
        });
      })
      .catch(err => alert('Erro ao buscar cursos: ' + err));
  });

  botaoAtualizar.addEventListener('click', () => {
    const radios = document.getElementsByName('selecionado');
    let selecionado = null;
    radios.forEach = radios.forEach || function(cb) { for(let r of this) cb(r); }; // fallback
    radios.forEach(radio => {
      if (radio.checked) selecionado = radio.value;
    });
    if (!selecionado) {
      alert('Selecione um curso para atualizar.');
      return;
    }
    window.location.href = `pagina_3.html?id=${selecionado}`;
  });
});
