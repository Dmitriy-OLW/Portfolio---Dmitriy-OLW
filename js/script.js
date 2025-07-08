// Анимация слайдера для Blender Base
function initBlenderBaseSlider() {
    const blenderBaseSection = document.getElementById('blender-base');
    if (!blenderBaseSection) return;

    const galleryItems = blenderBaseSection.querySelectorAll('.gallery-item img');
    const sliderContainer = blenderBaseSection.querySelector('.preview-slider');
    
    if (!galleryItems.length || !sliderContainer) return;

    // Создаем слайды из изображений галереи
    galleryItems.forEach((img, index) => {
        const slide = document.createElement('img');
        slide.src = img.src;
        slide.alt = img.alt;
        slide.className = 'preview-slide';
        if (index === 0) slide.classList.add('active');
        sliderContainer.appendChild(slide);
    });

    const slides = sliderContainer.querySelectorAll('.preview-slide');
    let currentSlide = 0;
    
    function showNextSlide() {
        const nextSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        
        slides[nextSlide].classList.add('active');
        
        setTimeout(() => {
            slides[currentSlide].classList.remove('prev');
        }, 1000);
        
        currentSlide = nextSlide;
    }

    // Запускаем слайдер с интервалом 3 секунды
    setInterval(showNextSlide, 3000);
}


document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Навигация по проектам в хотбаре
    document.querySelectorAll('.project-thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const projectSection = document.getElementById(projectId);
            
            if (projectSection) {
                projectSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Кнопка "Наверх"
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Показать/скрыть кнопку "Наверх" при прокрутке
    window.addEventListener('scroll', function() {
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        }
    });

    // Анимация при загрузке страницы
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Загрузка иконок технологий (теперь загружаем только если сетка пустая)
    const techGrid = document.querySelector('.tech-grid');
    if (techGrid && techGrid.children.length === 0) {
        const technologies = [
            { name: 'Unity', icon: 'unity-game-engine-icon.svg' },
            { name: 'C#', icon: 'c-sharp-programming-language-icon.svg' },			
            { name: 'Rider', icon: 'rider-jetbrains.svg' },
            { name: 'Git', icon: 'git.svg' },
            { name: 'GitHub', icon: 'github.png' },
            { name: 'Blender', icon: 'blender-icon.svg' },
            { name: 'Substance', icon: 'adobe-substance-3d-painter-icon.svg' },
            { name: 'VR', icon: 'icon-vr-glasses.png' },
			{ name: 'AR/MR', icon: 'AR_Icon.png' },
			{ name: '2DOF/Mexatron-VR', icon: '2DOF_Icon.png' },

        ];

        technologies.forEach(tech => {
            const techItem = document.createElement('div');
            techItem.className = 'tech-item';
            
            techItem.innerHTML = `
                <img src="Content/Icons_Tech_Stack/${tech.icon}" alt="${tech.name}" class="tech-icon">
                <span class="tech-name">${tech.name}</span>
            `;
            
            techGrid.appendChild(techItem);
        });
    }
	


	// Выделить кнопку текущего языка
    const langButtons = document.querySelectorAll('.language-btn');
    const currentPage = window.location.pathname.split('/').pop();
    
    langButtons.forEach(btn => {
        const btnPage = btn.getAttribute('href');
        if (btnPage === currentPage || 
            (currentPage === '' && btnPage === 'index.html')) {
            btn.classList.add('current-lang');
        }
    });
	
	// Вызываем функцию инициализации слайдера
	initBlenderBaseSlider();
});