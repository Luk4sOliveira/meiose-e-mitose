document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
    });
  }

  const form = document.querySelector('#quiz-form');
  if (!form) return;

  const answers = {
    q1: 'b',
    q2: 'b',
    q3: 'a',
    q4: 'a',
    q5: 'b',
    q6: 'a',
    q7: 'b',
    q8: 'a'
  };

  const explain = {
    q1: 'A meiose forma gametas haploides.',
    q2: 'Ao fim das duas divisões, o resultado típico são quatro células haploides.',
    q3: 'Na anáfase mitótica, as cromátides-irmãs se separam.',
    q4: 'O crossing-over pode ocorrer na prófase I.',
    q5: 'A mitose conserva o número de cromossomos.',
    q6: 'Gametas humanos têm 23 cromossomos.',
    q7: 'A mitose contribui para crescimento e renovação de tecidos.',
    q8: 'Os cromossomos homólogos se separam na meiose I.'
  };

  const result = document.querySelector('#quiz-result');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let score = 0;
    const missing = [];
    const wrong = [];

    Object.entries(answers).forEach(([name, correct]) => {
      const chosen = form.querySelector(`input[name="${name}"]:checked`);

      if (!chosen) {
        missing.push(name.slice(1));
      } else if (chosen.value === correct) {
        score++;
      } else {
        wrong.push(name);
      }
    });

    result.hidden = false;
    result.classList.toggle('incomplete', missing.length > 0);

    let message;
    if (score === 8) {
      message = 'Excelente! Você domina os pontos principais.';
    } else if (score >= 6) {
      message = 'Muito bem! Revise os detalhes que ainda confundiram.';
    } else if (score >= 4) {
      message = 'Bom começo. Volte às páginas de conteúdo e tente de novo.';
    } else {
      message = 'Vale revisar mitose e meiose antes de uma nova tentativa.';
    }

    const missingMessage = missing.length
      ? ` Você ainda não respondeu às questões ${missing.join(', ')}.`
      : '';

    const explanations = wrong.length
      ? `<ul>${wrong.map((key) => `<li>${explain[key]}</li>`).join('')}</ul>`
      : '';

    result.innerHTML = `<h3>${score} de 8 acertos</h3><p>${message}${missingMessage}</p>${explanations}`;
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  form.addEventListener('reset', () => {
    result.hidden = true;
    result.innerHTML = '';
    result.classList.remove('incomplete');
  });
});