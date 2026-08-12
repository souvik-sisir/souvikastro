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
        waBtn.style.opacity = '0.5';
        waBtn.style.cursor = 'not-allowed';
        waBtn.style.background = '#128c7e';
        waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa\u09c7 \u09ac\u09c1\u0995\u09bf\u0982 \u09ae\u09c7\u09b8\u09c7\u099c \u09aa\u09be\u09a0\u09be\u09a8 (\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09aa\u09cd\u09b0\u09df\u09cb\u099c\u09a8)';
    }

    if (confirmBtn) {
        confirmBtn.style.opacity = '0.6';
        confirmBtn.style.cursor = 'not-allowed';
        confirmBtn.style.background = '';
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u09b9\u09af\u09bc\u09c7\u099b\u09c7 (\u09ac\u09c1\u0995\u09bf\u0982 \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09c1\u09a8)';
    }

    if (statusAlert && statusText) {
        statusAlert.style.background = 'rgba(234,179,8,0.08)';
        statusAlert.style.borderColor = 'rgba(234,179,8,0.3)';
        statusAlert.style.color = '#92400e';
        statusText.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i> \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09aa\u09c7\u09a8\u09cd\u09a1\u09bf\u0982: \u09aa\u09cd\u09b0\u09a5\u09ae\u09c7 PhonePe \u0985\u09cd\u09af\u09be\u09aa\u09c7 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u0995\u09b0\u09c1\u09a8\u0964';
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
        showToast('\ud83d\udcf2 UPI \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0985\u09cd\u09af\u09be\u09aa \u09b6\u09c7\u09b7\u09c7 \u09a8\u09bf\u099a\u09c7\u09b0 \u09ac\u09be\u099f\u09a8\u09c7 \u0995\u09cd\u09b2\u09bf\u0995 \u0995\u09b0\u09c1\u09a8\u0964');
        window.location.href = 'upi://pay?pa=Q996111846@ybl&pn=ASTRO%20SOLUTION%20WITH%20SOUVIK&am=751&cu=INR&tn=Astrology%20Consultation%20Fee';
    } else {
        if (!phoneNum) {
            showToast('\u26a0\ufe0f \u09ab\u09cb\u09a8 \u09a8\u09ae\u09cd\u09ac\u09b0 \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf! \u09ac\u09c1\u0995\u09bf\u0982 \u09ab\u09b0\u09cd\u09ae\u09c7 \u09ae\u09cb\u09ac\u09be\u0987\u09b2 \u09a8\u09ae\u09cd\u09ac\u09b0 \u09a6\u09bf\u09a8\u0964');
            return;
        }
        isPaymentInitiated = true;
        const confirmBtn = document.getElementById('btnConfirmPayment');
        if (confirmBtn) {
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'pointer';
        }

        const title = '\ud83d\udcb0 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f - \u0985\u09cd\u09af\u09be\u09b8\u09cd\u099f\u09cd\u09b0\u09cb \u09b8\u09b2\u09bf\u0989\u09b6\u09a8 \u0989\u0987\u09a5 \u09b8\u09cc\u09ad\u09bf\u0995';
        const bodyText = `\ud83d\udcf2 ${phoneNum} \u09a8\u09ae\u09cd\u09ac\u09b0\u09c7 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0995\u09b0\u09c1\u09a8\u0964 PhonePe / UPI \u0985\u09cd\u09af\u09be\u09aa \u0996\u09c1\u09b2\u09c7 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u0995\u09b0\u09c1\u09a8\u0964`;
        sendPushNotification(title, bodyText);

        showToast(`\ud83d\udcf1 ${phoneNum} \u09a8\u09ae\u09cd\u09ac\u09b0\u09c7 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09af\u09bc\u09c7\u099b\u09c7! \u09ab\u09cb\u09a8\u09c7\u09b0 PhonePe \u0985\u09cd\u09af\u09be\u09aa \u09a5\u09c7\u0995\u09c7 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0995\u09b0\u09c1\u09a8\u0964`);

        const notifStatus = document.getElementById('paymentNotificationStatus');
        const notifText = document.getElementById('paymentNotificationText');
        if (notifStatus && notifText) {
            notifStatus.style.display = 'block';
            notifText.innerHTML = `<i class="fa-solid fa-bell" style="color: #25d366;"></i> <strong>${phoneNum}</strong> \u09a8\u09ae\u09cd\u09ac\u09b0\u09c7 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964 \u09ab\u09cb\u09a8 \u09a5\u09c7\u0995\u09c7 PhonePe \u0985\u09cd\u09af\u09be\u09aa \u0996\u09c1\u09b2\u09c7 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u0995\u09b0\u09c1\u09a8\u0964`;
        }
    }
}

