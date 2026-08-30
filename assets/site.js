
(() => {
  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];

  // Scroll progress + nav state
  const progress = $('.scroll-progress');
  const nav = $('.nav');
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if(progress) progress.style.width = max ? `${(h.scrollTop/max)*100}%` : '0%';
    if(nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile navigation
  const menuBtn = $('.menu-btn');
  const navLinks = $('.nav-links');
  if(menuBtn && navLinks){
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', navLinks.classList.contains('open'));
      menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
      menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    $$('.nav-links a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open'); document.body.classList.remove('menu-open');
      menuBtn.textContent='☰'; menuBtn.setAttribute('aria-expanded','false');
    }));
  }

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if(e.isIntersecting){
        e.target.style.transitionDelay = `${Math.min(i*60,240)}ms`;
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold:.12});
  $$('.reveal').forEach(el => observer.observe(el));

  // Technology explorer
  const techData = {
    web: {
      kicker:'Web Development + IA',
      title:'Criar para a Web',
      text:'HTML estrutura, CSS dá identidade e JavaScript cria interação. A IA entra como copiloto: ajuda a explorar ideias, testar alternativas e compreender melhor o código.',
      icon:'🌐',
      tags:['HTML5','CSS3','JavaScript','IA','Design','Debug']
    },
    arduino: {
      kicker:'Arduino + C++',
      title:'Código no mundo físico',
      text:'O código deixa o ecrã e passa a controlar componentes reais. Sensores, LEDs e circuitos mostram como hardware e software comunicam através de C++.',
      icon:'🤖',
      tags:['Arduino','C++','Sensores','Circuitos','Hardware','IoT']
    },
    defold: {
      kicker:'Game Development',
      title:'Construir jogos com Defold',
      text:'Um motor profissional de jogos permite ligar objetos, cenas, animações e scripts. Os participantes viram como uma ideia passa a ter regras, mecânicas e interação.',
      icon:'🎮',
      tags:['Defold','Game Objects','Scripts','Input','Animação','Game Design']
    },
    lua: {
      kicker:'Jogos 2D / 3D + Lua',
      title:'Programar comportamentos',
      text:'Lua é uma linguagem leve e poderosa, muito usada em contextos de jogos. Serve para programar movimentos, colisões, pontuação, inimigos, menus e muito mais.',
      icon:'🕹️',
      tags:['Lua','2D','3D','Lógica','Colisões','Mecânicas']
    }
  };
  const techTabs = $$('.tech-tab');
  const kicker = $('#tech-kicker'), title = $('#tech-title'), text = $('#tech-text'),
        icon = $('#tech-icon'), tags = $('#tech-tags');
  techTabs.forEach(tab => tab.addEventListener('click', () => {
    techTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const d = techData[tab.dataset.tech];
    if(!d) return;
    [kicker,title,text,icon,tags].forEach(el => el && el.animate(
      [{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'none'}],
      {duration:280,easing:'ease-out'}
    ));
    if(kicker) kicker.textContent = d.kicker;
    if(title) title.textContent = d.title;
    if(text) text.textContent = d.text;
    if(icon) icon.textContent = d.icon;
    if(tags) tags.innerHTML = d.tags.map(t => `<span>${t}</span>`).join('');
  }));

  // Hero particles
  const hero = $('.hero');
  if(hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const colors = ['#dcff18','#19c8f2','#ff4f91','#8d79ff'];
    for(let i=0;i<16;i++){
      const p=document.createElement('i'); p.className='particle';
      p.style.left=`${8+Math.random()*84}%`; p.style.top=`${12+Math.random()*76}%`;
      p.style.background=colors[i%colors.length];
      p.style.width=p.style.height=`${3+Math.random()*5}px`;
      p.animate([
        {transform:'translate3d(0,0,0)',opacity:.1},
        {transform:`translate3d(${(Math.random()-.5)*55}px,${-50-Math.random()*90}px,0)`,opacity:.75},
        {transform:`translate3d(${(Math.random()-.5)*80}px,${-120-Math.random()*120}px,0)`,opacity:0}
      ], {duration:5500+Math.random()*6000,iterations:Infinity,delay:Math.random()*-5000,easing:'ease-in-out'});
      hero.appendChild(p);
    }
  }

  // Project modal / fullscreen preview
  const modal = $('#project-modal');
  const modalFrame = $('#modal-frame');
  const openModal = $('#open-project-modal');
  const closeModal = $('#close-project-modal');
  if(modal && openModal && modalFrame){
    openModal.addEventListener('click', () => {
      modalFrame.src = 'projeto/';
      modal.classList.add('open');
      document.body.style.overflow='hidden';
    });
    const close = () => {
      modal.classList.remove('open'); modalFrame.src='about:blank'; document.body.style.overflow='';
    };
    closeModal?.addEventListener('click', close);
    modal.addEventListener('click', e => { if(e.target===modal) close(); });
    document.addEventListener('keydown', e => { if(e.key==='Escape') close(); });
  }

  // Copy individual link
  const copyBtn = $('#copy-link');
  const toast = $('#toast');
  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(location.href);
        if(toast){toast.textContent='Ligação copiada. Já podes partilhá-la.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400);}
      }catch(e){
        if(toast){toast.textContent='Não foi possível copiar automaticamente.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400);}
      }
    });
  }
})();
