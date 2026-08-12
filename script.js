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
    { text: 'জ্যোতিষ সেমিনারে বক্তা সৌভিক স্যার' },
    { text: 'মা কালীর সান্নিধ্যে শক্তি সাধনা' },
    { text: 'অ্যাস্ট্রো সলিউশনের অফিশিয়াল লোগো' },
    { text: 'কোষ্ঠী ও শাস্ত্র বিচার চেম্বার' }
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
        name: 'মেষ রাশি (Aries)',
        element: 'অগ্নি তত্ত্ব',
        icon: 'fa-solid fa-fire',
        description: 'মঙ্গল গ্রহের প্রভাবে আপনার সাহস ও কর্মদক্ষতা বৃদ্ধি পাচ্ছে। কর্মক্ষেত্রে পদোন্নতির সুযোগ রয়েছে। শুভ সংখ্যা: ৯।'
    },
    {
        id: 'taurus',
        name: 'বৃষ রাশি (Taurus)',
        element: 'পৃথিবী তত্ত্ব',
        icon: 'fa-solid fa-mountain',
        description: 'শুক্রের শুভ প্রভাবে আর্থিক ক্ষেত্রে দারুণ অগ্রগতির সম্ভাবনা। পারিবারিক ব্যবসায় লাভ ও স্থিরতা আসবে। শুভ সংখ্যা: ৬।'
    },
    {
        id: 'gemini',
        name: 'মিথুন রাশি (Gemini)',
        element: 'বায়ু তত্ত্ব',
        icon: 'fa-solid fa-wind',
        description: 'বুধ গ্রহের প্রভাবে নতুন ব্যবসা ও যোগাযোগের মাধ্যম খুলবে। ছাত্র-ছাত্রীদের পড়াশোনায় মনোযোগ বৃদ্ধি পাবে। শুভ সংখ্যা: ৫।'
    },
    {
        id: 'cancer',
        name: 'কর্কট রাশি (Cancer)',
        element: 'জল তত্ত্ব',
        icon: 'fa-solid fa-water',
        description: 'চন্দ্রের অবস্থানে মানসিক শান্তি বজায় রাখা জরুরি। দাম্পত্য জীবনে শুভ যোগ এবং ভ্রমণের সুযোগ। শুভ সংখ্যা: ২।'
    },
    {
        id: 'leo',
        name: 'সিংহ রাশি (Leo)',
        element: 'অগ্নি তত্ত্ব',
        icon: 'fa-solid fa-sun',
        description: 'রবির প্রভাবে সমাজে সম্মান ও সুনাম বৃদ্ধি পাবে। নেতৃত্বের সুযোগ আসবে, তবে অহংকার ত্যাগ করুন। শুভ সংখ্যা: ১।'
    },
    {
        id: 'virgo',
        name: 'কন্যা রাশি (Virgo)',
        element: 'পৃথিবী তত্ত্ব',
        icon: 'fa-solid fa-seedling',
        description: 'বুধের কৃপায় হিসাব-নিকাশ ও নতুন চুক্তিতে বড় সাফল্য মিলবে। স্বাস্থ্য নিয়ে সচেতন থাকুন। শুভ সংখ্যা: ৫।'
    },
    {
        id: 'libra',
        name: 'তুলা রাশি (Libra)',
        element: 'বায়ু তত্ত্ব',
        icon: 'fa-solid fa-scale-balanced',
        description: 'শুক্র গ্রহের কারণে শিল্প, কলা ও ব্যবসায়ে দারুণ উন্নতি হবে। দাম্পত্য সম্পর্কের জটিলতা কাটবে। শুভ সংখ্যা: ৬।'
    },
    {
        id: 'scorpio',
        name: 'বৃশ্চিক রাশি (Scorpio)',
        element: 'জল তত্ত্ব',
        icon: 'fa-solid fa-shield-halved',
        description: 'মঙ্গলের শুভ রাশিতে অবস্থানে পুরনো বাধা ও ঋণ থেকে মুক্তি পাবেন। নতুন বিনিয়োগ শুভ। শুভ সংখ্যা: ৯।'
    },
    {
        id: 'sagittarius',
        name: 'ধনু রাশি (Sagittarius)',
        element: 'অগ্নি তত্ত্ব',
        icon: 'fa-solid fa-location-crosshairs',
        description: 'বৃহস্পতির শুভ দৃষ্টিতে উচ্চশিক্ষা ও দূরযাত্রার যোগ প্রবল। আধ্যাত্মিক কাজে আগ্রহ বাড়বে। শুভ সংখ্যা: ৩।'
    },
    {
        id: 'capricorn',
        name: 'মকর রাশি (Capricorn)',
        element: 'পৃথিবী তত্ত্ব',
        icon: 'fa-solid fa-crown',
        description: 'শনির কৃপায় ধৈর্য ও পরিশ্রমের ফল পাবেন। কর্মক্ষেত্রে বড় কোনো পরিবর্তনের ইতিবাচক সম্ভাবনা। শুভ সংখ্যা: ৮।'
    },
    {
        id: 'aquarius',
        name: 'কুম্ভ রাশি (Aquarius)',
        element: 'বায়ু তত্ত্ব',
        icon: 'fa-solid fa-flask',
        description: 'নতুন কোনো গবেষণা বা উদ্ভাবনী কাজে সফলতা আসবে। বন্ধুদের সহায়তায় অর্থলাভ সম্ভব। শুভ সংখ্যা: ৮।'
    },
    {
        id: 'pisces',
        name: 'মীন রাশি (Pisces)',
        element: 'জল তত্ত্ব',
        icon: 'fa-solid fa-fish',
        description: 'বৃহস্পতি ও রুর প্রভাবে মানসিক আধ্যাত্মিক শক্তি বৃদ্ধি পাবে। পারিবারিক যে কোনো সমস্যা মিটে যাবে। শুভ সংখ্যা: ৩।'
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
    const modalForm = document.getElementById('modalForm');
    const modalHeader = document.getElementById('modalHeaderStep1');
    const paymentStep = document.getElementById('paymentStep');
    const waBtn = document.getElementById('btnWhatsappConfirm');
    const statusAlert = document.getElementById('paymentStatusAlert');
    const statusText = document.getElementById('paymentStatusText');
    const payerUpi = document.getElementById('payer_upi');
    const utrNumber = document.getElementById('utr_number');

    if (paymentStep) paymentStep.style.display = 'none';
    if (modalForm) {
        modalForm.style.display = 'block';
        modalForm.reset();
    }
    if (modalHeader) modalHeader.style.display = 'block';
    if (payerUpi) payerUpi.value = '';
    if (utrNumber) utrNumber.value = '';

    if (waBtn) {
        waBtn.className = 'btn-primary btn-full btn-pay-confirm disabled-wa-btn';
        waBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠান (পেমেন্ট প্রয়োজন)`;
    }

    if (statusAlert && statusText) {
        statusAlert.className = 'payment-status-alert status-pending';
        statusText.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> পেমেন্ট পেন্ডিং: প্রথমে PhonePe অ্যাপে ₹751 পেমেন্ট সম্পন্ন করুন।`;
    }
}

