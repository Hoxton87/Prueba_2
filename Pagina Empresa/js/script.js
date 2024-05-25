$(document).ready(function () {
    // Función para cargar contenido en el div #content
    function loadContent(page) {
        $('#content').load(page, function (response, status, xhr) {
            if (status == "error") {
                $('#content').html("<p>Error al cargar el contenido. Por favor, inténtelo de nuevo.</p>");
            } else {
                if (page == "tienda.html") {
                    loadProductos();
                } else if (page == "donaciones.html") {
                    loadOrganizaciones();
                }
            }
        });
    }

    // Cargar la página de inicio por defecto
    loadContent('inicio.html');

    // Manejar clics en los enlaces del menú y en el carrusel
    $(document).on('click', 'nav a, #carouselExampleIndicators a', function (e) {
        e.preventDefault();
        var page = $(this).attr('href');
        if (page) {
            loadContent(page); // Cargar la página correspondiente al href del enlace
        }
    });

    // Función para cargar productos desde un archivo JSON
    function loadProductos() {
        // Obtener los datos del archivo JSON 'productos.json'
        $.getJSON('json/productos.json', function (data) {
            // Crear una variable para almacenar el HTML de los productos
            let productosHtml = '';
    
            // Iterar sobre cada categoría en el array 'categories' del objeto JSON
              


            $.each(data.categories, function (key, producto) {
                productosHtml += `<div class="card" style="width: 18rem;">
                    <img src="${producto.strCategoryThumb}" class="card-img-top" alt="${producto.strCategory}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.strCategory}</h5>
                    </div>
                    
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${key}">
                        Ver Producto
                    </button>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${key}" tabindex="-1" aria-labelledby="exampleModalLabel${key}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title fs-5" id="exampleModalLabel${key}">${producto.strCategory}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <img src="${producto.strCategoryThumb}" class="img-fluid" alt="${producto.strCategory}">
                                    <p>${producto.strCategoryDescription}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

    
            // Insertar el HTML generado en el contenedor con id="productos" en la página
            $('#productos').html(productosHtml);
        });
    }
    
    

    // Función para cargar organizaciones de donación desde un archivo JSON
    function loadOrganizaciones() {
        $.getJSON('json/organizaciones.json', function (data) {
            let galeriaHtml = '';
            $.each(data, function (key, organizacion) {
                galeriaHtml += `<div class="col-md-4">
                    <img src="${organizacion.imagen}" class="img-fluid" alt="${organizacion.nombre}" data-bs-toggle="modal" data-bs-target="#orgModal" data-descripcion="${organizacion.descripcion}">
                    <p>${organizacion.nombre}</p>
                </div>`;
            });
            $('#galeria').html(galeriaHtml);
        });



        
        // Mostrar descripción en modal
        $('#orgModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget); // Botón que activó el modal
            var descripcion = button.data('descripcion'); // Extraer la información de los atributos de datos
            var modal = $(this);
            modal.find('.modal-body').text(descripcion);
        });
    }


});
