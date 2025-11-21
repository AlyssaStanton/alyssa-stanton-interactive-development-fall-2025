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

  // Click a cloud to TOGGLE rain on/off
  $('.cloud').on('click', function () {
    // small visual feedback
    var $c = $(this);
    $c.addClass('pressed');
    setTimeout(function () { $c.removeClass('pressed'); }, 180);

    // trigger the same toggle as the button to toggle rain state
    $('#rain-toggle').trigger('click');
  });

  // optional: start with no rain. If you want rain by default, enable next line:
  // $('#rain-toggle').trigger('click');

  // After the main title finishes its CSS type animation, start the caption typewriter
  var captionText = 'Rainy days and beautiful scenery';
  var $captionContainer = $('.caption-type');
  var $captionSpan = $('.caption-type .caption-text');
  $('.title-type .text').on('animationend', function () {
    // reveal caption container
    $captionContainer.attr('aria-hidden', 'false').css('visibility', 'visible');
    $captionSpan.text('');
    var i = 0;
    var t = 45; // ms per character
    var typer = setInterval(function () {
      $captionSpan.text($captionSpan.text() + captionText.charAt(i));
      i++;
      if (i >= captionText.length) {
        clearInterval(typer);
      }
    }, t);
  });
});

// Scene navigation (Back / Next) — navigate to data-href or href when present
$(function () {
  $(document).on('click', '.scene-nav', function (e) {
    e.preventDefault();
    var target = $(this).attr('data-href') || $(this).attr('href');
    if (target && target !== '#') {
      console.log('scene-nav: navigating to', target);
      window.location.href = target;
    } else {
      console.log('scene-nav clicked but no valid target set for', $(this).text());
    }
  });
});
