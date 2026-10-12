import { useState, useEffect, useRef } from 'react'
import './App.css'
import Logo from './components/Logo'
import ContactModal from './components/ContactModal'
import { ToolIcons } from './components/ToolIcons'
import MagazineModal from './components/MagazineModal'
import InvestEaseModal from './components/InvestEaseModal'
import IITDelhiLMSModal from './components/IITDelhiLMSModal'
import ConstructionModal from './components/ConstructionModal'
import FarmiModal from './components/FarmiModal'


// Project data
const projects = [
  {
    id: 1,
    label: 'EDTECH',
    title: 'Govt LMS (IIT Delhi)',
    description: 'A unified learning platform for students, faculty, and administrators.',
    image: '/images/scrolls/lms.jpg',
    isIITDelhiLMS: true
  },
  {
    id: 2,
    label: 'FINTECH',
    title: 'InvestEase',
    description: 'An investment management app that brings all your finances together.',
    image: '/images/scrolls/investease.jpg',
    isInvestEase: true
  },
  {
    id: 3,
    label: 'AGRITECH ・ AI',
    title: 'FarmAI',
    description: 'An intelligent farming companion for healthier crops and stronger communities.',
    image: '/images/scrolls/farmai.jpg',
    isFarmAI: true
  },
  {
    id: 4,
    label: 'Magazine (New)',
    title: "THIS ISN'T HORROR",
    description: 'A visual exploration into the macabre through a crafted interactive magazine reflecting the inevitable crush of the corporate machine. Open the book to read.',
    image: '/images/scrolls/magazine.jpg',
    isMagazine: true,
    isCreativity: true
  },
  {
    id: 5,
    label: 'Game ・ Interactive',
    title: "Flying Dragon",
    subtitle: 'An arcade-style game inspired by Flappy Bird, redesigned with a dragon concept and improved gameplay experience.',
    description: 'Navigate a fire-breathing dragon through procedurally generated obstacles. Features 3 dragon skins, dynamic sky themes, particle effects, and responsive touch/keyboard controls.',
    image: '/images/scrolls/dragon.jpg',
    link: '/flying-dragon/index.html',
    isCreativity: true,
    isPlayable: true
  },
  {
    id: 6,
    label: 'MANAGEMENT',
    title: 'Construction Management',
    description: 'A complete project management solution for smarter construction operations.',
    image: '/images/scrolls/construction.jpg',
    isConstruction: true
  }
]

// Experience data
const experiences = [
  { date: 'Sep 2025–Present', chapter: '05', title: 'Lovely Professional University', role: 'Assistant Professor', tags: ['Research', 'Mentorship', 'Curriculum'], description: 'Guided research proposals, supported patent development, and improved design curriculum aligned with industry practices. Conducted Faculty Development Programs (FDPs) and coordinated NICHE International Conference. 🎓' },
  { date: 'Nov 2024–Apr 2025', chapter: '04', title: 'DBSE', role: 'UI/UX Designer (SRP)', tags: ['Interaction', 'UX Design', 'Teaching'], description: 'Developed and delivered UI/UX curriculum integrating UX research, information architecture, and prototyping. Mentored students in UX Design, Interaction Design, and Design Thinking using Figma, Adobe Suite, and Miro. 🎒' },
  { date: 'Apr 2024–Jul 2024', chapter: '03', title: 'IIT Delhi', role: 'UI/UX Designer (SRP)', tags: ['Prototyping', 'Training', 'Research'], description: 'Designed and delivered UI/UX training curriculum covering research, interaction design, and prototyping. Received a Letter of Recommendation from Dr. Jyoti Kumar, HOD, Department of Design, IIT Delhi. ✨' },
  { date: 'Oct 2023–Apr 2024', chapter: '02', title: 'IIT Delhi', role: 'UI/UX Designer (Intern)', tags: ['EdTech', 'LMS', 'Interactive'], description: 'Contributed to the UX/UI design of a Learning Management System (LMS) for Jharkhand University under CSC Government Services Pvt. Ltd. Supported Digital Media & Design curriculum development, creating interactive learning content. 🏛️' },
  { date: 'Jan 2022–Oct 2023', chapter: '01', title: 'Ezy Foodz', role: 'UI/UX Designer', tags: ['Branding', 'Figma', 'Visuals'], description: 'Led packaging and branding redesign, increasing brand recognition by 20%. Designed visual assets and UI concepts using Figma and Adobe Creative Suite. 🍔' }
]

