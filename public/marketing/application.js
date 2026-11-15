(() => {
  const form = document.getElementById('application-form');
  if (!form) return;
  const lakeInput = form.querySelector('[name="lakeCount"]');
  const periodInput = form.querySelector('[name="billingInterval"]');
  const quote = document.getElementById('application-quote');
  const error = document.getElementById('application-error');
  const button = document.getElementById('application-submit');
  function price() {
    const lakes = Number(lakeInput.value);
    if (!Number.isInteger(lakes) || lakes < 1 || lakes > 20) {
      quote.textContent = 'Choose between 1 and 20 lakes for an indicative price.';
      return;
    }
    const annual = periodInput.value === 'year';
    const amount = (annual ? 390 : 39) + (lakes - 1) * (annual ? 150 : 15);
    quote.textContent = 'Your CarpSync subscription: £' + amount.toLocaleString('en-GB') + '/' + (annual ? 'year' : 'month') + ' for ' + lakes + (lakes === 1 ? ' lake' : ' lakes') + '. 0% direct booking commission. Normal payment processing fees apply.';
  }
  lakeInput.addEventListener('input', price);
  periodInput.addEventListener('change', price);
  price();
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const data = new FormData(form);
    const fields = Object.fromEntries(data.entries());
    const payload = {
      ownerName: String(fields.ownerName || ''),
      ownerEmail: String(fields.ownerEmail || ''),
      fisheryName: String(fields.fisheryName || ''),
      websiteUrl: String(fields.websiteUrl || '') || null,
      country: String(fields.country || 'United Kingdom'),
      lakeCount: Number(fields.lakeCount),
      bookingType: String(fields.bookingType || 'mixed'),
      billingInterval: String(fields.billingInterval || 'month'),
      interestedInLakeBooker: data.has('interestedInLakeBooker'),
      notes: String(fields.notes || ''),
      companyWebsite: String(fields.companyWebsite || ''),
    };
    error.hidden = true;
    sending = true;
    button.disabled = true;
    button.textContent = 'Submitting…';
    try {
      const response = await fetch('/api/apply', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin', body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const text = await response.json().catch(() => ({}));
        throw new Error(text.message || 'We could not submit your application. Please try again.');
      }
      const body = await response.json();
      if (body.accepted !== true) throw new Error('The application was not accepted. Please try again.');
      form.hidden = true;
      const success = document.getElementById('application-success');
      success.hidden = false;
      success.setAttribute('tabindex', '-1');
      success.focus({ preventScroll: true });
      success.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    } catch (caught) {
      error.textContent = caught instanceof Error ? caught.message : 'We could not submit your application.';
      error.hidden = false;
      error.scrollIntoView({ block: 'nearest' });
    } finally {
      sending = false;
      button.disabled = false;
      button.textContent = 'Submit my application →';
    }
  });
})();
