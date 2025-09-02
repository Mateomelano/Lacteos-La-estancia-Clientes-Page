document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const scrollThreshold = 200; // Ajusta este valor a la distancia de desplazamiento que prefieras

    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");
    const links = document.querySelectorAll('.nav__link');

    // Función para manejar el scroll
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('show');
            header.classList.remove('show1');
        } else {
            header.classList.remove('show');
            header.classList.add('show1');
        }
        updateActiveLink();
    }

    // Verificación inicial del scroll
    handleScroll();

    // Agregar el event listener para el scroll
    document.addEventListener('scroll', handleScroll);

    // Abrir el menú
    abrir.addEventListener("click", () => {
        nav.classList.add("nav-visible");
    });

    // Cerrar el menú
    cerrar.addEventListener("click", () => {
        nav.classList.remove("nav-visible");
    });

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            links.forEach(function(item) {
                item.classList.remove('nav__link__active');
            });
            this.classList.add('nav__link__active');
        });
    });

    // Función para actualizar el link activo basado en la posición del scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        let currentIndex = -1;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentIndex = index;
            }
        });

        if (currentIndex !== -1) {
            links.forEach(link => link.classList.remove('nav__link__active'));
            links[currentIndex].classList.add('nav__link__active');
        }
    }

    // Carrousel
    const slides = document.querySelectorAll(".slide");
    const indicators = document.querySelectorAll(".indicator");
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            indicators[i].classList.remove("active");
        });
        slides[index].classList.add("active");
        indicators[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(nextSlide, 3000); // Cambia de imagen cada 3 segundos

    showSlide(currentSlide); // Mostrar la primera imagen al cargar la página
});
