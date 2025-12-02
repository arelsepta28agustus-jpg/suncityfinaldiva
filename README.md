# 📚 DOKUMENTASI LENGKAP - SUNCITY WATERPARK WEBSITE

## 📋 Daftar Isi
1. [Struktur File](#struktur-file)
2. [HTML Files](#html-files)
3. [CSS Styling](#css-styling)
4. [JavaScript Functions](#javascript-functions)

---

## 🗂️ Struktur File

```
website-diva-suncity/
├── index.html              # Halaman utama/beranda
├── tiket-promo.html        # Halaman tiket & promo dengan inline checkout
├── reservasi.html          # Halaman reservasi outbound packages
├── checkout.html           # Halaman checkout standalone (deprecated)
├── acara-event.html        # Halaman acara & event
├── css/
│   └── style.css          # File CSS utama (2900+ baris)
├── js/
│   └── script.js          # File JavaScript utama (500+ baris)
└── foto/                  # Folder gambar/assets
```

---

## 📄 HTML FILES - Penjelasan Detail

### 1. **tiket-promo.html**

#### Struktur Utama:
```html
<!doctype html>                    <!-- Deklarasi HTML5 -->
<html lang="id">                   <!-- Bahasa Indonesia -->
<head>                             <!-- Metadata & Resources -->
  <meta charset="utf-8">           <!-- Encoding UTF-8 -->
  <meta name="viewport" ...>       <!-- Responsive viewport -->
  <title>...</title>               <!-- Judul halaman -->
  <link rel="icon" ...>            <!-- Favicon -->
  <link href="bootstrap.css">      <!-- Bootstrap 5.3.3 -->
  <link href="bootstrap-icons">    <!-- Bootstrap Icons -->
  <link href="css/style.css">      <!-- Custom CSS -->
</head>
```

#### Komponen Utama:

**1. Navbar (Line 32-56)**
- Fixed top navigation
- Responsive collapse menu
- Theme toggle button
- Links: Beranda, Tiket & Promo, Reservasi, Acara & Event

**2. Hero Section (Line 58-122)**
- Background image dengan overlay
- Judul utama dengan gradient text
- Search box dengan 3 input fields:
  - Tanggal kunjungan (date picker)
  - Jenis tiket (dropdown: Family/Single)
  - Harga paket (readonly, auto-update)
- Search button dengan icon

**3. Ticket Cards Section (Line 127-239)**
- **Hidden by default** (`style="display: none;"`)
- Muncul setelah user klik search
- 6 cards total:
  - 3 Single Package (Silver, Golden, Platinum)
  - 3 Family Package (Silver, Golden, Platinum)
- Setiap card berisi:
  - Header dengan tier color
  - Tipe tiket
  - Harga
  - Promo badge
  - Features list
  - Button "Pesan Sekarang"

**4. Inline Checkout Section**
- Dibuat secara dinamis oleh JavaScript
- Muncul setelah user klik "Pesan Sekarang"
- Berisi:
  - Selected package confirmation
  - Order summary
  - Payment method selection
  - Action buttons (Lanjutkan/Batal)

**5. Footer (Line 241-end)**
- 3 kolom informasi
- Social media links
- Copyright info

---

### 2. **reservasi.html**

#### Perbedaan dengan tiket-promo.html:
- Search box untuk **Outbound Packages**
- Dropdown hanya 1 pilihan: "Semua Paket Outbound"
- 3 cards: Bronze, Silver, Golden
- Harga range: Rp1.500.000 - Rp5.000.000

---

## 🎨 CSS STYLING - Penjelasan Detail

### File: `css/style.css` (2900+ baris)

#### Struktur CSS:

**1. CSS Variables (Line 6-101)**
```css
:root {
  /* Light Mode Variables */
  --bg-body: #ffffff;
  --text-primary: #1b81bc;
  --navbar-bg: rgba(255, 255, 255, 0.8);
  /* ... */
}

[data-theme="dark"] {
  /* Dark Mode Variables */
  --bg-body: #121212;
  --text-primary: #ffffff;
  /* ... */
}
```

**2. Global Styles (Line 102-177)**
- Body styling
- Font: Quicksand
- Background gradients
- Z-index layering

**3. Navbar Styles (Line 178-253)**
- Fixed top positioning
- Glass effect (backdrop-filter)
- Responsive breakpoints

**4. Hero Sections (Line 254-843)**
- Full viewport height
- Background images dengan parallax
- Overlay effects
- Responsive typography

**5. Ticket Cards (Line 844-1107)**
- Grid layout: 3 kolom desktop
- Responsive: 2 kolom tablet, 1 kolom mobile
- Tier colors:
  - Bronze: `#a97142`
  - Silver: `#e2e2e2`
  - Golden: `#f6d365`
  - Platinum: `#5d5d5d`
- Hover effects
- Transition animations

**6. Checkout Section (Line 1108-1672)**
- Grid layout: 2 kolom (package info + summary)
- Glassmorphism effects
- Payment options styling
- Button animations

**7. Inline Checkout (Line 2796-2943)**
- Grid layout untuk cards
- Hide/show logic
- Responsive breakpoints

---

## ⚙️ JAVASCRIPT FUNCTIONS - Penjelasan Detail

### File: `js/script.js` (500+ baris)

#### Fungsi Utama:

**1. Theme Toggle (Line 14-30)**
```javascript
function setTheme(theme)
```
- Switch antara light/dark mode
- Save preference ke localStorage
- Update icon (moon/sun)

**2. Search Tickets (Line 244-311)**
```javascript
function searchTickets()
```
- Validasi tanggal kunjungan
- Show ticket cards (`display: block`)
- Filter cards berdasarkan type:
  - `family` → Family Package
  - `single` → Single Package
  - `outbound` → Outbound Package
- Update price field
- Show notification
- Animate cards (fade in)

**3. Pesan (Line 403-510)**
```javascript
function pesan(type, tier)
```
- Create inline checkout section
- Get package info dari `packages` object
- Build HTML dynamically
- Insert after ticket cards
- Animate appearance
- Scroll to checkout
- Update order summary

**4. Batal Checkout (Line 512-533)**
```javascript
function batalCheckout()
```
- Fade out animation
- Remove checkout section
- Scroll back to cards
- Show notification

**5. Update Order Summary (Line 115-150)**
```javascript
function updateOrderSummary()
```
- Calculate subtotal
- Apply 5% discount
- Update total
- Display order items

**6. Select Payment (Line 93-100)**
```javascript
function selectPayment(paymentType)
```
- Remove 'selected' class dari semua
- Add 'selected' ke payment yang dipilih

**7. Lanjutkan Pembayaran (Line 535-558)**
```javascript
function lanjutkanPembayaran()
```
- Validate total > 0
- Show loading spinner
- Simulate payment process (2s)
- Redirect ke index.html

---

## 🎯 FLOW DIAGRAM

### User Journey - Tiket Promo:

```
1. User buka tiket-promo.html
   ↓
2. Hero section visible, Cards HIDDEN
   ↓
3. User pilih:
   - Tanggal kunjungan ✅
   - Jenis tiket (Family/Single) ✅
   ↓
4. User klik Search 🔍
   ↓
5. JavaScript:
   - searchTickets() executed
   - ticketCards.style.display = 'block'
   - Filter & show relevant cards
   - Fade in animation
   ↓
6. Cards VISIBLE (3 cards horizontal)
   ↓
7. User klik "Pesan Sekarang" pada card
   ↓
8. JavaScript:
   - pesan(type, tier) executed
   - Create inline checkout HTML
   - Insert after cards
   - Scroll to checkout
   ↓
9. Inline Checkout VISIBLE
   - Selected package confirmation
   - Order summary
   - Payment options
   ↓
10. User pilih payment method
    ↓
11. User klik "Lanjutkan Pembayaran"
    ↓
12. JavaScript:
    - Show loading
    - Simulate payment (2s)
    - Redirect to index.html
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Desktop (>992px) */
- 3 kolom ticket cards
- 2 kolom checkout layout
- Full navbar

/* Tablet (576px - 992px) */
- 2 kolom ticket cards
- 1 kolom checkout layout
- Collapsed navbar

/* Mobile (<576px) */
- 1 kolom ticket cards
- 1 kolom checkout layout
- Hamburger menu
```

---

## 🎨 COLOR PALETTE

### Tier Colors:
- **Bronze**: `#a97142` → `#7a4f2a` (gradient)
- **Silver**: `#e2e2e2` → `#bdbdbd` (gradient)
- **Golden**: `#f6d365` → `#fda085` (gradient)
- **Platinum**: `#5d5d5d` → `#9e9e9e` → `#5d5d5d` (gradient)

### Primary Colors:
- **Primary Blue**: `#1b81bc`
- **Accent Orange**: `#ff8c42`
- **Accent Pink**: `#ff6b9d`
- **Success Green**: `#48bb78`
- **Error Red**: `#f56565`

---

## 🔧 DEPENDENCIES

### External Libraries:
1. **Bootstrap 5.3.3** - UI Framework
2. **Bootstrap Icons 1.11.3** - Icon library
3. **tsParticles 3.x** - Particle effects (removed)

### Custom Files:
1. **style.css** - All custom styling
2. **script.js** - All JavaScript logic

---

## 📝 NOTES

### Important Features:
1. ✅ **Inline Checkout** - No page redirect
2. ✅ **Dynamic Content** - JavaScript-generated HTML
3. ✅ **Responsive Design** - Mobile-first approach
4. ✅ **Dark Mode** - Theme toggle with localStorage
5. ✅ **Smooth Animations** - CSS transitions & transforms
6. ✅ **Form Validation** - Required fields check
7. ✅ **Notification System** - Toast-style notifications

### Known Issues:
- ❌ Particle effects removed (performance)
- ⚠️ Payment is simulated (not real integration)

---

**Dokumentasi dibuat:** 2 Desember 2025  
**Versi:** 1.0  
**Author:** DIVA SARI ARUM BAIMUSRINA 
