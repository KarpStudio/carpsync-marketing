'use strict';

// Keyboard navigation follows the orientation of each tab group.
function wireTabs(selector, update) {
  const tabs = [...document.querySelectorAll(selector)];
  function activate(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    update(tab);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      const vertical = tab.parentElement.getAttribute('aria-orientation') === 'vertical';
      const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
      const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
      let target;
      if (event.key === nextKey) target = tabs[(index + 1) % tabs.length];
      if (event.key === previousKey) target = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === 'Home') target = tabs[0];
      if (event.key === 'End') target = tabs[tabs.length - 1];
      if (target) { event.preventDefault(); activate(target); target.focus(); }
    });
  });
}

wireTabs('.product-tab', tab => {
  document.querySelectorAll('.app-panel').forEach(panel => {
    panel.hidden = panel.id !== `panel-${tab.dataset.panel}`;
  });
  const labels = { calendar: 'Bookings', payments: 'Payments', customers: 'Customers' };
  document.querySelectorAll('.side-item').forEach(item => {
    item.classList.toggle('selected', item.querySelector('span').textContent === labels[tab.dataset.panel]);
  });
});

const venues = {
  french: { kicker: 'THE WEEKLY ESCAPE', heading: 'From first deposit\nto arrival at the lake.', description: 'Set your arrival days, take deposits and keep balances, bait and food packages attached to the trip.', tags: ['Weekly bookings', 'Staged payments', 'Holiday extras'] },
  uk: { kicker: 'THE NEXT SESSION', heading: 'Every swim. Every session.\nOne clear calendar.', description: 'Offer day tickets and overnight sessions, organise individual swims and keep track of who’s arriving at your fishery.', tags: ['Day & night sessions', 'Swim availability', 'Online payments'] },
  exclusive: { kicker: 'THE WHOLE LAKE, TO THEMSELVES', heading: 'Their group. Your lake.\nA simpler booking.', description: 'Take exclusive lake bookings, control the available dates and keep the group’s payment status and extras together.', tags: ['Exclusive hire', 'Group bookings', 'Deposits & balances'] }
};
wireTabs('.venue-choice', tab => {
  const venue = venues[tab.dataset.venue];
  document.getElementById('venue-kicker').textContent = venue.kicker;
  const heading = document.getElementById('venue-heading');
  heading.replaceChildren();
  venue.heading.split('\n').forEach((line, index) => {
    if (index) heading.append(document.createElement('br'));
    heading.append(document.createTextNode(line));
  });
  document.getElementById('venue-description').textContent = venue.description;
  const tags = document.getElementById('venue-tags');
  tags.replaceChildren(...venue.tags.map(label => {
    const span = document.createElement('span'); span.textContent = label; return span;
  }));
  document.getElementById('venue-detail').setAttribute('aria-labelledby', tab.id);
});

