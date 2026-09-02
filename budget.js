export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => {
    const amount = expense.amount ?? expense.grade ?? 0;
    return total + (Number(amount) || 0);
  }, 0);
}

export function renderExpenses(expenses, container, options = {}) {
  const {
    filter = 'all',
    search = '',
    columns = [],
    cardTemplate = expense => `<div>${expense.title}</div>`
  } = options;

  const normalizedSearch = search.trim().toLowerCase();
  const visibleExpenses = expenses.filter(expense => {
    const matchesFilter = filter === 'all' || expense.subject === filter;
    const matchesSearch = expense.title.toLowerCase().includes(normalizedSearch);
    return matchesFilter && matchesSearch;
  });

  container.innerHTML = columns.map(column => {
    const items = visibleExpenses.filter(expense => expense.status === column.key);
    return `
      <div class="column">
        <div class="column__head">
          <h3>${column.label}</h3>
          <span class="column__count">${items.length}</span>
        </div>
        <div class="column__list">
          ${items.length ? items.map(cardTemplate).join('') : '<div class="column__empty">Nothing here</div>'}
        </div>
      </div>`;
  }).join('');
}