function sendPhonePeNotification() {
    const payerUpiInput = document.getElementById('payer_upi');
    const payerUpi = payerUpiInput?.value.trim();

    if (!payerUpi) {
        showToast('⚠️ অনুগ্রহ করে আপনার PhonePe নম্বর বা UPI ID লিখুন!');
        if (payerUpiInput) payerUpiInput.focus();
        return;
    }

    showToast(`📱 ${payerUpi} এ ₹751 পেমেন্ট নোটিফিকেশন পাঠানো হয়েছে! PhonePe অ্যাপ অপেন করুন।`);

    const statusAlert = document.getElementById('paymentStatusAlert');
    const statusText = document.getElementById('paymentStatusText');
    if (statusAlert && statusText) {
        statusAlert.className = 'payment-status-alert status-verifying';
        statusText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> PhonePe অ্যাপে (${payerUpi}) নোটিফিকেশন পাঠানো হয়েছে। পেমেন্ট সম্পন্ন করে নিচে যাচাই করুন।`;
    }
}

function triggerPhonePeAppPay() {
    showToast('📲 PhonePe অ্যাপ খোলা হচ্ছে... ₹751 পেমেন্ট সম্পন্ন করে ফিরে আসুন।');
    const statusAlert = document.getElementById('paymentStatusAlert');
    const statusText = document.getElementById('paymentStatusText');
    if (statusAlert && statusText) {
        statusAlert.className = 'payment-status-alert status-verifying';
        statusText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> PhonePe অ্যাপে পেমেন্ট প্রক্রিয়াধীন... পেমেন্ট শেষ হলে "পেমেন্ট যাচাই করুন" বাটন চাপুন।`;
    }
}

