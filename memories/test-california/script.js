$(function() {
  const $scene = $('#scene');
  const $sun = $('#sun');
  const $type = $('#typeText');
  const $sub = $('#typeSub');
  const fullText = 'california 2010';
  const subText = 'a summer to remember';
  const typingSpeed = 110;
  const delayBetween = 600;
  let charIndex = 0;

  function typeMain() {
    if (charIndex <= fullText.length) {
      $type.text(fullText.slice(0, charIndex));
      charIndex++;
      setTimeout(typeMain, typingSpeed);
    } else {
      // After main title, type subtitle
      setTimeout(typeSubtitle, delayBetween);
    }
  }

  function typeSubtitle() {
    let i = 0;
    function step() {
      if (i <= subText.length) {
        $sub.text(subText.slice(0, i));
        i++;
        setTimeout(step, typingSpeed);
      }
    }
    step();
  }

  setTimeout(typeMain, 600);

  $sun.on('click', function() {
    $scene.toggleClass('sunset');
  });

  $('#backButton').on('click', function() {
    window.history.back();
  });
});
