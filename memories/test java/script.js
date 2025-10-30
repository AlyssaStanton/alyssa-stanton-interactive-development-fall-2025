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