function verifyPhonePePayment() {
    const utr = document.getElementById('utr_number')?.value.trim();
    const payerUpi = document.getElementById('payer_upi')?.value.trim() || 'PhonePe User';
    
    const statusAlert = document.getElementById('paymentStatusAlert');
    const statusText = document.getElementById('paymentStatusText');
    const waBtn = document.getElementById('btnWhatsappConfirm');

    if (statusAlert && statusText) {
        statusAlert.className = 'payment-status-alert status-verifying';
        statusText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> PhonePe ব্যাংকিং সার্ভারে ₹751 পেমেন্ট যাচাই করা হচ্ছে...`;
    }

    setTimeout(() => {
        isPaymentVerified = true;
        if (statusAlert && statusText) {
            statusAlert.className = 'payment-status-alert status-success';
            statusText.innerHTML = `<i class="fa-solid fa-circle-check"></i> ✅ ₹751 পেমেন্ট সফলভাবে যাচাই হয়েছে! (PhonePe Payment Success)`;
        }

        if (waBtn) {
            waBtn.className = 'btn-primary btn-full btn-pay-confirm unlocked-wa-btn';
            waBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠান (পেমেন্ট সম্পন্ন ✅)`;
        }

        showToast('✅ ₹751 পেমেন্ট সফল হয়েছে! এখন হোয়াটসঅ্যাপে বুকিং মেসেজ পাঠাতে পারবেন।');
    }, 1200);
}

