import {runProjectChecks} from './project-checks.js';
document.querySelectorAll('[data-run-checks]').forEach(button => {
  button.addEventListener('click', () => {
    const results = runProjectChecks(button.dataset.runChecks);
    const panel = document.getElementById('check-results');
    panel.replaceChildren();
    const heading = document.createElement('p');
    const count = results.filter(result => result.passed).length;
    heading.className = 'check-summary';
    heading.textContent = `${count} / ${results.length} 项通过`;
    panel.append(heading);
    const list = document.createElement('ul');
    for (const result of results) {
      const item = document.createElement('li');
      item.dataset.passed = String(result.passed);
      const label = document.createElement('span');
      label.textContent = `${result.passed ? '✓' : '×'} ${result.name}`;
      const output = document.createElement('code');
      output.textContent = result.passed ? result.actual : `预期 ${result.expected}；实际 ${result.actual}`;
      item.append(label, output);
      list.append(item);
    }
    panel.append(list);
    panel.hidden = false;
    button.querySelector('.button-inner span').textContent = '重新运行';
    button.setAttribute('aria-expanded', 'true');
  });
});
