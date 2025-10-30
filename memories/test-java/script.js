const sun = document.getElementById('sun');
const sand = document.getElementById('sand');

sun.addEventListener('click', () => {
  sun.classList.toggle('active');
});

// Optional sparkle effect on sand
sand.addEventListener('mousemove', (e) => {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left = `${e.clientX}px`;
  sparkle.style.top = `${e.clientY}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 600);
});
// Select the back button
const backButton = document.getElementById('back-btn');

// Add a click event listener
backButton.addEventListener('click', () => {
  // Get the URL from the data-href attribute
  const href = backButton.getAttribute('data-href');
  // Navigate to the URL
  window.location.href = href;
});