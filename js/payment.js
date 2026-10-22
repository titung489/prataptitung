/* ===================================================
   payment.js — Nepal Payment Gateway Handler
   Supports: eSewa, Khalti, ConnectIPS, PhonePay,
             Bank Transfer, QR Code
   =================================================== */

const PAYMENT_CONFIG = {
  phone: '+977-9845613078',
  esewa: { name: 'eSewa', id: '9845613078', color: '#60bb46', logo: '🟢' },
  khalti: { name: 'Khalti', id: '9845613078', color: '#5c2d91', logo: '🟣' },
  connectips: { name: 'ConnectIPS', id: '9845613078', color: '#003d7a', logo: '🔵' },
  phonepay: { name: 'PhonePay', id: '9845613078', color: '#5f259f', logo: '📱' },
  bank: {
    name: 'NIC Asia Bank Limited',
    accountName: 'PRATAP TITUNG',
    accountNumber: '012300000835',
    swift: 'NPKASIA08',
    branch: 'Nepal'
  }
};

/* -------- Build Payment Modal HTML -------- */
function buildPaymentModalHTML(amount, frequency, purpose) {
  const freqLabel = frequency === 'monthly' ? 'Monthly' : 'One-time';
  const purposeLabel = purpose === 'ebook' ? 'Ebook Purchase' : 'Donation';

  return `
    <div class="payment-modal-header">
      <div class="payment-modal-icon">🙏</div>
      <h3>${purposeLabel}</h3>
      <div class="payment-amount-display">
        <span class="payment-currency">NPR</span>
        <span class="payment-value">${(amount * 133).toFixed(0)}</span>
        <span class="payment-usd">(~\$${parseFloat(amount).toFixed(2)} USD)</span>
      </div>
      <span class="payment-freq-badge">${freqLabel}</span>
    </div>

    <div class="payment-tabs">
      <button class="pay-tab active" data-tab="digital">📱 Digital Wallets</button>
      <button class="pay-tab" data-tab="qr">QR Code</button>
      <button class="pay-tab" data-tab="bank">🏦 Bank Transfer</button>
    </div>

    <!-- Digital Wallets Tab -->
    <div class="pay-tab-content active" id="tab-digital">
      <p class="pay-instruction">Send to the following number on your preferred app:</p>
      <div class="pay-number-display">
        <span>${PAYMENT_CONFIG.phone}</span>
        <button class="copy-btn" onclick="copyToClipboard('${PAYMENT_CONFIG.phone}')">
          <i class="fa-regular fa-copy"></i> Copy
        </button>
      </div>
      <div class="wallet-grid">
        <div class="wallet-card" style="--wc:${PAYMENT_CONFIG.esewa.color}">
          <div class="wallet-logo esewa-logo">eSewa</div>
          <span>${PAYMENT_CONFIG.phone}</span>
        </div>
        <div class="wallet-card" style="--wc:${PAYMENT_CONFIG.khalti.color}">
          <div class="wallet-logo khalti-logo">Khalti</div>
          <span>${PAYMENT_CONFIG.phone}</span>
        </div>
        <div class="wallet-card" style="--wc:${PAYMENT_CONFIG.connectips.color}">
          <div class="wallet-logo connectips-logo">ConnectIPS</div>
          <span>${PAYMENT_CONFIG.phone}</span>
        </div>
        <div class="wallet-card" style="--wc:${PAYMENT_CONFIG.phonepay.color}">
          <div class="wallet-logo phonepay-logo">PhonePay</div>
          <span>${PAYMENT_CONFIG.phone}</span>
        </div>
      </div>
      <p class="pay-note-small">After payment, please send a screenshot to <strong>hello@prataptitung.com</strong> for confirmation.</p>
    </div>

    <!-- QR Tab -->
    <div class="pay-tab-content" id="tab-qr">
      <div class="qr-grid">
        <div class="qr-card">
          <div class="qr-label esewa-label">eSewa QR</div>
          <div class="qr-img-wrap">
            <img src="images/esewa-qr.jpg" alt="eSewa QR Code"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
              style="width:180px;height:180px;object-fit:contain;border-radius:8px;" />
            <div class="qr-placeholder" style="display:none">
              <i class="fa-solid fa-qrcode"></i>
              <span>eSewa QR</span>
              <small>Upload esewa-qr.jpg to /images/</small>
            </div>
          </div>
          <p>Scan with eSewa app</p>
        </div>
        <div class="qr-card">
          <div class="qr-label bank-label">Bank QR</div>
          <div class="qr-img-wrap">
            <img src="images/bank-qr.jpg" alt="Bank QR Code"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
              style="width:180px;height:180px;object-fit:contain;border-radius:8px;" />
            <div class="qr-placeholder" style="display:none">
              <i class="fa-solid fa-qrcode"></i>
              <span>Bank QR</span>
              <small>Upload bank-qr.jpg to /images/</small>
            </div>
          </div>
          <p>Scan with any banking app</p>
        </div>
      </div>
    </div>

    <!-- Bank Transfer Tab -->
    <div class="pay-tab-content" id="tab-bank">
      <div class="bank-details-card">
        <div class="bank-logo-row">
          <div class="bank-icon">🏦</div>
          <div>
            <strong>${PAYMENT_CONFIG.bank.name}</strong>
            <span>SWIFT: ${PAYMENT_CONFIG.bank.swift}</span>
          </div>
        </div>
        <div class="bank-field">
          <span class="bank-label-txt">Account Name</span>
          <div class="bank-value-row">
            <span>${PAYMENT_CONFIG.bank.accountName}</span>
            <button class="copy-btn" onclick="copyToClipboard('${PAYMENT_CONFIG.bank.accountName}')"><i class="fa-regular fa-copy"></i></button>
          </div>
        </div>
        <div class="bank-field">
          <span class="bank-label-txt">Account Number</span>
          <div class="bank-value-row">
            <span class="mono">${PAYMENT_CONFIG.bank.accountNumber}</span>
            <button class="copy-btn" onclick="copyToClipboard('${PAYMENT_CONFIG.bank.accountNumber}')"><i class="fa-regular fa-copy"></i></button>
          </div>
        </div>
        <div class="bank-field">
          <span class="bank-label-txt">SWIFT Code</span>
          <div class="bank-value-row">
            <span class="mono">${PAYMENT_CONFIG.bank.swift}</span>
            <button class="copy-btn" onclick="copyToClipboard('${PAYMENT_CONFIG.bank.swift}')"><i class="fa-regular fa-copy"></i></button>
          </div>
        </div>
      </div>
      <p class="pay-note-small">After transfer, email your transaction receipt to <strong>hello@prataptitung.com</strong></p>
    </div>

    <div class="payment-done-row">
      <button class="btn btn-primary full-width" onclick="confirmPaymentSent('${purposeLabel}', '${amount}')">
        <i class="fa-solid fa-check-circle"></i> I've Completed the Payment
      </button>
    </div>
  `;
}

