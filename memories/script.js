$(document).ready(function() {
  console.log('house-of-memories-test: script ready');
  // Simple jQuery fade-in effect for timeline items
  $('.timeline-item').each(function(index) {
    $(this).delay(200 * index).fadeIn(800);
  });

  // Initially hide subcategories
  $('.subcategories').hide();

  // Ensure year links don't navigate away and are easy to inspect
  var $yearLinks = $('.timeline-item h2 .year-link');
  $yearLinks.attr('role', 'link');
  // handle year links: prefer data-href for JS navigation; otherwise allow real hrefs
  $(document).on('click', '.year-link', function(e) {
    var dataHref = $(this).attr('data-href');
    if (dataHref) {
      console.log('year-link navigation requested to data-href:', dataHref);
      window.location.href = dataHref;
      return;
    }
    var hrefAttr = $(this).attr('href');
    // If the link has a real href (not '#'), allow the browser to navigate
    if (hrefAttr && hrefAttr !== '#') {
      console.log('year-link default navigation to href:', hrefAttr);
      return; // don't preventDefault
    }
    // Otherwise it's a placeholder link — prevent navigation and log
    e.preventDefault();
    console.log('year-link clicked (no target):', $(this).text());
  });

  // Prevent navigation for subcategory links and log clicks
  $(document).on('click', '.sub-link', function(e) {
    e.preventDefault();
    console.log('sub-link clicked:', $(this).text());
    // Optional: you could expand its parent timeline item here if desired
  });

  // Use a dedicated toggle button for reliability
  var $toggle = $('.toggle-sub');
  $toggle.on('click', function(e) {
    e.preventDefault();
    try {
      console.log('toggle-sub clicked', { target: e.target });
      var $item = $(this).closest('.timeline-item');
      var $sub = $item.find('.subcategories').first();
      if (!$sub.length) {
        console.warn('toggle-sub: no subcategories found');
        return;
      }
      var wasVisible = $sub.is(':visible');
      $sub.stop(true, true).slideToggle(200);
  var newExpanded = (!wasVisible).toString();
  $(this).attr('aria-expanded', newExpanded);
  // reflect expanded state on the heading link too
  $item.find('h2 .year-link').attr('aria-expanded', newExpanded);
      console.log('toggle-sub: toggled; newExpanded=', newExpanded);
    } catch (err) {
      console.error('Error in toggle-sub click handler:', err);
    }
  });
});
