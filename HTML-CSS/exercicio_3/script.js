document.addEventListener('DOMContentLoaded', () => {
  
  //pagina 2
  if (document.body.classList.contains('pagina-2')) {
    const botaoFiltrar = document.getElementById('botao-filtrar');
    const inputCurso = document.getElementById('campo-curso');
    const tabela = document.getElementById('tabela-cursos').getElementsByTagName('tbody')[0];
    const botaoAtualizar = document.getElementById('botao-atualizar');

    botaoFiltrar.addEventListener('click', () => {
      const pesquisa = inputCurso.value.trim();
      fetch(`https://ingresso.ifrs.edu.br/prematricula/ws/listarCursosIW20242.php?curso=${encodeURIComponent(pesquisa)}`)
        .then(response => response.json())
        .then(data => {
          tabela.innerHTML = '';
          data.forEach((curso, i) => {
            const linha = tabela.insertRow();
            linha.style.backgroundColor = (i % 2 === 0) ? '#cccccc' : '#ffffff';

            
            const celulaRadio = linha.insertCell();
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'selecionado';
            radio.value = curso.id;
            celulaRadio.appendChild(radio);

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
        .catch(() => alert('Erro ao buscar cursos.'));
    });

    botaoAtualizar.addEventListener('click', () => {
      const radios = document.getElementsByName('selecionado');
      let selecionado = null;
      radios.forEach = radios.forEach || function(cb) { for(let r of this) cb(r); };
      radios.forEach(radio => { if (radio.checked) selecionado = radio.value; });
      if (!selecionado) {
        alert('Selecione um curso para atualizar.');
        return;
      }
      window.location.href = `pagina_3.html?id=${selecionado}`;
    });
  }


  // Página 5 
  if (document.body.classList.contains('pagina-5')) {
    const botaoFiltrarAluno = document.getElementById('botao-filtrar-aluno');
    const inputAluno = document.getElementById('campo-nome');
    const tabelaAluno = document.getElementById('tabela-alunos').getElementsByTagName('tbody')[0];
    const botaoInserir = document.getElementById('botao-inserir');

    botaoFiltrarAluno.addEventListener('click', () => {
      const nome = inputAluno.value.trim();
      fetch(`https://ingresso.ifrs.edu.br/prematricula/ws/listarAlunosIW20242.php?nome=${encodeURIComponent(nome)}`)
        .then(response => response.json())
        .then(data => {
          tabelaAluno.innerHTML = '';
          data.forEach((aluno, i) => {
            const linha = tabelaAluno.insertRow();
            linha.style.backgroundColor = (i % 2 === 0) ? '#cccccc' : '#ffffff';

            const celulaRadio = linha.insertCell();
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'selecionado-aluno';
            radio.value = aluno.matricula;
            celulaRadio.appendChild(radio);

            const celulas = [
              aluno.matricula || '',
              aluno.nome || '',
              aluno.cpf || ''
            ];
            celulas.forEach(texto => {
              const celula = linha.insertCell();
              celula.textContent = texto;
            });
          });
        })
        .catch(() => alert('Erro ao buscar alunos.'));
    });

    botaoInserir.addEventListener('click', () => {
      window.location.href = 'pagina_6.html'; // página de cadastro de aluno
    });
  }


  //  Página 6 
  if (document.body.classList.contains('pagina-6')) {
    const form = document.getElementById('form-aluno');
    const inputNome = document.getElementById('nome-aluno');
    const inputMatricula = document.getElementById('matricula');
    const inputCPF = document.getElementById('cpf');
    const inputNascimento = document.getElementById('nascimento');
    const inputCEP = document.getElementById('cep');
    const botaoBuscarCEP = document.getElementById('botao-buscar-cep');

    // Letras maiúsculas 
    inputNome.addEventListener('input', () => {
      inputNome.value = inputNome.value.toUpperCase();
    });

    // Validação simples do CPF 
    function validarCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g,'');
      if (cpf.length !== 11) return false;

      return true;
    }

    // idade mínima
    function verificarIdade(dataNasc) {
      const hoje = new Date();
      const nascimento = new Date(dataNasc);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const m = hoje.getMonth() - nascimento.getMonth();
      if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      return idade >= 14;
    }

    // Busca endereço pelo ViaCEP
    botaoBuscarCEP.addEventListener('click', () => {
      const cep = inputCEP.value.trim();
      if (!/^\d{8}$/.test(cep)) {
        alert('CEP inválido! Digite 8 números.');
        return;
      }
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (data.erro) {
            alert('CEP não encontrado.');
            return;
          }
          document.getElementById('logradouro').value = data.logradouro || '';
          document.getElementById('bairro').value = data.bairro || '';
          document.getElementById('cidade').value = data.localidade || '';
          document.getElementById('estado').value = data.uf || '';
        })
        .catch(() => alert('Erro ao consultar CEP.'));
    });

    // Validação geral do formulário
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validarCPF(inputCPF.value)) {
        alert('CPF inválido!');
        inputCPF.focus();
        return;
      }
      if (!verificarIdade(inputNascimento.value)) {
        alert('Aluno deve ter no mínimo 14 anos.');
        inputNascimento.focus();
        return;
      }

      
      window.location.href = 'pagina_7.html';
    });


  }


  // === Página 7 - Processamento Aluno ===
  if (document.body.classList.contains('pagina-7')) {
    // Só precisa do botão voltar funcionando, já que é uma página de confirmação
    const botaoVoltar = document.querySelector('button');
    botaoVoltar.addEventListener('click', () => {
      window.location.href = 'pagina_5.html';
    });
  }

});
