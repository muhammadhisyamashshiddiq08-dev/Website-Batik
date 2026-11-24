// =====================================================
// PRELOADER
// =====================================================
window.addEventListener('load', function() {
  var preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(function() {
      preloader.classList.add('hidden');
    }, 500);
  }
});

// =====================================================
// AOS INIT
// =====================================================
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: 'ease-out-cubic'
});

// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================
var navbar = document.querySelector('.batik-navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =====================================================
// SCROLLSPY
// =====================================================
var navLinks = document.querySelectorAll('#menuNavbar .nav-link');
var sections = document.querySelectorAll('section[id]');

function updateScrollspy() {
  var current = '';
  var scrollY = window.scrollY + 120;

  sections.forEach(function(section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (href === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateScrollspy);
window.addEventListener('load', function() {
  setTimeout(updateScrollspy, 100);
});

// =====================================================
// COUNTER ANIMATION
// =====================================================
var statNumbers = document.querySelectorAll('.stat-number');
var animated = false;

function animateCounters() {
  var statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;
  var rect = statsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100 && !animated) {
    animated = true;
    statNumbers.forEach(function(stat) {
      var target = parseInt(stat.getAttribute('data-count'));
      var current = 0;
      var increment = target / 60;
      var timer = setInterval(function() {
        current += increment;
        if (current >= target) {
          stat.textContent = target + (target >= 100 ? '+' : '');
          clearInterval(timer);
        } else {
          stat.textContent = Math.round(current);
        }
      }, 30);
    });
  }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', function() {
  setTimeout(animateCounters, 500);
});

// =====================================================
// CHAT NOTIFICATION
// =====================================================
var chatNotification = document.getElementById('chatNotification');
var notificationShown = false;

function showChatNotification() {
  if (!notificationShown && chatNotification) {
    chatNotification.classList.add('show');
    notificationShown = true;

    setTimeout(function() {
      chatNotification.classList.remove('show');
    }, 10000);
  }
}

function closeChatNotification() {
  if (chatNotification) {
    chatNotification.classList.remove('show');
  }
}

function openWhatsApp() {
  var phoneNumber = '6288219687504';
  var message = 'Halo Batik Nusantara! Saya tertarik dengan produk batik Anda.';
  window.open('https://wa.me/' + phoneNumber + '?text=' + message, '_blank');
  closeChatNotification();
}

window.addEventListener('load', function() {
  setTimeout(function() {
    showChatNotification();
  }, 2000);
});

// =====================================================
// WHATSAPP WIDGET
// =====================================================
function loadWhatsAppWidget() {
  var widgetContainer = document.querySelector('.elfsight-app-e889a1bb-dd6b-4230-91c2-865bcbadecd2');
  if (widgetContainer && widgetContainer.children.length > 0) {
    return;
  }

  var script = document.createElement('script');
  script.src = 'https://elfsightcdn.com/platform.js';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    loadWhatsAppWidget();
  }, 1000);
});

setTimeout(function() {
  var widget = document.querySelector('.elfsight-app-e889a1bb-dd6b-4230-91c2-865bcbadecd2');
  var fallback = document.getElementById('whatsapp-fallback');
  
  if (!widget || widget.children.length === 0) {
    if (fallback) {
      fallback.style.display = 'block';
      setTimeout(function() {
        var widgetCheck = document.querySelector('.elfsight-app-e889a1bb-dd6b-4230-91c2-865bcbadecd2');
        if (widgetCheck && widgetCheck.children.length > 0) {
          fallback.style.display = 'none';
        }
      }, 5000);
    }
  }
}, 3000);

// =====================================================
// HERO PARALLAX
// =====================================================
var parallaxBg = document.getElementById('parallaxBg');
var heroParallaxTimeout = null;

function updateHeroParallax() {
  if (!parallaxBg) return;
  var scrolled = window.pageYOffset;
  var rate = scrolled * 0.3;
  parallaxBg.style.transform = 'scale(1.1) translateY(' + rate + 'px)';
}

if (parallaxBg) {
  window.addEventListener('scroll', function() {
    if (heroParallaxTimeout) {
      cancelAnimationFrame(heroParallaxTimeout);
    }
    heroParallaxTimeout = requestAnimationFrame(updateHeroParallax);
  });
  
  setTimeout(updateHeroParallax, 100);
}

// =====================================================
// GALLERY PARALLAX
// =====================================================
var galleryParallaxBg = document.getElementById('galleryParallaxBg');
var galleryParallaxTimeout = null;

