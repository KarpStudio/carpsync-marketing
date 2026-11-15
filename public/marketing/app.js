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