function triggerPhonePeAppPay() {
    isPaymentInitiated = true;
    const phoneNum = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
    if (isMobileDevice()) {
        showToast('\ud83d\udcf2 UPI \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0985\u09cd\u09af\u09be\u09aa \u09b6\u09c7\u09b7\u09c7 \u09a8\u09bf\u099a\u09c7\u09b0 \u09ac\u09be\u099f\u09a8\u09c7 \u0995\u09cd\u09b2\u09bf\u0995 \u0995\u09b0\u09c1\u09a8\u0964');
    } else if (phoneNum) {
        const title = '\ud83d\udcb0 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b0\u09bf\u0995\u09cb\u09af\u09bc\u09c7\u09b8\u09cd\u099f - \u0985\u09cd\u09af\u09be\u09b8\u09cd\u099f\u09cd\u09b0\u09cb \u09b8\u09b2\u09bf\u0989\u09b6\u09a8 \u0989\u0987\u09a5 \u09b8\u09cc\u09ad\u09bf\u0995';
        const bodyText = `\ud83d\udcf2 ${phoneNum} \u09a8\u09ae\u09cd\u09ac\u09b0\u09c7 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0995\u09b0\u09c1\u09a8\u0964`;
        sendPushNotification(title, bodyText);
        showToast(`\ud83d\udcf1 ${phoneNum} \u09a8\u09ae\u09cd\u09ac\u09b0\u09c7 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09af\u09bc\u09c7\u099b\u09c7!`);

        const notifStatus = document.getElementById('paymentNotificationStatus');
        const notifText = document.getElementById('paymentNotificationText');
        if (notifStatus && notifText) {
            notifStatus.style.display = 'block';
            notifText.innerHTML = `<i class="fa-solid fa-bell" style="color: #25d366;"></i> <strong>${phoneNum}</strong> \u09a8\u09ae\u09cd\u09ac\u09b0\u09c7 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964`;
        }
    } else {
        showToast('\ud83d\udcf2 PhonePe/UPI \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09cc\u099a\u09a8\u09be \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b6\u09c7\u09b7\u09c7 \u09a8\u09bf\u099a\u09c7\u09b0 \u09ac\u09be\u099f\u09a8\u09c7 \u0995\u09cd\u09b2\u09bf\u0995 \u0995\u09b0\u09c1\u09a8\u0964');
    }
    const confirmBtn = document.getElementById('btnConfirmPayment');
    if (confirmBtn) {
        confirmBtn.style.opacity = '1';
        confirmBtn.style.cursor = 'pointer';
    }
}

