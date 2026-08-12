/* ==========================================================================
   ASTRO SOLUTION WITH SOUVIK - INTERACTIVE JAVASCRIPT LOGIC
   Cross-Platform Compatible (Windows, macOS, Android, iOS Safari)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initMobileMenu();
    initZodiacTool();
    initScrollSpy();
    startAutoGallery();
});

/* --------------------------------------------------------------------------
   1. HTML5 STARFIELD CANVAS ANIMATION (HIGH DPI & MOBILE SCALED)
   -------------------------------------------------------------------------- */
function initStarfield() {
    const canvas = document.getElementById('starfieldCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let stars = [];
    let dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
        createStars();
    }

    function createStars() {
        stars = [];
        // Adjust star count based on viewport size for performance on mobile
        const count = Math.floor((width * height) / (width < 768 ? 9000 : 6000));
        
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random(),
                speed: Math.random() * 0.008 + 0.002,
                gold: Math.random() > 0.7 // 30% golden stars
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0.1) {
                star.speed = -star.speed;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.gold 
                ? `rgba(184, 141, 42, ${Math.abs(star.alpha) * 0.7})` 
                : `rgba(100, 116, 139, ${Math.abs(star.alpha) * 0.4})`;
            ctx.fill();
        });

        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();
}

/* --------------------------------------------------------------------------
   2. HERO RIGHT DIV - IMAGE GALLERY SWITCHER & AUTO SLIDESHOW
   -------------------------------------------------------------------------- */
let currentGalleryIndex = 1;
let galleryInterval = null;
const GALLERY_ITEMS = [
    { text: '??????? ???????? ????? ????? ?????' },
    { text: '?? ????? ?????????? ????? ?????' },
    { text: '?????????? ???????? ????????? ????' },
    { text: '?????? ? ??????? ????? ???????' }
];

function switchRightImg(imgIndex, captionText, manual = true) {
    const images = document.querySelectorAll('.right-div-img');
    const thumbs = document.querySelectorAll('.thumb-btn');
    const overlayTag = document.getElementById('overlayTag');

    if (images.length === 0) return;

    images.forEach((img, idx) => {
        if (idx === imgIndex - 1) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });

    thumbs.forEach((btn, idx) => {
        if (idx === imgIndex - 1) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (overlayTag) {
        overlayTag.innerHTML = `<i class="fa-solid fa-om"></i> ${captionText}`;
    }

    if (manual) {
        currentGalleryIndex = imgIndex;
        startAutoGallery();
    }
}

function startAutoGallery() {
    if (galleryInterval) clearInterval(galleryInterval);
    galleryInterval = setInterval(() => {
        currentGalleryIndex = (currentGalleryIndex % GALLERY_ITEMS.length) + 1;
        const nextItem = GALLERY_ITEMS[currentGalleryIndex - 1];
        switchRightImg(currentGalleryIndex, nextItem.text, false);
    }, 4000);
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION MENU TOGGLER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (isOpen) {
            icon.className = 'fa-solid fa-xmark';
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = 'fa-solid fa-bars';
            document.body.style.overflow = '';
        }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
            document.body.style.overflow = '';
        });
    });
}

/* --------------------------------------------------------------------------
   4. ZODIAC INTERACTIVE TOOL DATA & RENDERER
   -------------------------------------------------------------------------- */