function updateGalleryParallax() {
  if (!galleryParallaxBg) return;
  
  var scrolled = window.pageYOffset;
  var gallerySection = document.querySelector('.gallery-section');
  if (!gallerySection) return;
  
  var rect = gallerySection.getBoundingClientRect();
  var sectionTop = rect.top + window.pageYOffset;
  var sectionHeight = gallerySection.offsetHeight;
  var windowHeight = window.innerHeight;
  
  var scrollProgress = (window.pageYOffset + windowHeight - sectionTop) / (sectionHeight + windowHeight);
  var clampedProgress = Math.max(0, Math.min(1, scrollProgress));
  var translateY = -60 + (clampedProgress * 120);
  var scale = 1.1 + (clampedProgress * 0.05);
  
  galleryParallaxBg.style.transform = 'scale(' + scale + ') translateY(' + translateY + 'px)';
}

if (galleryParallaxBg) {
  window.addEventListener('scroll', function() {
    if (galleryParallaxTimeout) {
      cancelAnimationFrame(galleryParallaxTimeout);
    }
    galleryParallaxTimeout = requestAnimationFrame(updateGalleryParallax);
  });
  
  window.addEventListener('load', function() {
    setTimeout(updateGalleryParallax, 200);
  });
  
  window.addEventListener('resize', function() {
    updateGalleryParallax();
  });
}

// =====================================================
// PARTICLE CANVAS
// =====================================================
function initParticles() {
  var canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  
  var ctx = canvas.getContext('2d');
  var width, height;
  var particles = [];
  var particleCount = 60;
  var mouseX = null;
  var mouseY = null;

  function resize() {
    var section = canvas.closest('.parallax-section');
    if (section) {
      width = section.offsetWidth;
      height = section.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }
  }

  function Particle() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;
  }

  Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (mouseX !== null && mouseY !== null) {
      var dx = mouseX - this.x;
      var dy = mouseY - this.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var maxDistance = 150;
      
      if (distance < maxDistance) {
        var force = (maxDistance - distance) / maxDistance * 0.5;
        this.x -= dx * force * 0.02;
        this.y -= dy * force * 0.02;
      }
    }

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(212, 164, 71, ' + this.opacity + ')';
    ctx.fill();
    
    if (this.size > 1.5) {
      ctx.shadowColor = 'rgba(212, 164, 71, 0.1)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  };

  function initParticlesArray() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var maxDistance = 120;
        
        if (distance < maxDistance) {
          var opacity = (1 - distance / maxDistance) * 0.2;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(212, 164, 71, ' + opacity + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(function(particle) {
      particle.update();
      particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animate);
  }

  function handleMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }

  function handleMouseLeave() {
    mouseX = null;
    mouseY = null;
  }

  function handleTouchMove(e) {
    var rect = canvas.getBoundingClientRect();
    var touch = e.touches[0];
    if (touch) {
      mouseX = touch.clientX - rect.left;
      mouseY = touch.clientY - rect.top;
    }
  }

  function handleTouchEnd() {
    mouseX = null;
    mouseY = null;
  }

  resize();
  initParticlesArray();
  animate();

  window.addEventListener('resize', function() {
    resize();
    initParticlesArray();
  });

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  canvas.addEventListener('touchmove', handleTouchMove);
  canvas.addEventListener('touchend', handleTouchEnd);
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initParticles, 500);
});

// =====================================================
// SCROLL INDICATOR
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
  var scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      var nextSection = document.querySelector('#koleksi');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// =====================================================