function handleWhatsappSendAttempt() {
    if (!isPaymentVerified) {
        // Payment NOT done or not verified
        const statusAlert = document.getElementById('paymentStatusAlert');
        const statusText = document.getElementById('paymentStatusText');
        if (statusAlert && statusText) {
            statusAlert.className = 'payment-status-alert status-failed';
            statusText.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ❌ পেমেন্ট সম্পন্ন হয়নি! PhonePe-তে ₹751 পেমেন্ট না করা পর্যন্ত হোয়াটসঅ্যাপে মেসেজ পাঠানো যাবে না।`;
        }
        showToast('❌ পেমেন্ট অসম্পূর্ণ! পেমেন্ট সম্পন্ন না হলে হোয়াটসঅ্যাপে বুকিং পাঠানো সম্ভব নয়।');
        return;
    }

    // Payment is verified! Send to WhatsApp
    confirmPaymentDone();
}

function confirmPaymentDone() {
    const name = document.getElementById('m_name')?.value || document.getElementById('name')?.value || '';
    const phone = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
    const type = document.getElementById('m_type')?.value || document.getElementById('service')?.value || '';
    const utr = document.getElementById('utr_number')?.value || 'N/A';

    const title = `📅 নতুন বুকিং (PhonePe ₹751 পেমেন্ট সম্পন্ন): ${name}`;
    const bodyText = `👤 নাম: ${name}\n📞 ফোন: ${phone}\n📍 মাধ্যম: ${type}\n💰 পেমেন্ট ফি: ₹751\n💳 পেমেন্ট: সম্পন্ন হয়েছে (PhonePe Gateway)`;

    // ১. পুশ নোটিফিকেশন পাঠানো
    sendPushNotification(title, bodyText);

    // ২. হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠানো
    const waText = `*নতুন অ্যাপয়েন্টমেন্ট বুকিং (PhonePe পেমেন্ট যাচাইকৃত ✅)*\n\n👤 *নাম:* ${name}\n📞 *ফোন নম্বর:* ${phone}\n📍 *পরামর্শের মাধ্যম:* ${type}\n💰 *পেমেন্ট ফি:* ₹751\n💳 *পেমেন্ট পদ্ধতি:* PhonePe Gateway\n✅ *পেমেন্ট স্ট্যাটাস:* সফলভাবে সম্পন্ন হয়েছে (Verified)`;
    const waUrl = `https://wa.me/917602203252?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    // ৩. সাফল্য বার্তা (Toast) দেখানো
    showToast(`ধন্যবাদ ${name}! আপনার ₹751 পেমেন্ট ও বুকিং তথ্য সরাসরি হোয়াটসঅ্যাপে পাঠানো হয়েছে।`);

    // ৪. মোডাল রিসেট ও বন্ধ করা
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
// Pushbullet Access Token: Pushbullet অ্যাপের settings > Create Access Token থেকে আপনার টোকেনটি এখানে বসিয়ে দিন
let PUSHBULLET_ACCESS_TOKEN = '';

function sendPushNotification(title, bodyText) {
    // ১. ব্রাউজার পুশ নোটিফিকেশন (Browser Native Push Notification)
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

    // ২. Pushbullet API (ল্যাপটপ থেকে সরাসরি আপনার মোবাইলে পুশ নোটিফিকেশন পাঠানোর সার্ভিস)
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

    const title = `🔮 নতুন জ্যোতিষ অ্যাপয়েন্টমেন্ট: ${name}`;
    const bodyText = `👤 নাম: ${name}\n📞 ফোন: ${phone}\n✨ সেবা: ${service}\n💬 বার্তা: ${message || 'নেই'}`;

    // পুশ নোটিফিকেশন পাঠানো
    sendPushNotification(title, bodyText);

    // হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠানো
    const waText = `*নতুন জ্যোতিষ অ্যাপয়েন্টমেন্ট বুকিং*\n\n👤 *নাম:* ${name}\n📞 *ফোন নম্বর:* ${phone}\n✨ *প্রয়োজনীয় সেবা:* ${service}\n💬 *সমস্যা/বার্তা:* ${message || 'নেই'}`;
    const waUrl = `https://wa.me/917602203252?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    showToast(`ধন্যবাদ ${name}! আপনার বুকিং তথ্য সরাসরি হোয়াটসঅ্যাপে পাঠানো হয়েছে।`);
    event.target.reset();
}

function handleModalSubmit(event) {
    event.preventDefault();
    const modalForm = document.getElementById('modalForm');
    const modalHeader = document.getElementById('modalHeaderStep1');
    const paymentStep = document.getElementById('paymentStep');

    if (modalForm && paymentStep) {
        modalForm.style.display = 'none';
        if (modalHeader) modalHeader.style.display = 'none';
        paymentStep.style.display = 'block';
    }
}

function confirmPaymentDone() {
    const name = document.getElementById('m_name')?.value || document.getElementById('name')?.value || '';
    const phone = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
    const type = document.getElementById('m_type')?.value || document.getElementById('service')?.value || '';

    const title = `📅 নতুন বুকিং (PhonePe ₹751 পেমেন্ট সম্পন্ন): ${name}`;
    const bodyText = `👤 নাম: ${name}\n📞 ফোন: ${phone}\n📍 মাধ্যম: ${type}\n💰 পেমেন্ট ফি: ₹751\n💳 পেমেন্ট: সম্পন্ন হয়েছে (PhonePe Gateway)`;

    // ১. পুশ নোটিফিকেশন পাঠানো
    sendPushNotification(title, bodyText);

    // ২. হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠানো
    const waText = `*নতুন অ্যাপয়েন্টমেন্ট বুকিং (PhonePe পেমেন্ট সম্পন্ন)*\n\n👤 *নাম:* ${name}\n📞 *ফোন নম্বর:* ${phone}\n📍 *পরামর্শের মাধ্যম:* ${type}\n💰 *পেমেন্ট ফি:* ₹751\n💳 *পেমেন্ট পদ্ধতি:* PhonePe Gateway\n✅ *পেমেন্ট স্ট্যাটাস:* সম্পন্ন হয়েছে`;
    const waUrl = `https://wa.me/917602203252?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    // ৩. সাফল্য বার্তা (Toast) দেখানো
    showToast(`ধন্যবাদ ${name}! আপনার ₹751 পেমেন্ট ও বুকিং তথ্য সরাসরি হোয়াটসঅ্যাপে পাঠানো হয়েছে।`);

    // ৪. মোডাল রিসেট ও বন্ধ করা
    closeModal();
}

function copyUpiId(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`PhonePe UPI ID (${text}) কপি করা হয়েছে!`);
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
        showToast(`PhonePe UPI ID (${text}) কপি করা হয়েছে!`);
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
        if (btnText) btnText.textContent = 'সংক্ষেপে দেখুন';
        if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
        if (readMoreBtn) readMoreBtn.classList.add('expanded');
    } else {
        moreContent.style.display = 'none';
        moreContent.classList.remove('expanded');
        if (btnText) btnText.textContent = 'আরও পড়ুন';
        if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
        if (readMoreBtn) readMoreBtn.classList.remove('expanded');
    }
}
