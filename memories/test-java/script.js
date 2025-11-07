const sun = document.getElementById('sun');
const sand = document.getElementById('sand');

sun.addEventListener('click', () => {
  sun.classList.toggle('active');
});

// Optional sparkle effect on sand
sand.addEventListener('mousemove', (e) => {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  let xCoordinate = Math.random() * 100;
  let yCoordinate = Math.random() * 100;
  sparkle.style.left = xCoordinate + "%";
  sparkle.style.top = yCoordinate + "%";
  document.querySelectorAll(".sand").forEach(function(el){
    el.appendChild(sparkle);
  })

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