// DATA PRODUK
// =====================================================
var productData = [
  {
    id: 1,
    name: 'Batik Parang Klasik',
    category: 'Batik Pria',
    price: 'Rp350.000',
    image: 'https://i.imgur.com/AwJI85d.png',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Parang%20Klasik',
    tags: ['parang', 'klasik', 'tradisional', 'pria'],
    description: 'Batik dengan motif Parang klasik yang elegan dan khas Nusantara. Cocok untuk acara formal maupun santai. Terbuat dari bahan katun premium yang nyaman dipakai.'
  },
  {
    id: 2,
    name: 'Batik Kawung Elegan',
    category: 'Batik Wanita',
    price: 'Rp400.000',
    image: 'https://i.imgur.com/M7W80vd.png',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Kawung%20Elegan',
    tags: ['kawung', 'elegan', 'tradisional', 'wanita'],
    description: 'Motif Kawung yang memiliki bentuk khas dan tampilan yang elegan. Sangat cocok untuk acara-acara penting dan memberikan kesan anggun.'
  },
  {
    id: 3,
    name: 'Batik Mega Mendung',
    category: 'Batik Tradisional',
    price: 'Rp450.000',
    image: 'https://i.imgur.com/1mojc6k.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Mega%20Mendung',
    tags: ['mega mendung', 'cirebon', 'awan', 'tradisional'],
    description: 'Motif khas Cirebon dengan karakter awan yang unik dan menarik. Batik ini menggambarkan keindahan alam dan budaya Indonesia.'
  },
  {
    id: 4,
    name: 'Batik Modern Pria',
    category: 'Batik Pria',
    price: 'Rp380.000',
    image: 'https://i.imgur.com/cCBx0Sn.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Modern%20Pria',
    tags: ['modern', 'pria', 'elegan', 'formal'],
    description: 'Perpaduan motif klasik dengan sentuhan modern yang elegan. Cocok untuk pria modern yang ingin tampil beda dengan batik.'
  },
  {
    id: 5,
    name: 'Batik Ceplok',
    category: 'Batik Wanita',
    price: 'Rp420.000',
    image: 'https://i.imgur.com/0Y0Eya2.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Ceplok',
    tags: ['ceplok', 'wanita', 'tradisional', 'harmoni'],
    description: 'Motif ceplok dengan filosofi kesatuan dan keharmonisan. Sangat cocok untuk wanita yang ingin tampil anggun dan bermakna.'
  },
  {
    id: 6,
    name: 'Batik Lasem',
    category: 'Batik Tradisional',
    price: 'Rp480.000',
    image: 'https://i.imgur.com/SzYxABK.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Lasem',
    tags: ['lasem', 'pesisir', 'tradisional', 'warna-warni'],
    description: 'Batik Lasem dengan motif khas pesisir yang penuh warna dan cerita. Menggambarkan akulturasi budaya Jawa dan Tionghoa.'
  },
  {
    id: 7,
    name: 'Batik Sido Mukti',
    category: 'Batik Pria',
    price: 'Rp500.000',
    image: 'https://i.imgur.com/TziHTsS.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Sido%20Mukti',
    tags: ['sido mukti', 'pria', 'premium', 'kemakmuran'],
    description: 'Motif Sido Mukti melambangkan kemakmuran dan kebahagiaan. Batik premium yang cocok untuk acara-acara penting dan formal.'
  },
  {
    id: 8,
    name: 'Batik Tujuh Rupa',
    category: 'Batik Wanita',
    price: 'Rp430.000',
    image: 'https://i.imgur.com/Hex8bOv.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Tujuh%20Rupa',
    tags: ['tujuh rupa', 'pekalongan', 'wanita', 'cerah'],
    description: 'Motif tujuh rupa dari Pekalongan dengan warna-warna cerah dan ceria. Mencerminkan keindahan alam dan keragaman budaya.'
  },
  {
    id: 9,
    name: 'Batik Sogan',
    category: 'Batik Tradisional',
    price: 'Rp460.000',
    image: 'https://i.imgur.com/13FEJLH.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Sogan',
    tags: ['sogan', 'solo', 'tradisional', 'coklat'],
    description: 'Batik Sogan khas Solo dengan warna coklat alami yang elegan. Menggunakan pewarna alami dari pohon soga yang menghasilkan warna khas.'
  },
  {
    id: 10,
    name: 'Batik Keraton',
    category: 'Batik Pria',
    price: 'Rp550.000',
    image: 'https://i.imgur.com/D6iEIaq.jpeg',
    link: 'https://wa.me/6288219687504?text=Saya%20tertarik%20dengan%20Batik%20Keraton',
    tags: ['keraton', 'pria', 'eksklusif', 'klasik'],
    description: 'Motif klasik keraton dengan filosofi kebijaksanaan dan keagungan. Batik eksklusif untuk pria yang menginginkan kesan elegan dan berwibawa.'
  }
];

// =====================================================
// SEARCH FUNCTIONALITY
// =====================================================
function toggleSearch() {
  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  
  if (overlay.classList.contains('active')) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (input) input.value = '';
    document.getElementById('searchResults').innerHTML = '';
  } else {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      if (input) input.focus();
    }, 300);
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var overlay = document.getElementById('searchOverlay');
    if (overlay.classList.contains('active')) {
      toggleSearch();
    }
  }
});