// Skills data
const designSkills = ['User Research', 'Usability Testing', 'Wireframing & Prototyping', 'Design Systems', 'UX Strategy', 'Product Thinking', 'Data Visualization', 'Branding']
const tools = [
  { name: 'Figma', icon: ToolIcons.Figma },
  { name: 'Framer', icon: ToolIcons.Framer },
  { name: 'Maze', icon: ToolIcons.Maze },
  { name: 'Miro', icon: ToolIcons.Miro },
  { name: 'Adobe Suite', icon: ToolIcons['Adobe Suite'] },
  { name: 'Google Analytics', icon: ToolIcons['Google Analytics'] },
  { name: 'Blender', icon: ToolIcons.Blender },
  { name: 'Uizard', icon: ToolIcons.Uizard },
  { name: 'Galileo AI', icon: ToolIcons['Galileo AI'] }
]

// Certificates data
const certificates = [
  {
    title: 'Enterprise Design Thinking Practitioner',
    issuer: 'IBM (2022)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
  },
  {
    title: 'Digital Skills: User Experience',
    issuer: 'Accenture (2022)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg'
  },
  {
    title: 'Competitive Analysis',
    issuer: 'CareerNinja (2023)',
    logo: 'https://careerninja.in/wp-content/uploads/2021/07/CareerNinja-Logo-NEW-1.png'
  },
  {
    title: 'Strategy for UX Design',
    issuer: 'CareerNinja (2023)',
    logo: 'https://careerninja.in/wp-content/uploads/2021/07/CareerNinja-Logo-NEW-1.png'
  },
  {
    title: 'UX Strategy Tools',
    issuer: 'CareerNinja (2023)',
    logo: 'https://careerninja.in/wp-content/uploads/2021/07/CareerNinja-Logo-NEW-1.png'
  },
  {
    title: 'UI/UX Design Foundation',
    issuer: 'Great Learning (2022)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Great_Learning_logo.png/220px-Great_Learning_logo.png'
  }
]

