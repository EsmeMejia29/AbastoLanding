/**
 * ABASTO LANDING PLATFORM - V4 SCRIPT
 * 1. Gateway dinámico con selector de perfiles
 * 2. Showcase interactivo Restaurante vs Distribuidor
 * 3. Animaciones de entrada al hacer scroll y menú móvil
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initAppGateway();
  initShowcaseTabs();
  initScrollReveal();
});

/**
 * 1. Selector Interactivo de Perfil (Restaurante / Distribuidor)
 */
function initAppGateway() {
  const tabs = document.querySelectorAll('.profile-tab');
  const launchBtn = document.getElementById('btnLaunchTarget');
  const roleTitle = document.getElementById('roleTitle');
  const roleDesc = document.getElementById('roleDescription');
  const rfIcon = document.getElementById('rfIcon');
  const baseAppUrl = 'https://abasto-flame.vercel.app/';

  const roleData = {
    restaurante: {
      title: 'Perfil: Restaurante',
      desc: 'Explora proveedores por rubro, califica su servicio, chatea directo y analiza tus gastos mensuales.',
      icon: '🏪',
      param: 'restaurante'
    },
    distribuidor: {
      title: 'Perfil: Distribuidor de Alimentos',
      desc: 'Despacho organizado de pedidos, catálogo digital editable, CRM de clientes y registro de reseñas.',
      icon: '📦',
      param: 'distribuidor'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedRole = tab.getAttribute('data-role');
      if (!selectedRole || !roleData[selectedRole]) return;

      tabs.forEach(t => {
        t.classList.remove('active');
        const check = t.querySelector('.check-icon');
        if (check) check.remove();
      });

      tab.classList.add('active');
      const checkSpan = document.createElement('span');
      checkSpan.className = 'check-icon';
      checkSpan.textContent = '✓';
      tab.prepend(checkSpan);

      if (roleTitle && roleDesc && rfIcon) {
        const preview = document.getElementById('rolePreviewCard');
        if (preview) {
          preview.style.opacity = '0';
          setTimeout(() => {
            roleTitle.textContent = roleData[selectedRole].title;
            roleDesc.textContent = roleData[selectedRole].desc;
            rfIcon.textContent = roleData[selectedRole].icon;
            preview.style.opacity = '1';
          }, 150);
        }
      }

      if (launchBtn) {
        launchBtn.href = `${baseAppUrl}?role=${encodeURIComponent(roleData[selectedRole].param)}`;
      }
    });
  });
}

/**
 * 2. Showcase interactivo Restaurante vs Distribuidor
 */
function initShowcaseTabs() {
  const tabs = document.querySelectorAll('.showcase-tab');
  const viewRestaurante = document.getElementById('viewRestaurante');
  const viewDistribuidor = document.getElementById('viewDistribuidor');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-showcase');
      if (target === 'restaurante') {
        if (viewRestaurante) viewRestaurante.classList.add('active');
        if (viewDistribuidor) viewDistribuidor.classList.remove('active');
      } else {
        if (viewRestaurante) viewRestaurante.classList.remove('active');
        if (viewDistribuidor) viewDistribuidor.classList.add('active');
      }
    });
  });
}

/**
 * 3. Animaciones al Scrollear
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * 4. Menú Móvil
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}