let activeAnimations = [];

function revealOnScroll() {
  const memoryCards = document.querySelectorAll('.memory-card');
  const trigger = window.innerHeight * 0.85;
  memoryCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0) rotate(0deg)';
    }
  });
}

function animateSparkles() {
  const sparkles = document.querySelectorAll('.sparkle');
  sparkles.forEach(s => {
    s.style.transform = `translate(${Math.sin(Date.now()/500)*5}px, ${Math.cos(Date.now()/500)*5}px)`;
  });
  requestAnimationFrame(animateSparkles);
}


function animateDrawCloud(ctx, x, y, progress) {
  ctx.strokeStyle = '#4682b4';
  ctx.fillStyle = '#e6effaff';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  
  if (progress > 0.1) {
    const drawProgress = Math.min((progress - 0.1) / 0.7, 1);
    
    const dashLength = 400;
    const currentLength = dashLength * drawProgress;
    
    ctx.setLineDash([currentLength, dashLength]);
    ctx.lineDashOffset = 0;
    
    ctx.beginPath();
    ctx.moveTo(x - 50, y + 8);
    ctx.lineTo(x + 50, y + 8);
    ctx.quadraticCurveTo(x + 65, y - 8, x + 50, y - 22);
    ctx.quadraticCurveTo(x + 35, y - 38, x + 15, y - 30);
    ctx.quadraticCurveTo(x + 8, y - 50, x - 8, y - 45);
    ctx.quadraticCurveTo(x - 22, y - 52, x - 35, y - 38);
    ctx.quadraticCurveTo(x - 50, y - 22, x - 58, y - 8);
    ctx.quadraticCurveTo(x - 65, y + 8, x - 50, y + 8);
    ctx.closePath();
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    if (drawProgress >= 1) {
      ctx.fill();
    }
  }
}

