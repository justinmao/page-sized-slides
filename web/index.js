window.addEventListener('load', function() {

  pss.setPageInit('p1', function() {
    document.getElementById('bg').style.backgroundColor = '#AB82FF';
  });
  pss.setPageInit('p2', function() {
    document.getElementById('bg').style.backgroundColor = '#FF926B';
    setTimeout(function() {
      document.getElementById('p2').style.opacity = 1;
    }, 400);
  });
  pss.setPageInit('p3', function() {
    document.getElementById('bg').style.backgroundColor = '#F4E26E';
    setTimeout(function() {
      document.getElementById('p3').style.opacity = 1;
    }, 400);
  });
  pss.setPageInit('p4', function() {
    document.getElementById('bg').style.backgroundColor = '#CDFF77';
    setTimeout(function() {
      document.getElementById('p4').style.opacity = 1;
    }, 400);
  });
  pss.setPageInit('p5', function() {
    document.getElementById('bg').style.backgroundColor = '#35D3FF';
    setTimeout(function() {
      document.getElementById('p5').style.opacity = 1;
      setTimeout(function() {
        document.getElementById('github').style.opacity = 1;
      }, 800);
    }, 400);
  });

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('instructions').innerHTML = 'SWIPE UP';
    document.getElementById('nav').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  } else {
    document.getElementById('instructions').innerHTML = 'SCROLL DOWN';
  }

  setTimeout(function() {
    document.getElementById('instructions').style.opacity = 1;
  }, 800);

}, false);
