document.getElementById('analyzeButton').addEventListener('click', function() {
  const commentText = document.getElementById('commentInput').value;
  // Placeholder for server interaction
  const mockResponse = {
      'toxic': true,
      'severe_toxic': false,
      'obscene': true,
      'threat': false,
      'insult': true,
      'identity_hate': false,
  };

  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = ''; // Clear previous results

  Object.keys(mockResponse).forEach(category => {
      if (mockResponse[category]) {
          const pill = document.createElement('span');
          pill.textContent = category;
          // Apply different background colors based on category
          let bgColor = 'bg-blue-500'; // Default blue
          switch (category) {
              case 'toxic': bgColor = 'bg-red-500'; break;
              case 'severe_toxic': bgColor = 'bg-red-700'; break;
              case 'obscene': bgColor = 'bg-yellow-500'; break;
              case 'threat': bgColor = 'bg-orange-500'; break;
              case 'insult': bgColor = 'bg-green-500'; break;
              case 'identity_hate': bgColor = 'bg-purple-500'; break;
          }
          pill.classList.add('inline-block', bgColor, 'text-white', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'mr-2', 'mb-2');
          resultContainer.appendChild(pill);
      }
  });
});

document.getElementById('analyzeButton').addEventListener('click', function() {
  const commentText = document.getElementById('commentInput').value;
  fetch('/predict', {
      method: 'POST',
      body: new URLSearchParams({ 'comment': commentText }),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
  })
  .then(response => response.json())
  .then(data => {
      const resultContainer = document.getElementById('result');
      resultContainer.innerHTML = ''; // Clear previous results
      data.forEach(category => {
          const pill = document.createElement('span');
          pill.textContent = category;
          pill.classList.add('inline-block', 'bg-blue-500', 'text-white', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'mr-2');
          resultContainer.appendChild(pill);
      });
  })
  .catch(error => console.error('Error:', error));
});