function animateDrawSun(ctx, x, y, progress) {
  ctx.strokeStyle = '#daa520';
  ctx.fillStyle = '#daa520';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  if (progress > 0.1) {
    const centerProgress = Math.min((progress - 0.1) / 0.3, 1);
    ctx.beginPath();
    ctx.arc(x, y, 40 * centerProgress, 0, Math.PI * 2);
    if (centerProgress >= 1) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
  
  if (progress > 0.4) {
    const rayProgress = Math.min((progress - 0.4) / 0.4, 1);
    const rayCount = Math.floor(12 * rayProgress);
    ctx.lineWidth = 4;
    
    for (let i = 0; i < rayCount; i++) {
      const angle = (i * Math.PI * 2) / 12;
      const startX = x + Math.cos(angle) * 45;
      const startY = y + Math.sin(angle) * 45;
      const endX = x + Math.cos(angle) * 65;
      const endY = y + Math.sin(angle) * 65;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }
  
  if (progress > 0.8) {
    ctx.fillStyle = '#000';
    
    ctx.beginPath();
    ctx.arc(x - 12, y - 8, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + 12, y - 8, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y + 8, 15, 0, Math.PI);
    ctx.stroke();
  }
}

function animateDrawBottle(ctx, x, y, progress) {
  ctx.strokeStyle = '#db7093';
  ctx.fillStyle = 'transparent';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  if (progress > 0.1) {
    const bodyProgress = Math.min((progress - 0.1) / 0.4, 1);
    const height = 120 * bodyProgress;
    
    ctx.beginPath();
    ctx.rect(x - 30, y, 60, height);
    ctx.stroke();
  }
  
  if (progress > 0.5) {
    const neckProgress = Math.min((progress - 0.5) / 0.2, 1);
    const neckHeight = 30 * neckProgress;
    
    ctx.beginPath();
    ctx.rect(x - 15, y - neckHeight, 30, neckHeight);
    ctx.stroke();
  }
  
  if (progress > 0.7) {
    ctx.fillStyle = '#db7093';
    
    ctx.beginPath();
    ctx.arc(x, y - 30, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  if (progress > 0.6) {
    ctx.fillStyle = '#ffffff';
    const milkProgress = Math.min((progress - 0.6) / 0.4, 1);
    const maxMilkHeight = 90;
    const currentMilkHeight = maxMilkHeight * milkProgress;
    
    ctx.beginPath();
    ctx.rect(x - 26, y + 120 - currentMilkHeight, 52, currentMilkHeight);
    ctx.fill();
  }
  
  // Add horizontal measurement lines on top of everything
  if (progress > 0.8) {
    ctx.strokeStyle = '#db7093';
    ctx.lineWidth = 3;
    
    const lineProgress = Math.min((progress - 0.8) / 0.2, 1);
    
    // Short line at 1/4 height - appears first
    if (lineProgress > 0) {
      const line1Progress = Math.min(lineProgress / 0.33, 1);
      const line1Length = 30 * line1Progress;
      ctx.beginPath();
      ctx.moveTo(x - line1Length/2, y + 30);
      ctx.lineTo(x + line1Length/2, y + 30);
      ctx.stroke();
    }
    
    // Medium line at 1/2 height - appears second
    if (lineProgress > 0.33) {
      const line2Progress = Math.min((lineProgress - 0.33) / 0.33, 1);
      const line2Length = 36 * line2Progress;
      ctx.beginPath();
      ctx.moveTo(x - line2Length/2, y + 60);
      ctx.lineTo(x + line2Length/2, y + 60);
      ctx.stroke();
    }
    
    // Long line at 3/4 height - appears last
    if (lineProgress > 0.66) {
      const line3Progress = Math.min((lineProgress - 0.66) / 0.34, 1);
      const line3Length = 40 * line3Progress;
      ctx.beginPath();
      ctx.moveTo(x - line3Length/2, y + 90);
      ctx.lineTo(x + line3Length/2, y + 90);
      ctx.stroke();
    }
  }
}

function animateDrawBlocks(ctx, x, y, progress) {
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  // Cute, playful arrangement: staggered and rotated blocks
  // Block 1: Rectangle (bottom left, rotated)
  if (progress > 0.1) {
    const block1Progress = Math.min((progress - 0.1) / 0.2, 1);
    let rectLen = 2 * (65 + 38);
    ctx.save();
    ctx.strokeStyle = '#b22222';
    ctx.translate(x - 60, y + 38);
    ctx.rotate(-0.18); // slight tilt
    ctx.beginPath();
    ctx.moveTo(-32.5, -19);
    ctx.lineTo(32.5, -19);
    ctx.lineTo(32.5, 19);
    ctx.lineTo(-32.5, 19);
    ctx.closePath();
    ctx.setLineDash([rectLen * block1Progress, rectLen]);
    ctx.stroke();
    ctx.setLineDash([]);
    if (block1Progress === 1) {
      ctx.fillStyle = '#b22222';
      ctx.beginPath();
      ctx.moveTo(-32.5, -19);
      ctx.lineTo(32.5, -19);
      ctx.lineTo(32.5, 19);
      ctx.lineTo(-32.5, 19);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
  // Block 2: Circle (top right, offset and rotated)
  if (progress > 0.3) {
    const block2Progress = Math.min((progress - 0.3) / 0.2, 1);
    ctx.save();
    ctx.strokeStyle = '#006400';
    ctx.translate(x + 60, y - 30);
    ctx.rotate(0.13);
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2 * block2Progress);
    ctx.setLineDash([]);
    ctx.stroke();
    if (block2Progress === 1) {
      ctx.fillStyle = '#006400';
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  // Block 3: Square (center, slightly up, rotated)
  if (progress > 0.5) {
    const block3Progress = Math.min((progress - 0.5) / 0.2, 1);
    let sqLen = 4 * 44;
    ctx.save();
    ctx.strokeStyle = '#483d8b';
    ctx.translate(x - 10, y - 30);
    ctx.rotate(-0.09);
    ctx.beginPath();
    ctx.moveTo(-22, -22);
    ctx.lineTo(22, -22);
    ctx.lineTo(22, 22);
    ctx.lineTo(-22, 22);
    ctx.closePath();
    ctx.setLineDash([sqLen * block3Progress, sqLen]);
    ctx.stroke();
    ctx.setLineDash([]);
    if (block3Progress === 1) {
      ctx.fillStyle = '#483d8b';
      ctx.beginPath();
      ctx.moveTo(-22, -22);
      ctx.lineTo(22, -22);
      ctx.lineTo(22, 22);
      ctx.lineTo(-22, 22);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
  // Block 4: Triangle (bottom right, offset and rotated)
  if (progress > 0.7) {
    const block4Progress = Math.min((progress - 0.7) / 0.3, 1);
    let triLen = 3 * 38;
    ctx.save();
    ctx.strokeStyle = '#1e3a5c';
    ctx.translate(x + 30, y + 60);
    ctx.rotate(0.22);
    // Always close the triangle path for outline
    ctx.beginPath();
    ctx.moveTo(0, -19);
    ctx.lineTo(-19, 19);
    ctx.lineTo(19, 19);
    ctx.lineTo(0, -19); // Explicitly close
    ctx.closePath();
    ctx.setLineDash([triLen * block4Progress, triLen]);
    ctx.stroke();
    ctx.setLineDash([]);
    if (block4Progress === 1) {
      ctx.fillStyle = '#1e3a5c';
      ctx.beginPath();
      ctx.moveTo(0, -19);
      ctx.lineTo(-19, 19);
      ctx.lineTo(19, 19);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

function animateDrawStars(ctx, x, y, progress) {
  ctx.strokeStyle = '#b8860b'; // darker gold
  ctx.fillStyle = '#b8860b';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  // Staggered, nicely spaced stars
  const spacing = 38;
  const stars = [
    {x: x - 2 * spacing, y: y + 10, size: 20},   // left, down
    {x: x - spacing, y: y - 12, size: 18},       // left, up
    {x: x, y: y + 6, size: 22},                  // center, down
    {x: x + spacing, y: y - 14, size: 16},       // right, up
    {x: x + 2 * spacing, y: y + 8, size: 20}     // far right, down
  ];
  stars.forEach((star, index) => {
    const starProgress = Math.max(0, Math.min((progress - 0.1 - index * 0.15) / 0.2, 1));
    if (starProgress > 0) {
      drawStar(ctx, star.x, star.y, star.size, starProgress);
    }
  });
}

function drawStar(ctx, cx, cy, r, progress) {
  // Draw a 5-pointed star
  ctx.save();
  ctx.beginPath();
  let points = 5;
  let step = Math.PI / points;
  let path = [];
  for (let i = 0; i < 2 * points + 1; i++) {
    let angle = i * step - Math.PI / 2;
    let rad = i % 2 === 0 ? r : r * 0.45;
    let x = cx + Math.cos(angle) * rad;
    let y = cy + Math.sin(angle) * rad;
    path.push({x, y});
  }
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.closePath();
  // Animate outline
  let totalLen = 0;
  for (let i = 1; i < path.length; i++) {
    let dx = path[i].x - path[i-1].x;
    let dy = path[i].y - path[i-1].y;
    totalLen += Math.sqrt(dx*dx + dy*dy);
  }
  // Add closing segment
  let dx = path[0].x - path[path.length-1].x;
  let dy = path[0].y - path[path.length-1].y;
  totalLen += Math.sqrt(dx*dx + dy*dy);
  ctx.setLineDash([totalLen * progress, totalLen]);
  ctx.stroke();
  ctx.setLineDash([]);
  // Only fill if outline is complete
  if (progress === 1) {
    ctx.fill();
  }
  ctx.restore();
}

function createCanvas(element, type) {
  let canvas = element.querySelector(`.clipart-canvas-${type}`);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = `clipart-canvas-${type}`;
    canvas.width = 250;
    canvas.height = 200;
    canvas.style.position = 'absolute';
    canvas.style.top = '20px';
    canvas.style.right = '20px';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.7';
    element.style.position = 'relative';
    element.appendChild(canvas);
  }
  return canvas;
}

function createCanvasLeft(element, type) {
  let canvas = element.querySelector(`.clipart-canvas-${type}`);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = `clipart-canvas-${type}`;
    canvas.width = 200;
    canvas.height = 250;
    canvas.style.position = 'absolute';
    canvas.style.top = '-30px';
    canvas.style.left = '20px';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.7';
    element.style.position = 'relative';
    element.appendChild(canvas);
  }
  return canvas;
}

function createCanvasTop(element, type) {
  let canvas = element.querySelector(`.clipart-canvas-${type}`);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = `clipart-canvas-${type}`;
    canvas.width = 200;
    canvas.height = 150;
    canvas.style.position = 'absolute';
    canvas.style.top = '-150px';
    canvas.style.left = '50%';
    canvas.style.transform = 'translateX(-50%)';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.7';
    element.style.position = 'relative';
    element.appendChild(canvas);
  }
  return canvas;
}

// Helper for right-side canvas
function createCanvasRight(element, type) {
  let canvas = element.querySelector(`.clipart-canvas-${type}`);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = `clipart-canvas-${type}`;
    canvas.width = 320;
    canvas.height = 220;
    canvas.style.position = 'absolute';
    canvas.style.top = '10px';
    canvas.style.right = '-60px'; // Move closer to block
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.7';
    element.style.position = 'relative';
    element.appendChild(canvas);
  }
  return canvas;
}

function animateClipart(element, drawFunction, type) {
  const canvas = createCanvas(element, type);
  const ctx = canvas.getContext('2d');
  
  let startTime = Date.now();
  let animationId;
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / 2000, 1);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFunction(ctx, canvas.width / 2, canvas.height / 2, progress);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
      activeAnimations.push(animationId);
    }
  }
  
  animate();
  return animationId;
}

function animateBottleLeft(element, drawFunction, type) {
  const canvas = createCanvasLeft(element, type);
  const ctx = canvas.getContext('2d');
  
  let startTime = Date.now();
  let animationId;
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / 2000, 1);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFunction(ctx, canvas.width / 2, canvas.height / 2, progress);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
      activeAnimations.push(animationId);
    }
  }
  
  animate();
  return animationId;
}

function animateClipartTop(element, drawFunction, type) {
  const canvas = createCanvasTop(element, type);
  const ctx = canvas.getContext('2d');
  
  let startTime = Date.now();
  let animationId;
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / 2000, 1);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFunction(ctx, canvas.width / 2, canvas.height / 2, progress);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
      activeAnimations.push(animationId);
    }
  }
  
  animate();
  return animationId;
}

