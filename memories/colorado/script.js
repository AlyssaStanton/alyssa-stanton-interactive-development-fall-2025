$(function() {
  let blizzardActive = false;
  let snowInterval;
  let wind = 0;
  let lastX = null;

  // Track mouse horizontal motion -> sets wind strength and direction
  $(window).on('mousemove', function(e) {
    if (lastX !== null) {
      let delta = e.pageX - lastX;
      wind = Math.max(-250, Math.min(250, delta * 6));
    }
    lastX = e.pageX;
  });

  // Create a snowflake and animate it with wind drift
  function createFlake() {
    const $flake = $('<div class="snowflake"></div>');
    const startX = Math.random() * $(window).width();
    const size = 4 + Math.random() * 10;
    const duration = 5000 + Math.random() * 7000;
    const windDrift = wind + (Math.random() - 0.5) * 100;
    const endX = startX + windDrift;

    $flake.css({
      left: startX + 'px',
      width: size + 'px',
      height: size + 'px',
      opacity: 0.8 + Math.random() * 0.2
    });

    $('#snow').append($flake);

    $flake.animate({
      top: $(window).height() + 10,
      left: endX,
      opacity: 0.5
    }, duration, 'linear', function() {
      $(this).remove();
    });
  }

  // Blizzard control
  function startBlizzard() {
    if (blizzardActive) return;
    blizzardActive = true;
    $('#clouds').addClass('active');
    snowInterval = setInterval(() => {
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) createFlake();
    }, 100);
  }

  function stopBlizzard() {
    blizzardActive = false;
    $('#clouds').removeClass('active');
    clearInterval(snowInterval);
  }

  $('#clouds').on('click', function() {
    blizzardActive ? stopBlizzard() : startBlizzard();
  });

  // Gentle idle snow
  for (let i = 0; i < 10; i++) createFlake();

  // Typewriter effect for the Colorado title
  (function runTypewriter() {
    const $el = $('#colorado-title');
    const $sub = $('#colorado-sub');
    if (!$el.length) return;
  const full = $el.text().trim();
    $el.text('');
    $el.addClass('typewriter');
    let i = 0;
    const speed = 80; // ms per character for main
    const subSpeed = 45; // faster for subheading
    const timer = setInterval(() => {
      $el.text(full.slice(0, i+1));
      i++;
      if (i >= full.length) {
        clearInterval(timer);
        // start subheading typewriter shortly after (read text at this moment)
        if ($sub.length) {
          const subFullNow = $sub.text().trim();
          if (subFullNow) {
              setTimeout(() => {
                // reveal visually and for assistive tech just before typing
                $sub.css('visibility', 'visible').attr('aria-hidden', 'false');
                $sub.addClass('typewriter').text('');
              let j = 0;
              const subTimer = setInterval(() => {
                $sub.text(subFullNow.slice(0, j+1));
                j++;
                if (j >= subFullNow.length) {
                  clearInterval(subTimer);
                  // keep sub cursor flashing via CSS ::after
                }
              }, subSpeed);
            }, 250);
          }
        }
      }
    }, speed);
  })();
  
  // Day / Night toggle behavior
  const $dayToggle = $('#dayToggle');
  if ($dayToggle.length) {
    // initialize state from body class
    const isNight = $('body').hasClass('night');
    $dayToggle.attr('aria-pressed', isNight ? 'true' : 'false');
    if (isNight) $dayToggle.addClass('moon');

    $dayToggle.on('click', function() {
      const $b = $('body');
      const nightNow = $b.hasClass('night');
      if (nightNow) {
        // switch to day: remove class and restore SVG fills
        $b.removeClass('night');
        $dayToggle.attr('aria-pressed', 'false').removeClass('moon').text('');
        // revert SVG fills to daytime gradients
        try {
          const svg = document.querySelector('.mountains');
          if (svg) {
            const rect = svg.querySelector('rect');
            if (rect) rect.setAttribute('fill', 'url(#sky)');
            const far = svg.querySelector('path[fill^="url(#far-mount)"]') || svg.querySelector('path:nth-of-type(2)');
            const mid = svg.querySelector('path[fill^="url(#mid-mount)"]') || svg.querySelector('path:nth-of-type(3)');
            const front = svg.querySelector('#front-mountain');
            if (far) far.setAttribute('fill', 'url(#far-mount)');
            if (mid) mid.setAttribute('fill', 'url(#mid-mount)');
            if (front) front.setAttribute('fill', 'url(#front-mount)');
          }
        } catch (e) { console.warn('SVG revert failed', e); }
      } else {
        // switch to night: apply class and swap SVG gradients for richer colors
        $b.addClass('night');
        $dayToggle.attr('aria-pressed', 'true').addClass('moon').text('');
        try {
          const svg = document.querySelector('.mountains');
          if (svg) {
            const rect = svg.querySelector('rect');
            if (rect) rect.setAttribute('fill', 'url(#night-sky)');
            const paths = svg.querySelectorAll('path');
            // assume ordering: background, mid, front
            if (paths && paths.length >= 3) {
              paths[0].setAttribute('fill', 'url(#night-far-mount)');
              paths[1].setAttribute('fill', 'url(#night-mid-mount)');
              // front mountain has id #front-mountain and is often the 3rd path
              const front = svg.querySelector('#front-mountain') || paths[2];
              if (front) front.setAttribute('fill', 'url(#night-front-mount)');
            }
          }
        } catch (e) { console.warn('SVG night swap failed', e); }
      }
    });
  }
});
$('#backButton').on('click', function() {
  history.back();
});
