/* SUNCITY WATERPARK - COMPLETE JAVASCRIPT */
/* Semua fungsi lengkap dalam satu file */

(function() {
  'use strict';
  
  // ================================
  // CORE FUNCTIONS
  // ================================
  
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const htmlEl = document.documentElement;

  function setTheme(theme) {
    if (theme === 'dark') {
      htmlEl.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
      }
    } else {
      htmlEl.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
      }
    }
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
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
      golden: { name: 'Family Golden Package', price: 130000, description: 'Paket lengkap untuk 3 anak & 2 dewasa' },
      platinum: { name: 'Family Platinum Package', price: 150000, description: 'Paket premium untuk 3 anak & 3 dewasa' }
    },
    outbound: {
      bronze: { name: 'Outbound Package (30 Orang)', price: 1500000, description: 'Paket Outbound untuk 30 Orang' },
      silver: { name: 'Outbound Package (50 Orang)', price: 2500000, description: 'Paket Outbound untuk 50 Orang' },
      golden: { name: 'Outbound Package (100 Orang)', price: 5000000, description: 'Paket Outbound untuk 100 Orang' }
    }
  };

  let selectedTier = 'family';
  let quantities = { silver: 0, golden: 0, platinum: 0 };

  function selectPayment(paymentType) {
    document.querySelectorAll('.payment-option').forEach(option => {
      option.classList.remove('selected');
    });
    const selectedOption = document.querySelector(`[data-payment="${paymentType}"]`);
    if (selectedOption) {
      selectedOption.classList.add('selected');
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
  // CHECKOUT INTEGRATION - INLINE
  // ================================
  
  function pesan(type, tier) {
    console.log(`🎫 Booking: ${type} - ${tier}`);
    
    // Get package info
    const packageInfo = packages[type] && packages[type][tier];
    if (!packageInfo) {
      showNotification('Paket tidak ditemukan!', 'error');
      return;
    }
    
    // Remove existing checkout if any
    const existingCheckout = document.getElementById('inlineCheckout');
    if (existingCheckout) {
      existingCheckout.remove();
    }
    
    // Get ticket cards container
    const ticketCards = document.getElementById('ticketCards');
    if (!ticketCards) {
      showNotification('Ticket cards not found!', 'error');
      return;
    }
    
    // Create inline checkout section
    const checkoutSection = document.createElement('section');
    checkoutSection.id = 'inlineCheckout';
    checkoutSection.style.cssText = 'margin-top: 3rem; opacity: 0; transform: translateY(20px); transition: all 0.5s ease;';
    
    // Determine tier class and labels based on package type
    let tierClass, tierLabel, typeLabel, packageFeatures;
    
    if (type === 'outbound') {
      // Outbound package styling
      tierClass = tier === 'bronze' ? 'bronze' : tier === 'silver' ? 'silver' : 'golden';
      tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
      typeLabel = 'Outbound';
      
      // Outbound-specific features
      if (tier === 'bronze') {
        packageFeatures = `
          <li>Minimal Pengambilan Paket Outbound 30 Orang</li>
          <li>Menu Konsumsi Minimal 20Pax/Porsi</li>
          <li>Weekend & hari Libur Nasional Penyesuaian Tarif</li>
        `;
      } else if (tier === 'silver') {
        packageFeatures = `
          <li>Minimal Pengambilan Paket Outbound 50 Orang</li>
          <li>Menu Konsumsi Minimal 20Pax/Porsi</li>
          <li>Weekend & hari Libur Nasional Penyesuaian Tarif</li>
        `;
      } else { // golden
        packageFeatures = `
          <li>Minimal Pengambilan Paket Outbound 100 Orang</li>
          <li>Menu Konsumsi Minimal 20Pax/Porsi</li>
          <li>Weekend & hari Libur Nasional Penyesuaian Tarif</li>
        `;
      }
    } else {
      // Family or Single package styling
      tierClass = tier === 'silver' ? 'silver' : tier === 'golden' ? 'golden' : 'platinum';
      tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
      typeLabel = type === 'family' ? 'Family' : 'Single';
      
      // Regular package features
      packageFeatures = `
        <li>Akses semua wahana reguler</li>
        <li>Fasilitas umum lengkap</li>
        <li>${type === 'family' ? 'Benefit keluarga khusus' : 'Berlaku untuk 1 orang'}</li>
      `;
    }
    
    checkoutSection.innerHTML = `
      <div class="checkout-container">
        <!-- Left: Selected Package Info -->
        <div class="checkout-section">
          <h2 class="section-title">
            <i class="bi bi-check-circle-fill text-success"></i>
            Paket Yang Dipilih
          </h2>
          <div class="card ticket-card">
            <div class="ticket-header ${tierClass}">${typeLabel.toUpperCase()} PACKAGE — ${tierLabel.toUpperCase()}</div>
            <div class="ticket-body">
              <div class="ticket-type">${packageInfo.description}</div>
              <div class="ticket-price">Rp${packageInfo.price.toLocaleString('id-ID')}</div>
              <div class="promo-badge discount">5% DISKON</div>
              <ul class="ticket-features">
                ${packageFeatures}
              </ul>
            </div>
          </div>
        </div>

        <!-- Right: Order Summary -->
        <aside class="order-summary">
          <div class="summary-header">
            <div class="summary-title">
              <div class="summary-icon">
                <i class="bi bi-receipt"></i>
              </div>
              Ringkasan Pesanan
            </div>
          </div>

          <div class="summary-date">
            <div class="summary-date-label">Tanggal Kunjungan</div>
            <div class="summary-date-value" id="visitDateDisplay"></div>
          </div>

          <div class="summary-items" id="orderItems"></div>

          <div class="summary-divider"></div>

          <div class="summary-discounts">
            <div class="discount-text">Diskon Promo 5%</div>
            <div class="discount-amount" id="discountAmount">- Rp0</div>
          </div>

          <div class="summary-total">
            <div class="total-label">Total Pembayaran</div>
            <div class="total-amount" id="totalAmount">Rp0</div>
          </div>

          <div class="payment-section">
            <div class="payment-title">Pilih Metode Pembayaran</div>
            <div class="payment-options">
              <div class="payment-option selected" data-payment="gopay" onclick="selectPayment('gopay')">
                <img src="foto/logo-gopay-1.png" alt="GoPay" class="payment-logo">
                <div class="payment-name">GoPay</div>
                <div class="payment-fee">Gratis</div>
              </div>
              <div class="payment-option" data-payment="ovo" onclick="selectPayment('ovo')">
                <img src="foto/logo-ovo-1.png" alt="OVO" class="payment-logo">
                <div class="payment-name">OVO</div>
                <div class="payment-fee">Gratis</div>
              </div>
              <div class="payment-option" data-payment="dana" onclick="selectPayment('dana')">
                <img src="foto/logo-dana-1.png" alt="DANA" class="payment-logo">
                <div class="payment-name">DANA</div>
                <div class="payment-fee">Gratis</div>
              </div>
              <div class="payment-option" data-payment="transfer" onclick="selectPayment('transfer')">
                <div class="payment-icon-wrapper">
                  <i class="bi bi-bank payment-icon-bank"></i>
                </div>
                <div class="payment-name">Transfer Bank</div>
                <div class="payment-fee">Gratis</div>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn-primary" id="checkoutBtn" onclick="lanjutkanPembayaran()">
              <span class="spinner" id="checkoutSpinner" style="display:none;"></span>
              Lanjutkan Pembayaran
            </button>
            <button class="btn-secondary" onclick="batalCheckout()">
              <i class="bi bi-arrow-left me-2"></i>Pilih Paket Lain
            </button>
          </div>
        </aside>
      </div>
    `;
    
    // Insert checkout section after ticket cards
    ticketCards.parentNode.insertBefore(checkoutSection, ticketCards.nextSibling);
    
    // Initialize order summary
    selectedTier = type;
    quantities = { silver: 0, golden: 0, platinum: 0, bronze: 0 };
    quantities[tier] = 1;
    
    // Update date display
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('id-ID', options);
    const visitDateDisplayEl = document.getElementById('visitDateDisplay');
    if (visitDateDisplayEl) visitDateDisplayEl.textContent = dateStr;
    
    updateOrderSummary();
    
    // Animate in
    setTimeout(() => {
      checkoutSection.style.opacity = '1';
      checkoutSection.style.transform = 'translateY(0)';
    }, 100);
    
    // Smooth scroll to checkout section
    setTimeout(() => {
      checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
    
    showNotification(`Paket ${packageInfo.name} berhasil dipilih!`, 'success');
  }
  
  function batalCheckout() {
    const checkoutSection = document.getElementById('inlineCheckout');
    
    if (checkoutSection) {
      // Animate out
      checkoutSection.style.opacity = '0';
      checkoutSection.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        checkoutSection.remove();
      }, 300);
    }
    
    // Scroll back to ticket cards
    const ticketCards = document.getElementById('ticketCards');
    if (ticketCards) {
      setTimeout(() => {
        ticketCards.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    
    showNotification('Pemesanan dibatalkan', 'info');
  }
  
  function kembaliKeBeranda() {
    window.location.href = 'index.html';
  }
  
  function lanjutkanPembayaran() {
    const totalEl = document.getElementById('totalAmount');
    const total = totalEl ? totalEl.textContent : 'Rp0';
    
    if (total === 'Rp0') {
      showNotification('Silakan pilih paket terlebih dahulu!', 'error');
      return;
    }
    
    const btn = document.getElementById('checkoutBtn');
    const spinner = document.getElementById('checkoutSpinner');
    
    if (btn && spinner) {
      btn.disabled = true;
      spinner.style.display = 'inline-block';
      btn.innerHTML = '<span class="spinner"></span> Memproses Pembayaran...';
      
      setTimeout(() => {
        showNotification('Pembayaran berhasil! E-Ticket akan dikirim ke email Anda.', 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      }, 2000);
    }
  }

  // ================================
  // GLOBAL EXPORTS & INITIALIZATION
  // ================================

  window.prevCard = prevCard;
  window.nextCard = nextCard;
  window.searchTickets = searchTickets;
  window.pesan = pesan;
  window.batalCheckout = batalCheckout;
  window.kembaliKeBeranda = kembaliKeBeranda;
  window.lanjutkanPembayaran = lanjutkanPembayaran;
  window.selectPayment = selectPayment;

})();