// Add pencil and paper to the right of 2007 timeline item
function animateClipartRight(element, drawFunction, type) {
  const canvas = createCanvasRight(element, type);
  const ctx = canvas.getContext('2d');
  let startTime = Date.now();
  let animationId;
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / 2000, 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFunction(ctx, 30, 30, progress);
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
      activeAnimations.push(animationId);
    }
  }
  animate();
  return animationId;
}

function hideClipart(element, type) {
  const canvas = element.querySelector(`.clipart-canvas-${type}`);
  if (canvas) {
    canvas.remove();
  }
  
  activeAnimations.forEach(id => cancelAnimationFrame(id));
  activeAnimations = [];
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize sparkles
  const hero = document.querySelector('.hero');
  if (hero) {
    const sparkleCount = 20;
    for (let i = 0; i < sparkleCount; i++) {
      const s = document.createElement('div');
      s.classList.add('sparkle');
      s.style.top = Math.random()*100 + '%';
      s.style.left = Math.random()*100 + '%';
      s.style.width = s.style.height = Math.random()*3+2+'px';
      hero.appendChild(s);
    }
    animateSparkles();
  }
  
  // Add scroll listener
  window.addEventListener('scroll', revealOnScroll);
  
  const memoryCards = document.querySelectorAll('.memory-card.polaroid');
  memoryCards.forEach(card => {
    const heading = card.querySelector('h2');
    if (heading && heading.textContent.includes('Childhood')) {
      card.addEventListener('mouseenter', () => {
        animateClipart(card, animateDrawSun, 'sun');
      });
      card.addEventListener('mouseleave', () => {
        hideClipart(card, 'sun');
      });
    }
  });
  
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    const heading = item.querySelector('h3');
    if (heading && heading.textContent.includes('2003')) {
      item.addEventListener('mouseenter', () => {
        animateClipart(item, animateDrawSun, 'sun');
        animateBottleLeft(item, animateDrawBottle, 'bottle');
        animateClipartTop(item, animateDrawCloud, 'cloud');
      });
      item.addEventListener('mouseleave', () => {
        hideClipart(item, 'sun');
        hideClipart(item, 'bottle');
        hideClipart(item, 'cloud');
      });
    }
    
    if (heading && heading.textContent.includes('2007')) {
      item.addEventListener('mouseenter', () => {
        animateBottleLeft(item, animateDrawBlocks, 'blocks');
        animateClipartTop(item, animateDrawStars, 'stars');
        // Pencil and paper to the right
        animateClipartRight(item, animateDrawPencilAndPaper, 'pencilpaper');
      });
      item.addEventListener('mouseleave', () => {
        hideClipart(item, 'blocks');
        hideClipart(item, 'stars');
        hideClipart(item, 'pencilpaper');
      });
    }
  });
  
  memoryCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes('bottle') || text.includes('milk') || text.includes('feeding')) {
      card.addEventListener('mouseenter', () => {
        animateClipart(card, animateDrawBottle, 'bottle');
      });
      card.addEventListener('mouseleave', () => {
        hideClipart(card, 'bottle');
      });
    }
  });
});