function searchProducts() {
  var query = document.getElementById('searchInput').value.trim().toLowerCase();
  var resultsContainer = document.getElementById('searchResults');
  
  if (query === '') {
    resultsContainer.innerHTML = '';
    return;
  }

  var results = productData.filter(function(product) {
    var searchableText = (product.name + ' ' + product.category + ' ' + product.tags.join(' ')).toLowerCase();
    return searchableText.includes(query);
  });

  if (results.length === 0) {
    resultsContainer.innerHTML = 
      '<div class="search-no-result">' +
        '<i class="bi bi-search"></i>' +
        '<p>Produk "' + query + '" tidak ditemukan</p>' +
        '<small style="color: rgba(255,255,255,0.3);">Coba cari: parang, kawung, mega mendung</small>' +
      '</div>';
    return;
  }

  var html = '';
  results.forEach(function(product) {
    html += 
      '<div class="search-result-item" onclick="showProductDetail(' + product.id + ')">' +
        '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.src=\'https://placehold.co/50x50/8B1A1A/ffffff?text=' + product.name.charAt(0) + '\'">' +
        '<div class="result-info">' +
          '<h5>' + product.name + '</h5>' +
          '<p>' + product.category + '</p>' +
        '</div>' +
        '<div class="result-price">' + product.price + '</div>' +
        '<i class="bi bi-chevron-right"></i>' +
      '</div>';
  });

  resultsContainer.innerHTML = html;
}

// =====================================================
// SHOW PRODUCT DETAIL
// =====================================================
function showProductDetail(productId) {
  var product = productData.find(function(p) { return p.id === productId; });
  if (!product) return;

  var imgElement = document.getElementById('productDetailImage');
  
  imgElement.src = product.image;
  imgElement.onerror = function() {
    this.src = 'https://placehold.co/600x600/8B1A1A/ffffff?text=' + encodeURIComponent(product.name);
  };
  
  document.getElementById('productDetailName').textContent = product.name;
  document.getElementById('productDetailCategory').textContent = product.category;
  document.getElementById('productDetailPrice').textContent = product.price;
  document.getElementById('productDetailDescription').textContent = product.description;
  document.getElementById('productDetailLink').href = product.link;

  var descElement = document.getElementById('productDetailDescription');
  if (descElement) {
    descElement.style.display = 'block';
    descElement.style.visibility = 'visible';
    descElement.style.opacity = '1';
  }

  var overlay = document.getElementById('searchOverlay');
  if (overlay.classList.contains('active')) {
    toggleSearch();
  }

  var modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
  modal.show();
}

document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchProducts();
  }
});

document.getElementById('searchOverlay').addEventListener('click', function(e) {
  if (e.target === this) {
    toggleSearch();
  }
});

// =====================================================
// FILTER PRODUCTS
// =====================================================
function filterProducts(category) {
  var buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function(btn) {
    btn.classList.remove('active');
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    }
  });

  var products = document.querySelectorAll('.product-item');

  products.forEach(function(product) {
    var productCategory = product.getAttribute('data-category');
    
    if (category === 'all' || productCategory === category) {
      product.classList.remove('hide');
      product.classList.add('show');
    } else {
      product.classList.remove('show');
      product.classList.add('hide');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var products = document.querySelectorAll('.product-item');
  products.forEach(function(product) {
    product.classList.add('show');
    product.classList.remove('hide');
  });
});

// =====================================================
// NAVBAR COLLAPSE
// =====================================================
document.querySelectorAll('#menuNavbar .nav-link').forEach(function(link) {
  link.addEventListener('click', function() {
    var menu = document.getElementById('menuNavbar');
    var collapse = bootstrap.Collapse.getInstance(menu);
    if (collapse) {
      collapse.hide();
    }
  });
});

// =====================================================
// FORM HANDLING
// =====================================================
var contactForm = document.getElementById('contactForm');
var formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    var nama = document.getElementById('nama').value.trim();
    var email = document.getElementById('email').value.trim();
    var pesan = document.getElementById('pesan').value.trim();

    if (!nama || !email || !pesan) {
      contactForm.classList.add('was-validated');
      formSuccess.classList.add('d-none');
      return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      contactForm.classList.add('was-validated');
      formSuccess.classList.add('d-none');
      return;
    }

    var phoneNumber = '6288219687504';
    var message = 'Halo Batik Nusantara!%0A%0A' +
      '*Nama:* ' + nama + '%0A' +
      '*Email:* ' + email + '%0A' +
      '*Pesan:* ' + pesan + '%0A%0A' +
      'Terima kasih.';

    window.open('https://wa.me/' + phoneNumber + '?text=' + message, '_blank');

    formSuccess.classList.remove('d-none');
    contactForm.reset();
    contactForm.classList.remove('was-validated');

    setTimeout(function() {
      formSuccess.classList.add('d-none');
    }, 7000);
  });
}