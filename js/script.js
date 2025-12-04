/* SUNCITY WATERPARK - COMPLETE JAVASCRIPT */
/* Semua fungsi lengkap dalam satu file */

(function() {
  'use strict';

  // Initialize GSAP Particles (Floating Bubbles)
  const initParticles = () => {
    const container = document.getElementById('tsparticles');
    if (!container || typeof gsap === 'undefined') return;

    // Clear container
    container.innerHTML = '';
    container.style.overflow = 'hidden';

    const particleCount = 120; // Increased count for more liveliness
    const gradients = [
      'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', // Warm Pink (Fun)
      'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', // Purple Pink (Magic)
      'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', // Aqua Blue (Water)
      'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', // Orange Purple (Sunset)
      'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', // Soft Purple Blue (Sky)
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', // Peach (Warmth)
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'  // Mint Pink (Fresh)
    ];

    const particleElements = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 20 + 10; // Larger: 10-30px
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = gradients[Math.floor(Math.random() * gradients.length)];
      particle.style.borderRadius = '50%';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = '110%'; // Start below
      particle.style.pointerEvents = 'none';
      
      // Add blur for depth effect
      particle.style.filter = `blur(${Math.random() * 2}px)`;
      
      container.appendChild(particle);

      // Rising Animation (Bottom to Top)
      const riseDuration = gsap.utils.random(10, 20); // Faster: 10-20s
      
      gsap.fromTo(particle, 
        {
          top: '110%',
          opacity: 0,
          scale: 0.5
        },
        {
          top: '-10%',
          duration: riseDuration,
          ease: 'none',
          repeat: -1,
          delay: gsap.utils.random(-25, 0),
          onRepeat: () => {
             particle.style.left = `${Math.random() * 100}%`;
          },
          keyframes: {
            "0%":   { opacity: 0, scale: 0.5 },
            "10%":  { opacity: gsap.utils.random(0.6, 0.9), scale: 1 },
            "80%":  { opacity: gsap.utils.random(0.6, 0.9), scale: 1 },
            "100%": { opacity: 0, scale: 0 }
          }
        }
      );

      // Wobbly Motion
      gsap.to(particle, {
        x: `random(-40, 40)`, // More wobble
        duration: `random(2, 4)`,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      particleElements.push({ el: particle, hovered: false });
    }

    // Mouse Interaction
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particleElements.forEach(p => {
        const rect = p.el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - centerX, mouseY - centerY);
        
        if (dist < 150) {
          if (!p.hovered) {
            p.hovered = true;
            gsap.to(p.el, { 
              scale: 1.5, 
              opacity: 1, 
              filter: 'blur(0px)',
              duration: 0.4, 
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        } else {
          if (p.hovered) {
            p.hovered = false;
            gsap.to(p.el, { 
              scale: 1, 
              opacity: 0.8, 
              filter: `blur(${Math.random() * 2}px)`,
              duration: 0.6, 
              ease: 'power2.inOut'
            });
          }
        }
      });
    });
  };

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initParticles();
    });
  } else {
    initParticles();
  }

  // Navbar Active State
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.navbar .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const isActive = path === href.toLowerCase();
    if (isActive) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ================================
  // FORM VALIDATION
  // ================================
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          const original = btn.textContent;
          btn.disabled = true;
          btn.textContent = 'Memproses...';
          setTimeout(() => {
            alert('Reservasi terkirim! Kami akan menghubungi Anda via WhatsApp/Telepon.');
            btn.disabled = false;
            btn.textContent = original;
            form.reset();
          }, 800);
        }
      }
      form.classList.add('was-validated');
    });
  }

  // ================================
  // PAYMENT SYSTEM
  // ================================
  const packages = {
    single: {
      silver: { name: 'Single Silver Package', price: 30000, description: 'Paket individual basic untuk 1 orang' },
      golden: { name: 'Single Golden Package', price: 50000, description: 'Paket individual lengkap untuk 1 orang' },
      platinum: { name: 'Single Platinum Package', price: 70000, description: 'Paket individual premium untuk 1 orang' }
    },
    family: {
      silver: { name: 'Family Silver Package', price: 80000, description: 'Paket hemat untuk 2 anak & 2 dewasa' },
      gold: { name: 'Family Gold Package', price: 130000, description: 'Paket lengkap untuk 3 anak & 2 dewasa' },
      platinum: { name: 'Family Platinum Package', price: 150000, description: 'Paket premium untuk 3 anak & 3 dewasa' }
    },
    outbound: {
      bronze: { name: 'Outbound Package (30 Orang)', price: 1500000, description: 'Paket Outbound untuk 30 Orang' },
      silver: { name: 'Outbound Package (50 Orang)', price: 2500000, description: 'Paket Outbound untuk 50 Orang' },
      golden: { name: 'Outbound Package (100 Orang)', price: 5000000, description: 'Paket Outbound untuk 100 Orang' }
    }
  };

  let selectedTier = 'single';
  let selectedPackage = 'silver';
  let quantities = { silver: 0, gold: 0, golden: 0, platinum: 0 };
  let selectedPayment = 'gopay'; // Default payment method

  function selectPayment(paymentType) {
    document.querySelectorAll('.payment-option').forEach(option => {
      option.classList.remove('selected');
    });
    const selectedOption = document.querySelector(`[data-payment="${paymentType}"]`);
    if (selectedOption) {
      selectedOption.classList.add('selected');
      selectedPayment = paymentType; // Update selected payment
    }
  }

  function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    if (!orderItems) return;
    
    orderItems.innerHTML = '';
    let subtotal = 0;

    Object.keys(quantities).forEach(type => {
      if (quantities[type] > 0 && packages[selectedTier] && packages[selectedTier][type]) {
        const packageInfo = packages[selectedTier][type];
        const itemTotal = quantities[type] * packageInfo.price;
        subtotal += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'summary-item';
        itemDiv.innerHTML = `
          <div>
            <div class="summary-item-title">${packageInfo.name}</div>
            <div class="summary-item-detail">${quantities[type]} paket x Rp${packageInfo.price.toLocaleString('id-ID')}</div>
          </div>
          <div class="summary-item-price">Rp${itemTotal.toLocaleString('id-ID')}</div>
        `;
        orderItems.appendChild(itemDiv);
      }
    });

    const discount = Math.round(subtotal * 0.05);
    const total = subtotal - discount;

    const discountEl = document.getElementById('discountAmount');
    if (discountEl) discountEl.textContent = `- Rp${discount.toLocaleString('id-ID')}`;
    const totalEl = document.getElementById('totalAmount');
    if (totalEl) totalEl.textContent = `Rp${total.toLocaleString('id-ID')}`;

    if (orderItems.children.length === 0) {
      orderItems.innerHTML = '<div class="summary-item"><div class="summary-item-title" style="color: #718096;">Belum ada paket dipilih</div></div>';
      if (totalEl) totalEl.textContent = 'Rp0';
      if (discountEl) discountEl.textContent = '- Rp0';
    }
  }

  // ================================
  // CAROUSEL FUNCTIONS
  // ================================
  function prevCard() {
    const activeCard = document.querySelector('.promo-card.active');
    const prevCard = document.querySelector('.promo-card.prev');
    if (prevCard && activeCard) {
      activeCard.classList.remove('active');
      prevCard.classList.add('active');
      activeCard.classList.add('prev');
      prevCard.classList.remove('prev');
    }
  }

  function nextCard() {
    const cards = document.querySelectorAll('.promo-card');
    const activeCard = document.querySelector('.promo-card.active');
    const allCards = Array.from(cards);
    const activeIndex = allCards.indexOf(activeCard);
    if (activeCard && activeIndex < allCards.length - 1) {
      const nextCard = allCards[activeIndex + 1];
      activeCard.classList.remove('active');
      nextCard.classList.add('active');
      activeCard.classList.add('prev');
      nextCard.classList.remove('prev');
    }
  }

  // ================================
  // DATE INITIALIZATION
  // ================================
  const visitDateEl = document.getElementById('visitDate');
  if (visitDateEl) {
    visitDateEl.valueAsDate = new Date();
  }

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = today.toLocaleDateString('id-ID', options);
  const visitDateDisplayEl = document.getElementById('visitDateDisplay');
  if (visitDateDisplayEl) visitDateDisplayEl.textContent = dateStr;

  // Function to update visit date display based on input
  function updateVisitDateDisplay() {
    const visitDate = document.getElementById('visitDate');
    const visitDateDisplay = document.getElementById('visitDateDisplay');
    if (visitDate && visitDateDisplay && visitDate.value) {
      const selectedDate = new Date(visitDate.value);
      const dateStr = selectedDate.toLocaleDateString('id-ID', options);
      visitDateDisplay.textContent = dateStr;
    }
  }

  // Add event listener for real-time update when date changes
  if (visitDateEl) {
    visitDateEl.addEventListener('change', updateVisitDateDisplay);
  }

  // ================================
  // NOTIFICATION SYSTEM
  // ================================
  function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => { if (notification.parentNode) notification.remove(); }, 300);
    }, 3000);
  }

  // Add Notification Styles
  const notificationStyle = document.createElement('style');
  notificationStyle.textContent = `
    .notification {
      position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
      border-radius: 12px; color: white; font-weight: 500; z-index: 10000;
      transform: translateX(100%); transition: transform 0.3s ease;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15); max-width: 300px; word-wrap: break-word;
    }
    .notification.show { transform: translateX(0); }
    .notification-success { background: linear-gradient(135deg, #48bb78, #38a169); }
    .notification-error { background: linear-gradient(135deg, #f56565, #e53e3e); }
    .notification-info { background: linear-gradient(135deg, #4299e1, #3182ce); }
  `;
  document.head.appendChild(notificationStyle);

  // ================================
  // ENHANCED SEARCH TICKETS FUNCTION - FITUR LENGKAP!
  // ================================
  function searchTickets() {
    console.log("🔍 Searching tickets...");

    const visitDate = document.getElementById('visitDate').value;
    const ticketType = document.getElementById('ticketType').value;

    if (!visitDate) {
      showNotification('Silakan pilih tanggal kunjungan!', 'error');
      return;
    }

    // Update visit date display in checkout section
    updateVisitDateDisplay();
    
    // Show ticket cards section
    const ticketCards = document.getElementById('ticketCards');
    if (ticketCards) {
      ticketCards.style.display = 'block';
    }
    
    // Filter tickets based on type
    const allTickets = document.querySelectorAll('.ticket-card-wrapper');
    allTickets.forEach(ticket => {
      const type = ticket.getAttribute('data-type').toLowerCase().replace(/\s+/g, '');
      
      // Determine target type based on selection
      let shouldShow = false;
      if (ticketType === 'family') {
        shouldShow = type === 'familypackage';
      } else if (ticketType === 'single') {
        shouldShow = type === 'singlepackage';
      } else if (ticketType === 'outbound') {
        shouldShow = type === 'outboundpackage';
      }
      
      if (shouldShow) {
        ticket.style.display = 'block';
        ticket.style.opacity = '0';
        ticket.style.transform = 'translateY(20px)';
        setTimeout(() => {
          ticket.style.transition = 'all 0.5s ease';
          ticket.style.opacity = '1';
          ticket.style.transform = 'translateY(0)';
        }, Math.random() * 300);
      } else {
        ticket.style.display = 'none';
      }
    });
    
    // Update price display
    const ticketPrice = document.getElementById('ticketPrice');
    if (ticketPrice) {
      const prices = {
        single: 'Rp30.000 - Rp70.000',
        family: 'Rp80.000 - Rp150.000',
        outbound: 'Rp1.500.000 - Rp5.000.000'
      };
      ticketPrice.value = prices[ticketType] || 'Pilih Paket';
    }
    
    // Add animation to search button
    const searchBtn = document.querySelector('.search-btn, .search-btn-blue');
    if (searchBtn) {
      searchBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        searchBtn.style.transform = 'scale(1)';
      }, 150);
    }
    
    // Show notification based on package type
    const packageNames = {
      family: 'Family',
      single: 'Single',
      outbound: 'Outbound'
    };
    const packageName = packageNames[ticketType] || ticketType;
    
    showNotification(`Menampilkan ${packageName} Package untuk tanggal ${new Date(visitDate).toLocaleDateString('id-ID')}`, 'success');
  }

  // ================================
  // ORDER & CHECKOUT FUNCTIONS
  // ================================
  function pesan(type, tier) {
    selectedTier = type;
    selectedPackage = tier;
    quantities = { silver: 0, gold: 0, golden: 0, platinum: 0 };
    quantities[tier] = 1;

    // Show checkout section below ticket cards
    const checkoutSection = document.getElementById('checkoutSection');
    if (checkoutSection) {
      checkoutSection.style.display = 'block';
    }

    // Display the selected package
    displaySelectedPackage(type, tier);

    updateOrderSummary();

    // Scroll to checkout
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
  }

  function displaySelectedPackage(type, tier) {
    const displayDiv = document.getElementById('selectedPackageDisplay');
    const qtyDisplay = document.getElementById('qty-display');
    if (!displayDiv || !packages[type] || !packages[type][tier]) return;

    const pkg = packages[type][tier];

    // Remove previous tier classes
    displayDiv.className = 'selected-package-display';

    // Add tier-specific class
    displayDiv.classList.add(tier);

    displayDiv.innerHTML = `
      <div class="selected-package-info">
        <div class="selected-package-header">
          <h4>${pkg.name}</h4>
        </div>
        <div class="selected-package-details">
          <p class="package-description">${pkg.description}</p>
          <div class="package-price-display">
            <span class="price-label">Harga per paket:</span>
            <span class="price-amount">Rp${pkg.price.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    `;

    // Update quantity display
    if (qtyDisplay) {
      qtyDisplay.textContent = quantities[tier];
    }
  }

  function updateQuantity(tier, change) {
    // Use the selected package tier for quantity updates
    const currentTier = selectedPackage || tier;
    if (quantities[currentTier] + change >= 1) { // Minimum 1 package
      quantities[currentTier] += change;

      // Update quantity display
      const qtyDisplay = document.getElementById('qty-display');
      if (qtyDisplay) {
        qtyDisplay.textContent = quantities[currentTier];
      }

      // Update the selected package display
      if (selectedTier && selectedPackage) {
        displaySelectedPackage(selectedTier, selectedPackage);
      }

      updateOrderSummary();
    }
  }

  function lanjutkanPembayaran() {
    const total = document.getElementById('totalAmount').textContent;
    if (total === 'Rp0') {
      showNotification('Silakan pilih minimal 1 paket!', 'error');
      return;
    }

    const btn = document.getElementById('checkoutBtn');
    const spinner = document.getElementById('checkoutSpinner');
    
    if (btn && spinner) {
      btn.disabled = true;
      spinner.style.display = 'inline-block';
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';
      
      setTimeout(() => {
        const paymentNames = {
          gopay: 'GoPay',
          ovo: 'OVO',
          dana: 'DANA',
          transfer: 'Transfer Bank'
        };
        const paymentName = paymentNames[selectedPayment] || selectedPayment;
        showNotification(`Pembayaran melalui ${paymentName} berhasil! Tiket akan dikirim ke email Anda.`, 'success');
        createFireworks(); // Trigger fireworks effect
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      }, 2000);
    }
  }

  function batalPesan() {
    if (confirm('Batalkan pesanan?')) {
      const checkoutSection = document.getElementById('checkoutSection');
      if (checkoutSection) {
        checkoutSection.style.display = 'none';
      }
      // Reset quantities
      quantities = { silver: 0, gold: 0, golden: 0, platinum: 0 };
      updateOrderSummary();
    }
  }

  function kembaliKeBeranda() {
    if (confirm('Batalkan pesanan dan kembali ke beranda?')) {
      window.location.href = 'index.html';
    }
  }

  // ================================
  // GALLERY MODAL FUNCTION
  // ================================
  function showEventGallery(eventName) {
    const modal = new bootstrap.Modal(document.getElementById('eventGalleryModal'));
    const modalTitle = document.getElementById('galleryModalLabel');
    const carouselInner = document.querySelector('#galleryCarousel .carousel-inner');

    if (modalTitle) modalTitle.textContent = `Galeri ${eventName}`;
    
    // Mock images for gallery
    const eventImages = [
      'foto/galeri-1.jpeg',
      'foto/galeri-2.jpeg',
      'foto/galeri-3.jpeg',
      'foto/galeri-4.jpeg',
      'foto/galeri-5.jpeg'
    ];

    if (carouselInner) {
      carouselInner.innerHTML = '';
      
      // Select random images for demo (3-5 images)
      const numImages = Math.floor(Math.random() * 3) + 3;
      const shuffled = [...eventImages].sort(() => 0.5 - Math.random());
      const selectedImages = shuffled.slice(0, numImages);

      // Add images to carousel
      selectedImages.forEach((imgSrc, index) => {
        const isActive = index === 0 ? 'active' : '';
        const item = document.createElement('div');
        item.className = `carousel-item ${isActive}`;
        item.innerHTML = `
        <img src="${imgSrc}" class="d-block w-100" alt="${eventName} Gallery ${index + 1}" 
             style="height: 500px; object-fit: cover; border-radius: 1rem;">
      `;
        carouselInner.appendChild(item);
      });
    }

    modal.show();
  }

  // ================================
  // AUTO-SELECT OUTBOUND FROM URL
  // ================================
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('type') === 'outbound') {
    const ticketTypeSelect = document.getElementById('ticketType');
    if (ticketTypeSelect) {
      ticketTypeSelect.value = 'outbound';
      // Wait for DOM to be fully ready if needed, or just call searchTickets
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(searchTickets, 100));
      } else {
        setTimeout(searchTickets, 100);
      }
    }
  }

  // ================================
  // FIREWORKS EFFECT - EXTRA SPECTACULAR!
  // ================================
  function createFireworks() {
    const container = document.body;
    const fireworksCount = 150; // Increased for more spectacular effect

    // Create multiple bursts for more excitement
    for (let burst = 0; burst < 3; burst++) {
      setTimeout(() => {
        const burstX = 40 + Math.random() * 20; // Center-ish burst position

        for (let i = 0; i < fireworksCount / 3; i++) {
          const particle = document.createElement('div');
          particle.className = 'firework-particle';
          particle.style.position = 'fixed';
          particle.style.width = `${Math.random() * 12 + 6}px`; // 6-18px size
          particle.style.height = particle.style.width;
          particle.style.borderRadius = '50%';
          particle.style.background = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 40 + 60}%)`; // Bright colors
          particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px currentColor`; // Glow effect
          particle.style.left = `${burstX}vw`;
          particle.style.top = '80vh'; // Start from lower position
          particle.style.zIndex = '9999';
          particle.style.pointerEvents = 'none';

          container.appendChild(particle);

          // Random direction and distance for explosion effect
          const angle = Math.random() * Math.PI * 2; // Full circle
          const distance = Math.random() * 400 + 200; // 200-600px distance
          const targetX = Math.cos(angle) * distance;
          const targetY = Math.sin(angle) * distance;

          // Animate particle with explosion effect
          gsap.fromTo(particle,
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 0.2
            },
            {
              x: targetX,
              y: targetY,
              opacity: 0,
              scale: Math.random() * 2 + 0.5,
              duration: Math.random() * 2 + 3, // 3-5 seconds
              ease: 'power2.out',
              onComplete: () => {
                if (particle.parentNode) {
                  particle.parentNode.removeChild(particle);
                }
              }
            }
          );

          // Add sparkle effect
          gsap.to(particle, {
            rotation: `random(-720, 720)`, // Multiple rotations
            duration: Math.random() * 2 + 2,
            ease: 'power2.inOut'
          });

          // Add color changing effect
          gsap.to(particle, {
            backgroundColor: `hsl(${Math.random() * 360}, 100%, ${Math.random() * 40 + 60}%)`,
            duration: 0.5,
            repeat: Math.floor(Math.random() * 3) + 1,
            yoyo: true,
            ease: 'power2.inOut'
          });
        }
      }, burst * 300); // Stagger bursts by 300ms
    }

    // Add some floating stars for extra magic
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.width = '4px';
        star.style.height = '4px';
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.boxShadow = '0 0 10px #fff';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 50 + 20}vh`;
        star.style.zIndex = '9998';
        star.style.pointerEvents = 'none';
        star.style.opacity = '0';

        container.appendChild(star);

        gsap.to(star, {
          opacity: Math.random() * 0.8 + 0.2,
          scale: Math.random() * 2 + 0.5,
          duration: Math.random() * 2 + 1,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to(star, {
              opacity: 0,
              y: -50,
              duration: 2,
              ease: 'power2.out',
              onComplete: () => {
                if (star.parentNode) star.parentNode.removeChild(star);
              }
            });
          }
        });
      }
    }, 500);
  }

  // ================================
  // PAYMENT OPTION SELECTION
  // ================================
  document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', () => {
      const paymentType = option.getAttribute('data-payment');
      selectPayment(paymentType);
    });
  });

  // === GALERI GAMBAR PER EVENT ===
  const eventGalleryMap = {
    'Splash Carnival': [
      'foto/splash-carnival-1.jpg',
      'foto/splash-carnival-2.jpg',
      'foto/splash-carnival-3.jpg',
      'foto/splash-carnival-4.jpg',
      'foto/splash-carnival-5.jpg',
      'foto/splash-carnival-6.jpg',
      'foto/splash-carnival-7.jpg'
    ],
    'Hydro DJ Night': [
      'foto/hydro-dj-night-1.jpg',
      'foto/hydro-dj-night-2.jpg',
      'foto/hydro-dj-night-3.jpg',
      'foto/hydro-dj-night-4.jpg',
      'foto/hydro-dj-night-5.jpg',
      'foto/hydro-dj-night-6.jpg',
      'foto/hydro-dj-night-7.jpg',
      'foto/hydro-dj-night-8.jpg'
    ],
    'Family Aqua Adventure': [
      'foto/family-aqua-adventure-1.jpg',
      'foto/family-aqua-adventure-2.jpg',
      'foto/family-aqua-adventure-3.jpg',
      'foto/family-aqua-adventure-4.jpg',
      'foto/family-aqua-adventure-5.jpg',
      'foto/family-aqua-adventure-6.jpg',
    ],
    'Tropical Wave Fiesta': [
      'foto/tropical-wave-fiesta-1.jpg',
      'foto/tropical-wave-fiesta-2.jpg',
      'foto/tropical-wave-fiesta-3.jpg',
      'foto/tropical-wave-fiesta-4.jpg',
      'foto/tropical-wave-fiesta-5.jpg',
      'foto/tropical-wave-fiesta-6.jpg',
      'foto/tropical-wave-fiesta-7.jpg'
    ],
    'Ice Splash Wonderland': [
      'foto/ICE-SPLASH-WONDERLAND-1.jpg',
      'foto/ice-splash-wonderland-2.jpg',
      'foto/ice-splash-wonderland-3.jpg',
      'foto/ice-splash-wonderland-4.jpg',
      'foto/ice-splash-wonderland-5.jpg',
      'foto/ice-splash-wonderland-6.jpg',
      'foto/ice-splash-wonderland-7.jpg',
      'foto/ice-splash-wonderland-8.jpg'
    ]
  };

  // === JUDUL GAMBAR PER EVENT ===
  const eventTitlesMap = {
    'Splash Carnival': [
      'Keseruan Permainan Air',
      'Atmosfer Karnaval',
      'Waktu Bersama Keluarga',
      'Petualangan Splash',
      'Karnaval Waterpark',
      'Percikan Gembira',
      'Sorotan Karnaval'
    ],
    'Hydro DJ Night': [
      'Vibe Musik Malam',
      'Pertunjukan DJ',
      'Pesta Hydro Malam',
      'Dance dan Splash',
      'Pengalaman DJ Air',
      'Kegembiraan Malam Hari',
      'Beats DJ',
      'Pesta Hydro'
    ],
    'Family Aqua Adventure': [
      'Petualangan Keluarga',
      'Keseruan Air Bersama',
      'Aktivitas Aqua Fun',
      'Wahana Air Keluarga',
      'Adventure Time',
      'Keluarga Bahagia'
    ],
    'Tropical Wave Fiesta': [
      'Fiesta Tropis',
      'Gelombang Tropis',
      'Pesta Pantai',
      'Keseruan Ombak',
      'Tropical Paradise',
      'Fiesta Air',
      'Gelombang Seru'
    ],
    'Ice Splash Wonderland': [
      'Dunia Es Ajaib',
      'Splash Dingin',
      'Wonderland Beku',
      'Petualangan Es',
      'Splash Ice Fun',
      'Dunia Ajaib',
      'Es dan Air',
      'Wonderland Splash'
    ]
  };

  // === FUNGSI MODAL CAROUSEL GAMBAR ===
  function openImageGallery(imgElement) {
    const modal = new bootstrap.Modal(document.getElementById('imageGalleryCarouselModal'));
    const carouselInner = document.getElementById('galleryCarouselInner');
    const eventName = imgElement.alt;
    const images = eventGalleryMap[eventName] || [imgElement.src];
    const titles = eventTitlesMap[eventName] || [];
    carouselInner.innerHTML = '';
    images.forEach((src, index) => {
      const isActive = index === 0 ? 'active' : '';
      const title = titles[index] || `${eventName} ${index + 1}`;
      carouselInner.innerHTML += `
        <div class="carousel-item ${isActive}">
          <img src="${src}" class="d-block w-100" alt="${eventName} ${index + 1}" style="height: 70vh; object-fit: cover; border-radius: 1rem;">
          <div class="event-card-label" style="width: 100%; margin-top: -20px; position: relative; z-index: 1; text-align: center; font-size: 1.5rem; font-weight: 800;">
            ${title}
          </div>
        </div>
      `;
    });
    modal.show();
  }

  // === KLIK GAMBAR EVENT ===
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.event-img-container img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => openImageGallery(img));
    });
  });

  // ================================
  // EXPOSE FUNCTIONS TO WINDOW
  // ================================
  window.searchTickets = searchTickets;
  window.pesan = pesan;
  window.updateQuantity = updateQuantity;
  window.lanjutkanPembayaran = lanjutkanPembayaran;
  window.batalPesan = batalPesan;
  window.kembaliKeBeranda = kembaliKeBeranda;
  window.showEventGallery = showEventGallery;
  window.prevCard = prevCard;
  window.nextCard = nextCard;
  window.selectPayment = selectPayment;

})();