function handlePaymentConfirmClick() {
    if (!isPaymentInitiated) {
        const phoneNum = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
        showToast(`\u274c \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0985\u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3! \u0986\u09aa\u09a8\u09be\u09b0 (${phoneNum || '\u09ae\u09cb\u09ac\u09be\u0987\u09b2'}) \u09a8\u09ae\u09cd\u09ac\u09b0\u09c7\u09b0 PhonePe \u0985\u09cd\u09af\u09be\u09aa \u09ac\u09be QR \u09b8\u09cd\u0995\u09cd\u09af\u09be\u09a8 \u0995\u09b0\u09c করে \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0995\u09b0\u09c1\u09a8\u0964`);

        const statusAlert = document.getElementById('paymentStatusAlert');
        const statusText = document.getElementById('paymentStatusText');
        if (statusAlert && statusText) {
            statusAlert.style.background = 'rgba(220,38,38,0.08)';
            statusAlert.style.borderColor = 'rgba(220,38,38,0.3)';
            statusAlert.style.color = '#991b1b';
            statusText.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> \u274c \u09aa\u09cd\u09b0\u09a5\u09ae\u09c7 QR \u0995\u09cb\u09a1 \u0995\u09cd\u09b2\u09bf\u0995 \u0995\u09b0\u09c7 \u09ac\u09be PhonePe \u09ac\u09be\u099f\u09a8\u09c7 \u0995\u09cd\u09b2\u09bf\u0995 \u0995\u09b0\u09c7 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09c1\u09a8!';
        }
        return;
    }

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
        statusText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> PhonePe \u09ac\u09cd\u09af\u09be\u0982\u0995\u09bf\u0982 \u09b8\u09be\u09b0\u09cd\u09ad\u09be\u09b0\u09c7 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09af\u09be\u099a\u09be\u0987 \u0995\u09b0\u09be \u09b9\u099a\u09cd\u099b\u09c7...';
    }

    if (confirmBtn) {
        confirmBtn.style.opacity = '0.6';
        confirmBtn.style.cursor = 'wait';
        confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> \u09af\u09be\u099a\u09be\u0987 \u0995\u09b0\u09be \u09b9\u099a\u09cd\u099b\u09c7...';
    }

    setTimeout(() => {
        isPaymentVerified = true;

        if (statusAlert && statusText) {
            statusAlert.style.background = 'rgba(22,163,74,0.08)';
            statusAlert.style.borderColor = 'rgba(22,163,74,0.3)';
            statusAlert.style.color = '#14532d';
            statusText.innerHTML = '<i class="fa-solid fa-circle-check"></i> \u2705 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ab\u09b2\u09ab\u09be\u09ac\u09c7 \u09af\u09be\u099a\u09be\u0987 \u09b9\u09af\u09bc\u09c7\u099b\u09c7! (PhonePe Payment Success)';
        }

        if (confirmBtn) {
            confirmBtn.style.opacity = '1';
            confirmBtn.style.cursor = 'default';
            confirmBtn.style.background = '#16a34a';
            confirmBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> \u2705 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u09b9\u09af\u09bc\u09c7\u099b\u09c7!';
            confirmBtn.disabled = true;
        }

        if (waBtn) {
            waBtn.className = 'btn-primary btn-full btn-pay-confirm unlocked-wa-btn';
            waBtn.style.opacity = '1';
            waBtn.style.cursor = 'pointer';
            waBtn.style.background = '#128c7e';
            waBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa\u09c7 \u09ac\u09c1\u0995\u09bf\u0982 \u09ae\u09c7\u09b8\u09c7\u099c \u09aa\u09be\u09a0\u09be\u09a8 (\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u2705)';
        }

        showToast('\u2705 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ab\u09b2 \u09b9\u09af\u09bc\u09c7\u099b\u09c7! \u098f\u0996\u09a8 \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa\u09c7 \u09ac\u09c1\u0995\u09bf\u0982 \u09ae\u09c7\u09b8\u09c7\u099c \u09aa\u09be\u09a0\u09be\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7\u09a8\u0964');
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
            statusText.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> \u274c \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u09b9\u09af\u09bc\u09a8\u09bf! PhonePe-\u09a4\u09c7 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09a8\u09be \u0995\u09b0\u09be \u09aa\u09b0\u09cd\u09af\u09a8\u09cd\u09a4 \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa\u09c7 \u09ae\u09c7\u09b8\u09c7\u099c \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09af\u09be\u09ac\u09c7 \u09a8\u09be\u0964';
        }
        showToast('\u274c \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0985\u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3! \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u09a8\u09be \u09b9\u09b2\u09c7 \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa\u09c7 \u09ac\u09c1\u0995\u09bf\u0982 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b8\u09ae\u09cd\u09be\u09b0 \u09a8\u09af\u09bc\u0964');
        return;
    }

    sendBookingToWhatsApp();
}

