$(document).ready(function() {
  console.log('house-of-memories-test: script ready');
  
  // jQuery fade-in effect for timeline items (I learned this on my own, please permit! Thank you.)
  $('.timeline-item').each(function(index) {
    $(this).delay(200 * index).fadeIn(800);
  });

  // Initially hide subcategories for 2010 Oregon and California
  $('.subcategories').hide();

  // Ensure year links don't navigate away and are easy to inspect (earlier problem)
  const $yearLinks = $('.timeline-item h2 .year-link');
  $yearLinks.attr('role', 'link');
  
  $(document).on('click', '.year-link', function(e) {
    const dataHref = $(this).attr('data-href');
    if (dataHref) {
      console.log('year-link navigation requested to data-href:', dataHref);
      window.location.href = dataHref;
      return;
    }
    const hrefAttr = $(this).attr('href');
   
    if (hrefAttr && hrefAttr !== '#') {
      console.log('year-link default navigation to href:', hrefAttr);
      return; 
    }
    
    e.preventDefault();
    console.log('year-link clicked (no target):', $(this).text());
  });

  // Allow sub-link navigation
  $(document).on('click', '.sub-link', function(e) {
    const hrefAttr = $(this).attr('href');
    if (hrefAttr && hrefAttr !== '#') {
      console.log('sub-link navigation to href:', hrefAttr);
      return; // Allow navigation
    }
    e.preventDefault();
    console.log('sub-link clicked (no target):', $(this).text());
  });

  // Allows a dedicated toggle button for reliability
  const $toggle = $('.toggle-sub');
  $toggle.on('click', function(e) {
    e.preventDefault();
    try {
      console.log('toggle-sub clicked', { target: e.target });
      const $item = $(this).closest('.timeline-item');
      const $sub = $item.find('.subcategories').first();
      if (!$sub.length) {
        console.warn('toggle-sub: no subcategories found');
        return;
      }
      const wasVisible = $sub.is(':visible');
      $sub.stop(true, true).slideToggle(200);
      const newExpanded = (!wasVisible).toString();
      $(this).attr('aria-expanded', newExpanded);
      // To reflect expanded state on the heading link too
      $item.find('h2 .year-link').attr('aria-expanded', newExpanded);
      console.log('toggle-sub: toggled; newExpanded=', newExpanded);
    } catch (err) {
      console.error('Error in toggle-sub click handler:', err);
    }
  });
});