// Process words
const processWords = ['🔍 Stalk Users', '✏️ Scribble Ideas', '🎨 Make It Pretty', '🧪 Break Things', '✨ Ship Magic']

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeProcess, setActiveProcess] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [progressWidth, setProgressWidth] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMagazineOpen, setIsMagazineOpen] = useState(false)
  const [isInvestEaseOpen, setIsInvestEaseOpen] = useState(false)
  const [isIITDelhiLMSOpen, setIsIITDelhiLMSOpen] = useState(false)
  const [isConstructionOpen, setIsConstructionOpen] = useState(false)
  const [isFarmAIOpen, setIsFarmAIOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  const processRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const cursorSpotRef = useRef(null)

  // Toggle modal-open class on body to hide custom cursor over modals
  
  // Handle audio autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {
        console.log("Audio autoplay blocked by browser");
      });
    }
  }, [])

  useEffect(() => {
    const anyModalOpen = isModalOpen || isMagazineOpen || isInvestEaseOpen || isIITDelhiLMSOpen || isConstructionOpen || isFarmAIOpen
    document.body.classList.toggle('modal-open', anyModalOpen)
  }, [isModalOpen, isMagazineOpen, isInvestEaseOpen, isIITDelhiLMSOpen, isConstructionOpen, isFarmAIOpen])

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Track active section for side nav
      const sections = ['hero', 'work', 'about', 'experience', 'contact']
      let current = 'hero'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 3) {
            current = id
          }
        }
      }
      setActiveSection(current)

      // Process section animation
      if (processRef.current) {
        const rect = processRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight && rect.bottom > 0) {
          const rawProgress = (windowHeight - rect.top) / (windowHeight * 0.5)
          const progress = Math.min(1, Math.max(0, rawProgress))
          setProgressWidth(progress * 100)
          setActiveProcess(Math.min(processWords.length - 1, Math.floor(progress * processWords.length)))
        }
      }

      // Trigger all animation types on scroll
      document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .blur-in').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight - 60) {
          el.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth cursor using RAF
  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = mouseX + 'px'
        cursorDotRef.current.style.top = mouseY + 'px'
      }
      if (cursorSpotRef.current) {
        cursorSpotRef.current.style.left = mouseX + 'px'
        cursorSpotRef.current.style.top = mouseY + 'px'
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.4)
      ringY = lerp(ringY, mouseY, 0.4)
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringX + 'px'
        cursorRingRef.current.style.top = ringY + 'px'
      }
      rafId = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animateRing)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Cursor Spotlight */}
      <div ref={cursorSpotRef} className="cursor-spotlight" />
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* Navigation — Minimal Top Bar */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Logo />
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li><a href="#hero" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#work" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Work</a></li>
            <li><a href="#creativity" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Creativity</a></li>
            <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="#experience" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Experience</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Right-Side Navigation Panel (Desktop) */}
      <aside className="side-nav">
        <div className="side-nav-vertical-text">デザインはより良い未来のために</div>

        <div className="side-nav-items">
          <a href="#hero" className={`side-nav-item ${activeSection === 'hero' ? 'active' : ''}`}>
            <span className="side-nav-icon">⛩</span>
            <div className="side-nav-text">
              <span className="side-nav-label">HOME</span>
              <span className="side-nav-jp">ホーム</span>
            </div>
          </a>
          <a href="#work" className={`side-nav-item ${activeSection === 'work' ? 'active' : ''}`}>
            <span className="side-nav-icon">📜</span>
            <div className="side-nav-text">
              <span className="side-nav-label">WORK</span>
              <span className="side-nav-jp">仕事</span>
            </div>
          </a>
          <a href="#about" className={`side-nav-item ${activeSection === 'about' ? 'active' : ''}`}>
            <span className="side-nav-icon">🧘</span>
            <div className="side-nav-text">
              <span className="side-nav-label">ABOUT</span>
              <span className="side-nav-jp">私について</span>
            </div>
          </a>
          <a href="#experience" className={`side-nav-item ${activeSection === 'experience' ? 'active' : ''}`}>
            <span className="side-nav-icon">📖</span>
            <div className="side-nav-text">
              <span className="side-nav-label">EXPERIENCE</span>
              <span className="side-nav-jp">経歴</span>
            </div>
          </a>
          <a href="#contact" className={`side-nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
            <span className="side-nav-icon">✉️</span>
            <div className="side-nav-text">
              <span className="side-nav-label">CONTACT</span>
              <span className="side-nav-jp">連絡</span>
            </div>
          </a>
        </div>

        <div className="side-nav-social">
          <span className="side-nav-social-label">LET'S CONNECT</span>
          <div className="side-nav-social-icons">
            <a href="https://www.linkedin.com/in/aaqib-uddin-hashmi/" target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
            <a href="https://www.behance.net/aaqibuddin" target="_blank" rel="noopener noreferrer" title="Behance">Be</a>
            <a href="mailto:aaqibuddinhashmi@gmail.com" title="Email">✉</a>
          </div>
        </div>
      </aside>

      {/* Hero Section — Samurai Parallax Scene */}
      <section className="hero" id="hero">
        {/* Layer 1: Background video (Always purely visual, strictly muted so it NEVER stops playing) */}
        <video 
          className="hero-bg-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/hero_bg_with_sound.mp4" type="video/mp4" />
        </video>

        {/* Hidden Audio Element for Background Sound */}
        <audio 
          ref={audioRef} 
          src="/videos/hero_bg_with_sound.mp4" 
          loop 
          muted={isMuted} 
        />

        <button 
          className="sound-toggle"
          onClick={(e) => {
            e.stopPropagation();
            const audio = audioRef.current
            if (audio) {
              const nextMuted = !audio.muted;
              audio.muted = nextMuted;
              setIsMuted(nextMuted);
              
              // If it's being unmuted, make sure it's actually playing 
              // (since browser might have paused the initial autoplay attempt)
              if (!nextMuted) {
                audio.play().catch(() => {});
              }
            }
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Layer 2: Atmospheric mist & gradient overlays */}
        <div className="hero-mist" />

        {/* Layer 3: Moon glow pulse */}
        <div className="hero-moon-glow" />

        {/* Layer 4: Cherry blossom petals */}
        <div className="hero-petals">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`petal petal-${i}`} />
          ))}
        </div>

        {/* Floating kanji — 夢 (Dream) */}
        <span className="hero-kanji-dream">夢</span>

        {/* Floating kanji accents */}
        <span className="hero-kanji-float hero-kanji-creation">創造</span>
        <span className="hero-kanji-float hero-kanji-balance">バランス</span>

        {/* Origami crane */}
        <svg className="hero-origami" width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 0L50 30L40 28L25 40L10 28L0 30L25 0Z" fill="rgba(255,255,255,0.5)" />
          <path d="M25 0L25 40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        </svg>

        {/* Hero Content — Left aligned */}
        <div className="hero-content">
          <h1 className="display-xl hero-title font-nautigal">
            Designing<br />for a more<br />human tomorrow.
          </h1>
          <p className="hero-jp-subtitle">
            より人間らしい<br />明日をデザインする。
          </p>
          <div className="hero-hanko">覚</div>
          <div className="hero-credentials">
            <p><strong>Product Experience Designer</strong></p>
            <p>Based in India.</p>
            <p>Exploring ideas at the intersection</p>
            <p>of people, products and impact.</p>
          </div>
        </div>

        {/* Scroll prompt — bottom left */}
        <a href="#work" className="hero-scroll-prompt">
          <span className="scroll-line"></span>
          <span>SCROLL TO BEGIN</span>
        </a>
      </section>

      {/* Selected Work Section */}
      <section className="works" id="work">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">CHAPTER 01 ・ THE MISSIONS</span>
            <h2 className="display-lg font-nautigal">Featured Projects</h2>
          </div>

          <div className="projects-grid">
            {projects.filter(p => !p.isCreativity).map((project, index) => (
              <article
                key={project.id}
                className={`project-card scale-in delay-${index + 1}`}
                onClick={() => {
                  if (project.isMagazine) setIsMagazineOpen(true)
                  if (project.isInvestEase) setIsInvestEaseOpen(true)
                  if (project.isIITDelhiLMS) setIsIITDelhiLMSOpen(true)
                  if (project.isConstruction) setIsConstructionOpen(true)
                  if (project.isFarmAI) setIsFarmAIOpen(true)
                  if (project.link && !project.isMagazine && !project.isInvestEase && !project.isIITDelhiLMS && !project.isConstruction && !project.isFarmAI) window.open(project.link, '_blank')
                }}
                style={(project.isMagazine || project.isInvestEase || project.isIITDelhiLMS || project.isConstruction || project.isFarmAI || project.link) ? { cursor: 'pointer' } : {}}
              >
                <img src={project.image} alt={project.title} className="project-image-full" />
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Creativity Section */}
      <section className="creativity" id="creativity">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">CHAPTER 02 ・ EXPLORATION</span>
            <h2 className="display-lg font-nautigal">Creative Exploration</h2>
          </div>

          <div className="projects-grid">
            {projects.filter(p => p.isCreativity).map((project, index) => (
              <article
                key={project.id}
                className={`project-card scale-in delay-${index + 1} ${project.isPlayable ? 'project-card--playable' : ''}`}
                onClick={() => {
                  if (project.isMagazine) setIsMagazineOpen(true)
                  else if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer')
                }}
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                role="link"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (project.isMagazine) setIsMagazineOpen(true); else if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer'); } }}
              >
                <img src={project.image} alt={project.title} className="project-image-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process" id="process" ref={processRef}>
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">CHAPTER 03 ・ THE STRATEGY</span>
            <h2 className="display-lg font-nautigal">How the Magic Happens ✨</h2>
          </div>

          <div className="process-words">
            {processWords.map((word, index) => (
              <span
                key={word}
                className={`process-word ${index <= activeProcess ? 'active' : ''}`}
              >
                {word}
              </span>
            ))}
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text fade-in-left">
              <span className="section-label">About Me</span>
              <h2 className="display-md" style={{ marginTop: '16px', marginBottom: '24px' }}>Aaqib Uddin Hashmi</h2>
              <p className="body-lg" style={{ marginBottom: '16px' }}>
                <strong>Product Designer ・ UX Researcher ・ Design Educator</strong>
              </p>
              <p style={{ color: 'var(--soft-gray)', lineHeight: 1.8, marginBottom: '14px' }}>
                Curious about how people think, behave, and interact with products. That curiosity evolved into a career in UX design and research.
              </p>
              <p style={{ color: 'var(--soft-gray)', lineHeight: 1.8, marginBottom: '14px' }}>
                My work sits at the intersection of design, psychology, and problem-solving — looking beyond the interface to understand why users behave the way they do.
              </p>
              <p style={{ color: 'var(--soft-gray)', lineHeight: 1.8, marginBottom: '32px' }}>
                Outside of design, I enjoy psychology, documentaries, photography, and visual storytelling.
              </p>

            </div>

            <div className="about-image fade-in-right">
              <div className="profile-image-wrapper">
                <img
                  src="/images/profile.jpg"
                  alt="Aaqib Uddin Hashmi"
                  className="profile-image"
                />
                <div className="profile-image-glow" />
              </div>
            </div>
          </div>

          <div className="about-keywords fade-in delay-2">
            <div className="marquee-container">
              <div className="marquee-track">
                <div className="marquee-content">
                  <span className="keyword-outline">ACCESSIBILITY</span>
                  <span className="keyword-outline">SYSTEMS</span>
                  <span className="keyword-outline">INTERACTION</span>
                </div>
                <div className="marquee-content" aria-hidden="true">
                  <span className="keyword-outline">ACCESSIBILITY</span>
                  <span className="keyword-outline">SYSTEMS</span>
                  <span className="keyword-outline">INTERACTION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience" id="experience">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">CHAPTER 04 ・ THE PATH</span>
            <h2 className="display-lg font-nautigal">My Journey</h2>
          </div>
        </div>

        <div className="timeline-wrapper fade-in delay-1">
          <div className="timeline-scroll-container">
            {experiences.map((exp, index) => {
              const yearMatch = exp.date.match(/\d{4}/);
              const year = yearMatch ? yearMatch[0] : '2024';
              
              let badgeClass = 'badge-gradient-orange';

              return (
                <div key={index} className="timeline-item" style={{ minWidth: '320px' }}>
                  <article className={`timeline-card fade-in delay-${index + 1}`} style={{ backgroundImage: `url('/images/card_bg_${index + 1}.jpg')` }}>
                    <div className="timeline-badge-container">
                      <div className="diamond-left"></div>
                      <div className="timeline-badge-content">
                        {year}
                      </div>
                      <div className="diamond-right"></div>
                    </div>
                    
                    <div className="timeline-content">
                      <h3 className="card-title">
                        {exp.title} — {exp.role}
                      </h3>
                      <p className="card-desc">{exp.description}</p>
                    </div>
                    
                    <div className="timeline-bottom-ornament">
                      <img src="/images/tassel_knot.png" alt="Ornament" />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          <div className="timeline-line-track"></div>
        </div>
        
        <div className="timeline-scroll-hint fade-in delay-2">
          <div className="scroll-hint-line"></div>
          <span className="scroll-hint-text">Scroll horizontally →</span>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills" id="skills">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">CHAPTER 05 ・ THE ARSENAL</span>
            <h2 className="display-lg font-nautigal">Skills ・ Tools</h2>
          </div>

          <div className="skills-category fade-in delay-1">
            <h3>Design Skills</h3>
            <div className="skills-grid">
              {designSkills.map((skill) => (
                <span key={skill} className="chip glow">{skill}</span>
              ))}
            </div>
          </div>

          <div className="skills-category fade-in delay-2">
            <h3>Tools</h3>
            <div className="skills-grid">
              {tools.map((tool) => (
                <span key={tool.name} className="chip glow tool-chip">
                  <span className="tool-icon-svg">{tool.icon}</span>
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates" id="certificates">
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center' }}>
            <span className="section-label">CHAPTER 06 ・ THE ACHIEVEMENTS</span>
            <h2 className="display-lg font-nautigal">Certificates</h2>
          </div>

          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div key={index} className={`certificate-card scale-in delay-${index + 1}`}>
                <div className="cert-logo-wrapper">
                  <img src={cert.logo} alt={cert.issuer} className="cert-logo" />
                </div>
                <h4>{cert.title}</h4>
                <p>{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="fade-in">
            <span className="section-label">CHAPTER 07 ・ THE NEXT CHAPTER</span>
            <h2 className="display-lg contact-title">
              Let's design something<br />
              <span className="text-outline">people love using.</span>
            </h2>
            <div className="contact-journey-text">
              THE JOURNEY ENDS HERE.<br/>THE NEXT ONE STARTS WITH A CONVERSATION.
            </div>
            <p className="contact-subtitle">
              Ready to bring your product vision to life? Let's collaborate and create
              exceptional user experiences together.
            </p>
          </div>

          <div className="contact-buttons fade-in delay-1">
            <a href="mailto:aaqibuddinhashmi@gmail.com" className="btn btn-primary btn-magnetic">
              ✉ Email Me
            </a>
            <a href="https://www.linkedin.com/in/aaqib-uddin-hashmi/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-magnetic">
              LinkedIn
            </a>
            <a href="https://www.behance.net/aaqibuddin" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-magnetic">
              Behance
            </a>
            <button onClick={() => {
              navigator.clipboard.writeText('aaqibuddinhashmi@gmail.com')
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }} className="btn btn-secondary btn-magnetic">
              {copied ? '✓ Copied!' : '⎘ Copy Email'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Aaqib Uddin Hashmi. Designed with passion.</p>

        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <MagazineModal isOpen={isMagazineOpen} onClose={() => setIsMagazineOpen(false)} />
      <InvestEaseModal isOpen={isInvestEaseOpen} onClose={() => setIsInvestEaseOpen(false)} />
      <IITDelhiLMSModal isOpen={isIITDelhiLMSOpen} onClose={() => setIsIITDelhiLMSOpen(false)} />
      <ConstructionModal isOpen={isConstructionOpen} onClose={() => setIsConstructionOpen(false)} />
      <FarmiModal isOpen={isFarmAIOpen} onClose={() => setIsFarmAIOpen(false)} />

      {/* Copy Feedback Toast */}
      <div className={`copy-feedback ${copied ? 'show' : ''}`}>
        ✓ Email copied to clipboard!
      </div>
    </>
  )
}

export default App