/* -------- Tab switching -------- */
function initPaymentTabs(container) {
  const tabs = container.querySelectorAll('.pay-tab');
  const contents = container.querySelectorAll('.pay-tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = container.querySelector(`#tab-${tab.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
}

/* -------- Copy helper -------- */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2000);
  });
}
window.copyToClipboard = copyToClipboard;

/* -------- Payment Confirmation -------- */
function confirmPaymentSent(purpose, amount) {
  const modal = document.getElementById('paymentModal') || document.getElementById('donateModal');
  if (!modal) return;
  const inner = modal.querySelector('.modal, .payment-modal-body');
  if (inner) {
    inner.innerHTML = `
      <div style="text-align:center;padding:24px 0">
        <div style="font-size:3rem;margin-bottom:16px">🙏</div>
        <h3 style="margin-bottom:12px">धन्यवाद! Thank You!</h3>
        <p style="color:var(--text-muted);margin-bottom:8px">Your ${purpose} payment has been noted.</p>
        <p style="color:var(--text-muted);margin-bottom:24px">Please send your payment confirmation to <strong>hello@prataptitung.com</strong> so we can verify and process it promptly.</p>
        <button class="btn btn-primary" onclick="document.getElementById('${modal.id}').classList.remove('active')">Close</button>
      </div>`;
  }
}
window.confirmPaymentSent = confirmPaymentSent;

/* -------- Open Payment Modal -------- */
function openPaymentModal(amount, frequency, purpose = 'donation') {
  let modal = document.getElementById('paymentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'paymentModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `<div class="modal payment-modal"><button class="modal-close" onclick="document.getElementById('paymentModal').classList.remove('active')">&times;</button><div class="payment-modal-body"></div></div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
  }
  modal.querySelector('.payment-modal-body').innerHTML = buildPaymentModalHTML(amount, frequency, purpose);
  modal.classList.add('active');
  initPaymentTabs(modal);
}
window.openPaymentModal = openPaymentModal;
