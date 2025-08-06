const input = document.getElementById('search');
const suggestionsList = document.getElementById('suggestions');

input.addEventListener('input', async () => {
  const query = input.value.trim();
  if (query === '') {
    suggestionsList.innerHTML = '';
    suggestionsList.classList.remove('show');
    return;
  }

  try {
    const response = await fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`);
    const data = await response.json();

    suggestionsList.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      suggestionsList.classList.remove('show');
      return;
    }

    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.phrase;
      li.onclick = () => {
        input.value = item.phrase;
        suggestionsList.classList.remove('show');
        window.open(`https://www.google.com/search?q=${encodeURIComponent(item.phrase)}`, '_blank');
      };
      suggestionsList.appendChild(li);
    });

    suggestionsList.classList.add('show');

  } catch (error) {
    console.error('Failed to fetch suggestions:', error);
    suggestionsList.classList.remove('show');
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = input.value.trim();
    if (query !== '') {
      suggestionsList.innerHTML = '';
      suggestionsList.classList.remove('show');
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  }
});