function animateDrawPencilAndPaper(ctx, x, y, progress) {
  // Draw paper (animated outline, then fill)
  ctx.save();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#e0e0e0';
  ctx.fillStyle = '#fff';
  // Paper outline
  if (progress > 0.05) {
    const paperProgress = Math.min((progress - 0.05) / 0.3, 1);
    const w = 110, h = 140;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    let paperLen = 2 * (w + h);
    ctx.setLineDash([paperLen * paperProgress, paperLen]);
    ctx.stroke();
    ctx.setLineDash([]);
    if (paperProgress === 1) {
      ctx.fill();
    }
  }
  // Draw pencil (animated body, tip, and eraser)
  if (progress > 0.4) {
    const pencilProgress = Math.min((progress - 0.4) / 0.6, 1);
    ctx.save();
    ctx.translate(x + 150, y + 50);
    ctx.rotate(0.18);
    // Pencil body
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 60 * pencilProgress);
    ctx.lineTo(18, 60 * pencilProgress);
    ctx.lineTo(18, 0);
    ctx.closePath();
    let bodyLen = 2 * 60 + 2 * 18;
    ctx.setLineDash([bodyLen * pencilProgress, bodyLen]);
    ctx.strokeStyle = '#f4c542';
    ctx.stroke();
    ctx.setLineDash([]);
    if (pencilProgress === 1) {
      ctx.fillStyle = '#f4c542';
      ctx.fill();
      // Pencil tip
      ctx.beginPath();
      ctx.moveTo(0, 60);
      ctx.lineTo(9, 80);
      ctx.lineTo(18, 60);
      ctx.closePath();
      ctx.strokeStyle = '#b8860b';
      ctx.fillStyle = '#b8860b';
      ctx.stroke();
      ctx.fill();
      // Eraser
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(18, 0);
      ctx.lineTo(18, -14);
      ctx.lineTo(0, -14);
      ctx.closePath();
      ctx.strokeStyle = '#e57373';
      ctx.fillStyle = '#e57373';
      ctx.stroke();
      ctx.fill();
      // Metal band
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(18, 0);
      ctx.lineTo(18, -5);
      ctx.lineTo(0, -5);
      ctx.closePath();
      ctx.strokeStyle = '#b0b0b0';
      ctx.fillStyle = '#b0b0b0';
      ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  }
  ctx.restore();
}