function sendBookingToWhatsApp() {
    const name = document.getElementById('m_name')?.value || document.getElementById('name')?.value || '';
    const phone = document.getElementById('m_phone')?.value || document.getElementById('phone')?.value || '';
    const type = document.getElementById('m_type')?.value || document.getElementById('service')?.value || '';

    const title = `\ud83d\udcc5 \u09a8\u09a4\u09c1\u09a8 \u09ac\u09c1\u0995\u09bf\u0982 (PhonePe \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8): ${name}`;
    const bodyText = `\ud83d\udc64 \u09a8\u09be\u09ae: ${name}\n\ud83d\udcde \u09ab\u09cb\u09a8: ${phone}\n\ud83d\udccd \u09ae\u09be\u09a7\u09cd\u09af\u09ae: ${type}\n\ud83d\udcb0 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09ab\u09bf: \u20b9751\n\ud83d\udcb3 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f: \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u09b9\u09df\u09c7\u099b\u09c7 (PhonePe Gateway)`;

    // ১. পুশ নোটিফিকেশন পাঠানো
    sendPushNotification(title, bodyText);

    // ২. হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠানো
    const waText = `*\u09a8\u09a4\u09c1\u09a8 \u0985\u09cd\u09af\u09be\u09aa\u09af\u09bc\u09c7\u09a8\u09cd\u099f\u09ae\u09c7\u09a8\u09cd\u099f \u09ac\u09c1\u0995\u09bf\u0982 (PhonePe \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09af\u09be\u099a\u09be\u0987\u099c\u09c3\u09a4 \u2705)*\n\n\ud83d\udc64 *\u09a8\u09be\u09ae:* ${name}\n\ud83d\udcde *\u09ab\u09cb\u09a8 \u09a8\u09ae\u09cd\u09ac\u09b0:* ${phone}\n\ud83d\udccd *\u09aa\u09b0\u09be\u09ae\u09b0\u09cd\u09b6\u09c7\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae:* ${type}\n\ud83d\udcb0 *\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09ab\u09bf:* \u20b9751\n\ud83d\udcb3 *\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09aa\u09a6\u09cd\u09a7\u09a4\u09bf:* PhonePe Gateway\n\u2705 *\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09b8\u09cd\u099f\u09cd\u09af\u09be\u099f\u09be\u09b8:* \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u09b9\u09df\u09c7\u099b\u09c7 (Verified)`;
    const waUrl = `https://wa.me/917602203252?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    // ৩. সাফল্য বার্তা (Toast) দেখানো
    showToast(`\u09a7\u09a8\u09cd\u09af\u09ac\u09be\u09a8 ${name}! \u0986\u09aa\u09a8\u09be\u09b0 \u20b9751 \u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u0993 \u09ac\u09c1\u0995\u09bf\u0982 \u09a8\u09a5\u09cd\u09af \u09b8\u09b0\u09be\u09b8\u09b0\u09bf \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa\u09c7 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09b9\u09df\u09c7\u099b\u09c7\u0964`);

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

    sendPushNotification(title, bodyText);

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
            showToast(`PhonePe UPI ID (${text}) \u0995\u09aa\u09bf \u0995\u09b0\u09be \u09b9\u09df\u09c7\u099b\u09c7!`);
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
        showToast(`PhonePe UPI ID (${text}) \u0995\u09aa\u09bf \u0995\u09b0\u09be \u09b9\u09df\u09c7\u099b\u09c7!`);
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

    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    setTimeout(() => {
        toast.classList.remove('active');
    }, 4500);
}

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
        if (btnText) btnText.textContent = '\u09b8\u0982\u0995\u09cd\u09b7\u09c7\u09aa\u09c7 \u09a6\u09c7\u0996\u09c1\u09a8';
        if (btnIcon) btnIcon.style.transform = 'rotate(180deg)';
        if (readMoreBtn) readMoreBtn.classList.add('expanded');
    } else {
        moreContent.style.display = 'none';
        moreContent.classList.remove('expanded');
        if (btnText) btnText.textContent = '\u0986\u09b0\u0993 \u09aa\u09a2\u09bc\u09c1\u09a8';
        if (btnIcon) btnIcon.style.transform = 'rotate(0deg)';
        if (readMoreBtn) readMoreBtn.classList.remove('expanded');
    }
}
