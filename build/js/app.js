document.addEventListener("DOMContentLoaded", function () {
  // ✅ Mover esta función arriba
  function cargarProductosDesdePHP() {
    debugger
    fetch("src/php/get_productos.php")
      .then((response) => {
        console.log("Respuesta cruda:", response);
        return response.json();
      })

      .then((data) => {
        const contenedor = document.getElementById("contenedor-productos");
        contenedor.innerHTML = "";

        if (data.length === 0) {
          contenedor.innerHTML = "<p>No hay productos para mostrar</p>";
          return;
        }

        data.forEach((producto) => {
          const card = document.createElement("div");
          card.classList.add("Producto");

          const imagenClass = producto.nombre.toLowerCase().includes("ricota")
            ? "imagen-producto-ricota"
            : "imagen-producto";

          card.innerHTML = `
                        <div class="contenedor-imagen">
                            <img src="${producto.imagen}" class="${imagenClass}" alt="${producto.nombre}">
                        </div>
                        <h1>${producto.nombre}</h1>
                        <p>${producto.descripcion}</p>
                    `;

          contenedor.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });
  }

  // ✅ Llamar la función acá mismo
  cargarProductosDesdePHP();

  // Resto de tu código...
  const header = document.querySelector(".header");
  const scrollThreshold = 200;

  const nav = document.querySelector("#nav");
  const abrir = document.querySelector("#abrir");
  const cerrar = document.querySelector("#cerrar");
  const links = document.querySelectorAll(".nav__link");

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("show");
      header.classList.remove("show1");
    } else {
      header.classList.remove("show");
      header.classList.add("show1");
    }
    updateActiveLink();
  }

  handleScroll();
  document.addEventListener("scroll", handleScroll);

  abrir.addEventListener("click", () => {
    nav.classList.add("nav-visible");
  });

  cerrar.addEventListener("click", () => {
    nav.classList.remove("nav-visible");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      links.forEach(function (item) {
        item.classList.remove("nav__link__active");
      });
      this.classList.add("nav__link__active");
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll("section");
    let currentIndex = -1;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentIndex = index;
      }
    });

    if (currentIndex !== -1) {
      links.forEach((link) => link.classList.remove("nav__link__active"));
      links[currentIndex].classList.add("nav__link__active");
    }
  }

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

  setInterval(nextSlide, 3000);
  showSlide(currentSlide);
});