const currency = amount => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount / 100);
function bookingTotals() {
  if (!document.getElementById('extras-total')) return;
  let total = 12000;
  document.querySelectorAll('.extras input:checked').forEach(input => { total += Number(input.dataset.price) * 100; });
  const deposit = Math.round(total * 0.3);
  document.getElementById('extras-total').textContent = currency(total);
  document.getElementById('deposit-total').textContent = currency(deposit);
  document.getElementById('balance-total').textContent = currency(total - deposit);
  document.getElementById('confirmation-total').textContent = currency(total);
  document.getElementById('confirmation-deposit').textContent = currency(deposit);
}
document.querySelectorAll('.extras input').forEach(input => input.addEventListener('change', bookingTotals));
bookingTotals();
const confirmation = document.getElementById('booking-confirmation');
const bookingDemo = document.querySelector('.booking-demo');
document.getElementById('demo-continue')?.addEventListener('click', () => {
  bookingDemo.hidden = true;
  confirmation.hidden = false;
  document.querySelector('.floating-note').hidden = true;
  document.getElementById('demo-reset').focus({ preventScroll: true });
});
document.getElementById('demo-reset')?.addEventListener('click', () => {
  bookingDemo.hidden = false;
  confirmation.hidden = true;
  document.querySelector('.floating-note').hidden = false;
  document.getElementById('bait-extra').focus({ preventScroll: true });
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const enquiryForm = document.getElementById('enquiry-form');
enquiryForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  const data = new FormData(enquiryForm);
  const subject = `CarpSync enquiry — ${String(data.get('fishery')).trim()}`;
  const body = [
    'Hi Reece,', '', 'I’m interested in CarpSync for my fishery.', '',
    `Name: ${String(data.get('name')).trim()}`,
    `Email: ${String(data.get('email')).trim()}`,
    `Fishery: ${String(data.get('fishery')).trim()}`,
    `Booking setup: ${data.get('type') || 'To discuss'}`, '',
    ...(data.get('setup_summary') ? ['My setup choices:', String(data.get('setup_summary')), ''] : []),
    String(data.get('message')).trim() || 'Please send me more information about the right setup and pricing.', '',
    `Thanks,\n${String(data.get('name')).trim()}`
  ].join('\n');
  const link = `mailto:reece@karpstudio.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('email-open').href = link;
  document.getElementById('enquiry-text').value = `To: reece@karpstudio.co.uk\nSubject: ${subject}\n\n${body}`;
  document.getElementById('copy-status').textContent = '';
  document.getElementById('email-fallback').hidden = false;
  document.getElementById('email-open').focus({ preventScroll: true });
  document.getElementById('email-fallback').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  window.location.href = link;
});
document.getElementById('copy-enquiry')?.addEventListener('click', async () => {
  const field = document.getElementById('enquiry-text');
  try {
    await navigator.clipboard.writeText(field.value);
    document.getElementById('copy-status').textContent = 'Enquiry copied. Paste it into an email to Reece.';
  } catch {
    field.focus(); field.select();
    document.getElementById('copy-status').textContent = 'Select and copy the enquiry above, then paste it into your email app.';
  }
});

// A persistent, quiet navigation bar keeps the next step within reach.
const siteHeader = document.querySelector('.header');
function updateHeader() { siteHeader?.classList.toggle('scrolled', window.scrollY > 24); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
document.addEventListener('click', event => {
  if (!mobileNav.hidden && !siteHeader.contains(event.target)) closeMenu();
});

function initBookingExplorer() {
  const detail = document.getElementById('booking-detail');
  if (!detail) return;
  const examples = {
    1: { name:'Oliver M.', session:'Swim 1 · 12–14 July 2027', status:'Paid in full', total:16000, paid:16000, note:'The session and full payment are recorded together. No extras in this example.' },
    2: { name:'Alex P.', session:'Swim 2 · 14–17 July 2027', status:'Deposit paid', total:24000, paid:8000, note:'The deposit is recorded and the remaining balance stays attached to the booking.', amber:true },
    3: { name:'Provisional hold', session:'Swim 1 · 16–18 July 2027', status:'Held', note:'This example is a provisional hold, rather than a confirmed, paid booking.', amber:true },
    4: { name:'James C.', session:'Swim 3 · 17–19 July 2027 · 2 anglers', status:'Deposit paid', total:12000, paid:4000, note:'A two-night session for two anglers. Extras selected during checkout would be kept with this booking.', amber:true },
    5: { name:'Thomas B.', session:'Swim 4 · 12–15 July 2027', status:'Paid in full', total:24000, paid:24000, note:'Arrival dates, the booked swim and payment status are visible in the same record.' },
    6: { name:'Daniel S.', session:'Swim 5 · 13–15 July 2027', status:'Part paid', total:16000, paid:12000, note:'The partial payment is recorded, with £40 remaining against the booking.', amber:true },
    7: { name:'Provisional hold', session:'Swim 5 · 16–17 July 2027', status:'Held', note:'This is an illustrative hold. There is no confirmed payment against it.', amber:true }
  };
  const bookings = [...document.querySelectorAll('[data-booking]')];
  let activeButton = null;
  function closeDetail() {
    detail.hidden = true;
    bookings.forEach(button => { button.classList.remove('is-selected'); button.setAttribute('aria-expanded','false'); });
    activeButton?.focus();
  }
  bookings.forEach(button => button.addEventListener('click', () => {
    if (activeButton === button && !detail.hidden) { closeDetail(); return; }
    const booking = examples[button.dataset.booking];
    activeButton = button;
    bookings.forEach(item => {
      const active = item === button;
      item.setAttribute('aria-expanded', String(active));
      item.classList.toggle('is-selected', active);
    });
    document.getElementById('booking-detail-title').textContent = booking.name;
    document.getElementById('detail-session').textContent = booking.session;
    const badge = document.getElementById('detail-status');
    badge.textContent = booking.status;
    badge.className = booking.amber ? 'pill amber' : 'pill';
    document.getElementById('detail-total').textContent = booking.total === undefined ? 'Not confirmed' : currency(booking.total);
    document.getElementById('detail-paid').textContent = booking.paid === undefined ? '—' : currency(booking.paid);
    document.getElementById('detail-balance').textContent = booking.total === undefined ? '—' : currency(booking.total - booking.paid);
    document.getElementById('detail-note').textContent = booking.note;
    detail.hidden = false;
    document.getElementById('booking-detail-title').focus({preventScroll:true});
    detail.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
  }));
  detail.querySelector('.detail-close').addEventListener('click', closeDetail);
}
initBookingExplorer();

function initSetupFinder() {
  const finder = document.getElementById('setup-finder');
  if (!finder) return;
  const steps = [...finder.querySelectorAll('.setup-step')];
  const next = finder.querySelector('.setup-next');
  const back = finder.querySelector('.setup-back');
  const questions = document.getElementById('setup-questions');
  const result = document.getElementById('setup-result');
  const live = document.getElementById('setup-live');
  let step = 0;
  const venues = {
    sessions: {label:'Individual swims & sessions',form:'Individual swims / sessions',point:'Swim availability and day or overnight sessions in a central booking calendar.'},
    holidays: {label:'Weekly carp holidays',form:'Weekly carp holidays',point:'Weekly stays, arrival days and holiday extras reviewed around your venue.'},
    exclusive: {label:'Exclusive lake hire',form:'Exclusive lake hire',point:'Whole-lake availability and group bookings kept together.'},
    mixed: {label:'A mix of booking types',form:'A mix of booking types',point:'A review of your session types, capacity and booking rules before configuration.'}
  };
  const websites = {
    existing: {label:'Keep my current website',point:'Review a booking connection for the website your anglers already use.'},
    new: {label:'A new website alongside CarpSync',point:'Discuss a bespoke Karp Studio venue website connected to CarpSync.'},
    starting: {label:'Starting a new venue',point:'Plan your customer-facing website and booking setup together.'}
  };
  const payments = {
    full: {label:'Full payment when booking',point:'Review full payment at checkout, with the payment recorded against the booking.'},
    deposit: {label:'A deposit, then the balance',point:'Agree the deposit, balance schedule and payment reminders for your venue.'},
    discuss: {label:'Help choosing the payment setup',point:'Discuss deposits and full payment before choosing a payment routine.'}
  };
  const answer = name => finder.querySelector(`input[name="${name}"]:checked`)?.value;
  function renderStep(focus = false) {
    finder.classList.remove('is-complete');
    steps.forEach((item,index) => { item.hidden = index !== step; });
    questions.hidden = false;
    result.hidden = true;
    document.getElementById('setup-progress').textContent = `${step+1} of 3`;
    back.hidden = step === 0;
    next.disabled = !steps[step].querySelector('input:checked');
    const arrow = document.createElement('span'); arrow.textContent='→'; arrow.setAttribute('aria-hidden','true');
    next.replaceChildren(document.createTextNode(step === 2 ? 'See my setup ' : 'Continue '),arrow);
    live.textContent = `Step ${step+1} of 3: ${steps[step].querySelector('legend').textContent}`;
    if (focus) { const legend=steps[step].querySelector('legend'); legend.tabIndex=-1; legend.focus({preventScroll:true}); finder.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}); }
  }
  function selected() {
    return {venue:venues[answer('setup-venue')],website:websites[answer('setup-website')],payment:payments[answer('setup-payment')]};
  }
  function showResult() {
    const choice = selected();
    if (!choice.venue || !choice.website || !choice.payment) return;
    document.getElementById('setup-result-intro').textContent = `${choice.venue.label}, with a setup shaped around your website and payments.`;
    document.getElementById('setup-result-points').replaceChildren(...[choice.venue.point,choice.website.point,choice.payment.point].map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
    questions.hidden = true;
    result.hidden = false;
    finder.classList.add('is-complete');
    document.getElementById('setup-progress').textContent = 'Your outline';
    live.textContent = 'Your starting setup is ready to review.';
    document.getElementById('setup-result-title').focus({preventScroll:true});
    finder.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }
  finder.querySelectorAll('.setup-options input').forEach(input => input.addEventListener('change', () => { next.disabled = false; }));
  next.addEventListener('click', () => {
    if (!steps[step].querySelector('input:checked')) return;
    if (step === 2) showResult(); else {step++;renderStep(true);}
  });
  back.addEventListener('click', () => {step=Math.max(0,step-1);renderStep(true);});
  finder.querySelector('.setup-restart').addEventListener('click', () => {step=0;renderStep(true);});
  finder.querySelector('.setup-enquire').addEventListener('click', () => {
    const choice = selected();
    const summary = [`Bookings: ${choice.venue.label}`,`Website: ${choice.website.label}`,`Payments: ${choice.payment.label}`].join('\n');
    document.getElementById('setup-summary').value = summary;
    document.getElementById('type').value = choice.venue.form;
    document.getElementById('chosen-setup-description').textContent = [choice.venue.label,choice.website.label,choice.payment.label].join(' · ');
    document.getElementById('chosen-setup').hidden = false;
    enquiryForm.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    document.getElementById('name').focus({preventScroll:true});
  });
  document.getElementById('clear-setup').addEventListener('click', () => {
    document.getElementById('setup-summary').value = '';
    document.getElementById('chosen-setup').hidden = true;
    document.getElementById('type').focus({preventScroll:true});
  });
  renderStep();
}
initSetupFinder();