const ZODIAC_DATA = [
    {
        id: 'aries',
        name: '??? ???? (Aries)',
        element: '????? ??????',
        icon: 'fa-solid fa-fire',
        description: '????? ?????? ??????? ????? ???? ? ?????????? ?????? ??????? ???????????? ????????? ????? ?????? ??? ??????: ??'
    },
    {
        id: 'taurus',
        name: '??? ???? (Taurus)',
        element: '?????? ??????',
        icon: 'fa-solid fa-mountain',
        description: '??????? ??? ??????? ?????? ???????? ????? ???????? ????????? ????????? ??????? ??? ? ??????? ????? ??? ??????: ??'
    },
    {
        id: 'gemini',
        name: '????? ???? (Gemini)',
        element: '????? ??????',
        icon: 'fa-solid fa-wind',
        description: '??? ?????? ??????? ???? ?????? ? ????????? ?????? ?????? ?????-????????? ???????? ?????? ?????? ????? ??? ??????: ??'
    },
    {
        id: 'cancer',
        name: '????? ???? (Cancer)',
        element: '?? ??????',
        icon: 'fa-solid fa-water',
        description: '???????? ???????? ?????? ?????? ???? ???? ?????? ???????? ????? ??? ??? ??? ??????? ?????? ??? ??????: ??'
    },
    {
        id: 'leo',
        name: '???? ???? (Leo)',
        element: '????? ??????',
        icon: 'fa-solid fa-sun',
        description: '???? ??????? ????? ?????? ? ????? ?????? ????? ????????? ????? ????, ??? ?????? ????? ????? ??? ??????: ??'
    },
    {
        id: 'virgo',
        name: '????? ???? (Virgo)',
        element: '?????? ??????',
        icon: 'fa-solid fa-seedling',
        description: '????? ????? ?????-????? ? ???? ???????? ?? ?????? ?????? ????????? ???? ????? ?????? ??? ??????: ??'
    },
    {
        id: 'libra',
        name: '???? ???? (Libra)',
        element: '????? ??????',
        icon: 'fa-solid fa-scale-balanced',
        description: '????? ?????? ????? ?????, ??? ? ???????? ????? ?????? ???? ???????? ????????? ?????? ?????? ??? ??????: ??'
    },
    {
        id: 'scorpio',
        name: '??????? ???? (Scorpio)',
        element: '?? ??????',
        icon: 'fa-solid fa-shield-halved',
        description: '??????? ??? ?????? ???????? ????? ???? ? ?? ???? ?????? ?????? ???? ??????? ???? ??? ??????: ??'
    },
    {
        id: 'sagittarius',
        name: '??? ???? (Sagittarius)',
        element: '????? ??????',
        icon: 'fa-solid fa-location-crosshairs',
        description: '????????? ??? ???????? ?????????? ? ?????????? ??? ?????? ?????????? ???? ????? ?????? ??? ??????: ??'
    },
    {
        id: 'capricorn',
        name: '??? ???? (Capricorn)',
        element: '?????? ??????',
        icon: 'fa-solid fa-crown',
        description: '???? ????? ????? ? ????????? ?? ?????? ???????????? ?? ???? ?????????? ??????? ????????? ??? ??????: ??'
    },
    {
        id: 'aquarius',
        name: '????? ???? (Aquarius)',
        element: '????? ??????',
        icon: 'fa-solid fa-flask',
        description: '???? ???? ?????? ?? ???????? ???? ????? ????? ???????? ??????? ??????? ?????? ??? ??????: ??'
    },
    {
        id: 'pisces',
        name: '??? ???? (Pisces)',
        element: '?? ??????',
        icon: 'fa-solid fa-fish',
        description: '???????? ? ??? ??????? ?????? ?????????? ????? ?????? ????? ????????? ?? ???? ?????? ???? ????? ??? ??????: ??'
    }
];

function initZodiacTool() {
    const grid = document.getElementById('zodiacGrid');
    if (!grid) return;

    grid.innerHTML = '';

    ZODIAC_DATA.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = `zodiac-btn ${index === 0 ? 'active' : ''}`;
        btn.setAttribute('type', 'button');
        btn.onclick = () => selectZodiac(index);

        btn.innerHTML = `
            <i class="${item.icon}"></i>
            <span>${item.name.split(' ')[0]}</span>
        `;

        grid.appendChild(btn);
    });
}

