// script.js — uses jQuery (loaded in the HTML)
$(function () {
  const $rain = $('#rain');
  const drops = 60; // number of raindrops to create

  // create raindrops with randomized properties
  for (let i = 0; i < drops; i++) {
    const left = Math.random() * 100; // percent
    const delay = (Math.random() * -10).toFixed(2) + 's';
    const duration = (0.9 + Math.random() * 1.6).toFixed(2) + 's';
    const scale = (0.6 + Math.random() * 1.0).toFixed(2);
    const height = (10 + Math.random() * 28).toFixed(0) + 'px';

    const $d = $('<span class="drop"></span>');
    $d.css({
      left: left + '%',
      animationDelay: delay,
      animationDuration: duration,
      transform: 'scaleX(' + scale + ')',
      height: height
    });
    $rain.append($d);
  }

  // toggle button
  let raining = false;
  $('#rain-toggle').on('click', function () {
    raining = !raining;
    $rain.toggleClass('active', raining);
    $(this).text(raining ? 'Turn Rain Off' : 'Toggle Rain');
  });

  // optional: start with no rain. If you want rain by default, enable next line:
  // $('#rain-toggle').trigger('click');
});