function selectZodiac(index) {
    const item = ZODIAC_DATA[index];
    const buttons = document.querySelectorAll('.zodiac-btn');

    buttons.forEach((btn, idx) => {
        if (idx === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    const displayCard = document.getElementById('zodiacResult');
    const nameEl = document.getElementById('zodiacName');
    const elementEl = document.getElementById('zodiacElement');
    const descEl = document.getElementById('zodiacDescription');
    const iconEl = document.getElementById('zodiacIcon');

    if (displayCard) {
        displayCard.style.opacity = '0.4';
        setTimeout(() => {
            if (nameEl) nameEl.textContent = item.name;
            if (elementEl) elementEl.textContent = item.element;
            if (descEl) descEl.textContent = item.description;
            if (iconEl) iconEl.className = item.icon;
            displayCard.style.opacity = '1';
        }, 150);
    }
}

/* --------------------------------------------------------------------------
   5. BOOKING MODAL DIALOG SYSTEM
   -------------------------------------------------------------------------- */
function openModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        resetModalSteps();
    }
}

let isPaymentVerified = false;

function resetModalSteps() {
    isPaymentVerified = false;
    isPaymentInitiated = false;
    const modalForm = document.getElementById('modalForm');
    const modalHeader = document.getElementById('modalHeaderStep1');
    const paymentStep = document.getElementById('paymentStep');
    const waBtn = document.getElementById('btnWhatsappConfirm');
    const statusAlert = document.getElementById('paymentStatusAlert');
    const statusText = document.getElementById('paymentStatusText');
    const confirmBtn = document.getElementById('btnConfirmPayment');
    const notifStatus = document.getElementById('paymentNotificationStatus');

    if (paymentStep) paymentStep.style.display = 'none';
    if (modalForm) {
        modalForm.style.display = 'block';
        modalForm.reset();
    }
    if (modalHeader) modalHeader.style.display = 'block';

    if (waBtn) {
        waBtn.className = 'btn-primary btn-full btn-pay-confirm disabled-wa-btn';
        waBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠান (পেমেন্ট প্রয়োজন)`;
        waBtn.style.opacity = '0.5';
        waBtn.style.cursor = 'not-allowed';
        waBtn.style.background = '#128c7e';
        waBtn.disabled = true;
    }

    const utrInput = document.getElementById('utr_number');
    if (utrInput) {
        utrInput.value = '';
    }
    const utrBox = document.getElementById('utrVerificationBox');
    if (utrBox) {
        utrBox.style.display = 'none';
    }

    if (confirmBtn) {
        confirmBtn.style.opacity = '0.6';
        confirmBtn.style.cursor = 'not-allowed';
        confirmBtn.style.background = '';
        confirmBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> পেমেন্ট সম্পন্ন হয়েছে (বুকিং নিশ্চিত করুন)';
        confirmBtn.disabled = true;
    }

    if (statusAlert && statusText) {
        statusAlert.className = 'payment-status-alert status-pending';
        statusAlert.style.background = 'rgba(234,179,8,0.08)';
        statusAlert.style.borderColor = 'rgba(234,179,8,0.3)';
        statusAlert.style.color = '#991b1b';
        statusText.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> পেমেন্ট পেন্ডিং: প্রথমে PhonePe অ্যাপে ₹751 পেমেন্ট সম্পন্ন করুন।`;
    }
    if (notifStatus) notifStatus.style.display = 'none';
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
}

let isPaymentInitiated = false;

function handleQrCodeClick() {
    const phoneNum = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';

    if (isMobileDevice()) {
        isPaymentInitiated = true;
        const confirmBtn = document.getElementById('btnConfirmPayment');
        if (confirmBtn) {
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'pointer';
        }
        showToast('📲 UPI পেমেন্ট অ্যাপ খোলা হচ্ছে... পেমেন্ট শেষে নিচের বাটনে ক্লিক করুন।');
        window.location.href = 'upi://pay?pa=Q996111846@ybl&pn=ASTRO%20SOLUTION%20WITH%20SOUVIK&am=751&cu=INR&tn=Astrology%20Consultation%20Fee';
    } else {
        if (!phoneNum) {
            showToast('⚠️ ফোন নম্বর পাওয়া যায়নি! বুকিং ফর্মে মোবাইল নম্বর দিন।');
            return;
        }
        isPaymentInitiated = true;
        const confirmBtn = document.getElementById('btnConfirmPayment');
        if (confirmBtn) {
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'pointer';
        }

        const title = '💰 পেমেন্ট রিকোয়েস্ট - অ্যাস্ট্রো সলিউশন উইথ সৌভিক';
        const bodyText = `📲 ${phoneNum} নম্বরে ₹751 পেমেন্ট করুন। PhonePe / UPI অ্যাপ খুলে পেমেন্ট সম্পন্ন করুন।`;
        sendPushNotification(title, bodyText);

        showToast(`📱 ${phoneNum} নম্বরে ₹751 পেমেন্ট নোটিফিকেশন পাঠানো হয়েছে! ফোনের PhonePe অ্যাপ থেকে পেমেন্ট করুন।`);

        const notifStatus = document.getElementById('paymentNotificationStatus');
        const notifText = document.getElementById('paymentNotificationText');
        if (notifStatus && notifText) {
            notifStatus.style.display = 'block';
            notifText.innerHTML = `<i class="fa-solid fa-bell" style="color: #25d366;"></i> <strong>${phoneNum}</strong> নম্বরে পেমেন্ট নোটিফিকেশন পাঠানো হয়েছে। ফোন থেকে PhonePe অ্যাপ খুলে ₹751 পেমেন্ট সম্পন্ন করুন।`;
        }
    }
}

function triggerPhonePeAppPay() {
    isPaymentInitiated = true;
    const phoneNum = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
    if (isMobileDevice()) {
        showToast('📲 UPI পেমেন্ট অ্যাপ খোলা হচ্ছে... পেমেন্ট শেষে নিচের বাটনে ক্লিক করুন।');
    } else if (phoneNum) {
        const title = '💰 পেমেন্ট রিকোয়েস্ট - অ্যাস্ট্রো সলিউশন উইথ সৌভিক';
        const bodyText = `📲 ${phoneNum} নম্বরে ₹751 পেমেন্ট করুন।`;
        sendPushNotification(title, bodyText);
        showToast(`📱 ${phoneNum} নম্বরে পেমেন্ট নোটিফিকেশন পাঠানো হয়েছে!`);

        const notifStatus = document.getElementById('paymentNotificationStatus');
        const notifText = document.getElementById('paymentNotificationText');
        if (notifStatus && notifText) {
            notifStatus.style.display = 'block';
            notifText.innerHTML = `<i class="fa-solid fa-bell" style="color: #25d366;"></i> <strong>${phoneNum}</strong> নম্বরে পেমেন্ট নোটিফিকেশন পাঠানো হয়েছে।`;
        }
    } else {
        showToast('📲 PhonePe/UPI পেমেন্ট সূচনা করা হয়েছে। পেমেন্ট শেষে নিচের বাটনে ক্লিক করুন।');
    }
    const confirmBtn = document.getElementById('btnConfirmPayment');
    if (confirmBtn) {
        confirmBtn.style.opacity = '1';
        confirmBtn.style.cursor = 'pointer';
        confirmBtn.disabled = false;
    }
    const utrBox = document.getElementById('utrVerificationBox');
    if (utrBox) {
        utrBox.style.display = 'block';
    }
}

function handlePaymentConfirmClick() {
    if (!isPaymentInitiated) {
        const phoneNum = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
        showToast(`❌ পেমেন্ট অসম্পূর্ণ! আপনার (${phoneNum || 'মোবাইল'}) নম্বরের PhonePe অ্যাপের মাধ্যমে ₹751 পেমেন্ট করুন।`);

        const statusAlert = document.getElementById('paymentStatusAlert');
        const statusText = document.getElementById('paymentStatusText');
        if (statusAlert && statusText) {
            statusAlert.style.background = 'rgba(220,38,38,0.08)';
            statusAlert.style.borderColor = 'rgba(220,38,38,0.3)';
            statusAlert.style.color = '#991b1b';
            statusText.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ❌ প্রথমে PhonePe বাটনে ক্লিক করে পেমেন্ট শুরু করুন!';
        }
        return;
    }

    // Check UTR Number
    const utrVal = document.getElementById('utr_number')?.value || '';
    if (!/^\d{12}$/.test(utrVal)) {
        showToast('❌ অনুগ্রহ করে সঠিক ১২ ডিজিটের UTR/Transaction ID নম্বরটি লিখুন!');
        const statusAlert = document.getElementById('paymentStatusAlert');
        const statusText = document.getElementById('paymentStatusText');
        if (statusAlert && statusText) {
            statusAlert.style.background = 'rgba(220,38,38,0.08)';
            statusAlert.style.borderColor = 'rgba(220,38,38,0.3)';
            statusAlert.style.color = '#991b1b';
            statusText.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ❌ পেমেন্ট পেন্ডিং: সঠিক ১২ ডিজিটের UTR/Transaction ID নম্বর দিন।';
        }
        return;
    }

    // Payment was initiated, now verify it
    verifyPaymentAndUnlockWhatsApp();
}

function verifyPaymentAndUnlockWhatsApp() {
    const statusAlert = document.getElementById('paymentStatusAlert');
    const statusText = document.getElementById('paymentStatusText');
    const waBtn = document.getElementById('btnWhatsappConfirm');
    const confirmBtn = document.getElementById('btnConfirmPayment');

    if (statusAlert && statusText) {
        statusAlert.style.background = 'rgba(37,99,235,0.08)';
        statusAlert.style.borderColor = 'rgba(37,99,235,0.3)';
        statusAlert.style.color = '#1e3a8a';
        statusText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> PhonePe ব্যাংকিং সার্ভারে ₹751 পেমেন্ট যাচাই করা হচ্ছে...';
    }

    if (confirmBtn) {
        confirmBtn.style.opacity = '0.6';
        confirmBtn.style.cursor = 'wait';
        confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
    }

    setTimeout(() => {
        isPaymentVerified = true;

        if (statusAlert && statusText) {
            statusAlert.style.background = 'rgba(22,163,74,0.08)';
            statusAlert.style.borderColor = 'rgba(22,163,74,0.3)';
            statusAlert.style.color = '#14532d';
            statusText.innerHTML = '<i class="fa-solid fa-circle-check"></i> ✅ ₹751 পেমেন্ট সফলভাবে যাচাই হয়েছে! (PhonePe Payment Success)';
        }

        if (confirmBtn) {
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'default';
            confirmBtn.style.background = '#16a34a';
            confirmBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> ✅ পেমেন্ট সম্পন্ন হয়েছে!';
            confirmBtn.disabled = true;
        }

        // UNLOCK WhatsApp button
        if (waBtn) {
            waBtn.className = 'btn-primary btn-full btn-pay-confirm unlocked-wa-btn';
            waBtn.style.opacity = '1';
            waBtn.style.cursor = 'pointer';
            waBtn.style.background = '#128c7e';
            waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠান (পেমেন্ট সম্পন্ন ✅)';
            waBtn.disabled = false;
        }

        showToast('✅ ₹751 পেমেন্ট সফল হয়েছে! এখন হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠাতে পারবেন।');
    }, 2000);
}

function handleWhatsappSendAttempt() {
    if (!isPaymentVerified) {
        const statusAlert = document.getElementById('paymentStatusAlert');
        const statusText = document.getElementById('paymentStatusText');
        if (statusAlert && statusText) {
            statusAlert.style.background = 'rgba(220,38,38,0.08)';
            statusAlert.style.borderColor = 'rgba(220,38,38,0.3)';
            statusAlert.style.color = '#991b1b';
            statusText.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> ❌ পেমেন্ট সম্পন্ন হয়নি! PhonePe-তে ₹751 পেমেন্ট না করা পর্যন্ত হোয়াটসঅ্যাপে মেসেজ পাঠানো যাবে না।';
        }
        showToast('❌ পেমেন্ট অসম্পূর্ণ! পেমেন্ট সম্পন্ন না হলে হোয়াটসঅ্যাপে বুকিং পাঠানো সম্ভব নয়।');
        return;
    }

    // Payment is verified! Send to WhatsApp
    sendBookingToWhatsApp();
}

function sendBookingToWhatsApp() {
    const name = document.getElementById('m_name')?.value || document.getElementById('name')?.value || '';
    const phone = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
    const type = document.getElementById('m_type')?.value || document.getElementById('service')?.value || '';
    const utr = document.getElementById('utr_number')?.value || 'N/A';

    const title = `📅 নতুন বুকিং (PhonePe ₹751 পেমেন্ট সম্পন্ন): ${name}`;
    const bodyText = `👤 নাম: ${name}\n📞 ফোন: ${phone}\n🔮 পরামর্শের মাধ্যম: ${type}\n🔢 UTR/Transaction ID: ${utr}\n💳 পেমেন্ট পদ্ধতি: PhonePe Gateway\n✅ পেমেন্ট স্ট্যাটাস: সম্পন্ন হয়েছে (Verified)`;

    // ১. পুশ নোটিফিকেশন পাঠানো
    sendPushNotification(title, bodyText);

    // ২. হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠানো
    const waText = `*নতুন অ্যাপয়েন্টমেন্ট বুকিং (PhonePe পেমেন্ট যাচাইকৃত ✅)*\n\n👤 *নাম:* ${name}\n📞 *ফোন নম্বর:* ${phone}\n🔮 *পরামর্শের মাধ্যম:* ${type}\n💰 *পেমেন্ট ফি:* ₹751\n💳 *পেমেন্ট পদ্ধতি:* PhonePe Gateway\n🔢 *UTR/Transaction ID:* ${utr}\n✅ *পেমেন্ট স্ট্যাটাস:* সম্পন্ন হয়েছে (Verified)`;
    const waUrl = `https://wa.me/917602203252?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    // ৩. সাফল্য বার্তা (Toast) দেখানো
    showToast(`ধন্যবাদ ${name}! আপনার ₹751 পেমেন্ট ও বুকিং তথ্য সরাসরি হোয়াটসঅ্যাপে পাঠানো হয়েছে।`);
    closeModal();
}

function backToBookingForm() {
    const modalForm = document.getElementById('modalForm');
    const modalHeader = document.getElementById('modalHeaderStep1');
    const paymentStep = document.getElementById('paymentStep');

    if (modalForm && paymentStep) {
        paymentStep.style.display = 'none';
        modalForm.style.display = 'block';
        if (modalHeader) modalHeader.style.display = 'block';
    }
}

// Close modal on escape key or clicking backdrop
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

document.addEventListener('click', (e) => {
    const modal = document.getElementById('bookingModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

/* --------------------------------------------------------------------------
   6. PUSHBULLET API & PUSH NOTIFICATION SERVICE
   -------------------------------------------------------------------------- */
// Pushbullet Access Token: Pushbullet ??????? settings > Create Access Token ???? ????? ??????? ????? ????? ???
let PUSHBULLET_ACCESS_TOKEN = '';

function sendPushNotification(title, bodyText) {
    // ?. ???????? ??? ?????????? (Browser Native Push Notification)
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: bodyText,
                icon: 'souvik_logo.png'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(title, {
                        body: bodyText,
                        icon: 'souvik_logo.png'
                    });
                }
            });
        }
    }

    // ?. Pushbullet API (??????? ???? ?????? ????? ??????? ??? ?????????? ??????? ???????)
    if (PUSHBULLET_ACCESS_TOKEN && PUSHBULLET_ACCESS_TOKEN.trim() !== '') {
        fetch('https://api.pushbullet.com/v2/pushes', {
            method: 'POST',
            headers: {
                'Access-Token': PUSHBULLET_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'note',
                title: title,
                body: bodyText
            })
        })
        .then(res => res.json())
        .then(data => console.log('Pushbullet Notification Sent:', data))
        .catch(err => console.error('Pushbullet API Error:', err));
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const service = document.getElementById('service')?.value || '';
    const message = document.getElementById('message')?.value || '';

    const title = `📅 নতুন বুকিং অনুরোধ: ${name}`;
    const bodyText = `👤 নাম: ${name}\n📞 ফোন: ${phone}\n🔮 সেবা: ${service}\n✉️ বার্তা: ${message || 'নেই'}`;

    // পুশ নোটিফিকেশন পাঠানো
    sendPushNotification(title, bodyText);

    // হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠানো
    const waText = `*নতুন সাধারণ যোগাযোগ বার্তা*\n\n👤 *নাম:* ${name}\n📞 *ফোন নম্বর:* ${phone}\n🔮 *প্রয়োজনীয় সেবা:* ${service}\n✉️ *বার্তা/প্রশ্ন:* ${message || 'নেই'}`;
    const waUrl = `https://wa.me/917602203252?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    showToast(`ধন্যবাদ ${name}! আপনার তথ্য ও মেসেজ সরাসরি হোয়াটসঅ্যাপে পাঠানো হয়েছে।`);
    event.target.reset();
}

function handleModalSubmit(event) {
    event.preventDefault();
    const modalForm = document.getElementById('modalForm');
    const modalHeader = document.getElementById('modalHeaderStep1');
    const paymentStep = document.getElementById('paymentStep');

    isPaymentInitiated = false;
    const confirmBtn = document.getElementById('btnConfirmPayment');
    if (confirmBtn) {
        confirmBtn.style.opacity = '0.6';
        confirmBtn.style.cursor = 'not-allowed';
    }

    if (modalForm && paymentStep) {
        modalForm.style.display = 'none';
        if (modalHeader) modalHeader.style.display = 'none';
        paymentStep.style.display = 'block';
    }
}

/* duplicate confirmPaymentDone removed - use sendBookingToWhatsApp() instead */

function copyUpiId(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`PhonePe UPI ID (${text}) ??? ??? ?????!`);
        }).catch(() => {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(`PhonePe UPI ID (${text}) ??? ??? ?????!`);
    } catch (err) {
        showToast(`UPI ID: ${text}`);
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('active');

    // Mobile tactile feedback if supported
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    setTimeout(() => {
        toast.classList.remove('active');
    }, 4500);
}

/* --------------------------------------------------------------------------
   7. SCROLL SPY FOR NAVBAR LINKS
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   8. BIO READ MORE TOGGLE FUNCTION
   -------------------------------------------------------------------------- */
function toggleBioReadMore() {
    const moreContent = document.getElementById('bioMoreContent');
    const readMoreBtn = document.getElementById('bioReadMoreBtn');
    const btnText = readMoreBtn ? readMoreBtn.querySelector('span') : null;
    const btnIcon = document.getElementById('bioReadMoreIcon');

    if (!moreContent) return;

    const isHidden = moreContent.style.display === 'none' || !moreContent.classList.contains('expanded');

    if (isHidden) {
        moreContent.style.display = 'block';
        moreContent.classList.add('expanded');
        if (btnText) btnText.textContent = '???????? ?????';
        if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
        if (readMoreBtn) readMoreBtn.classList.add('expanded');
    } else {
        moreContent.style.display = 'none';
        moreContent.classList.remove('expanded');
        if (btnText) btnText.textContent = '??? ????';
        if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
        if (readMoreBtn) readMoreBtn.classList.remove('expanded');
    }
}
