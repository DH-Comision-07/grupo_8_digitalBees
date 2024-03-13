# SPRINT 3 

*_PRIMERA SEMANA_*

1. Que se hizo

- Separar las vistas en carpetas: Crear, dentro de la carpeta views, la carpeta products y la carpeta users. Dentro de products pondremos todas las vistas de productos que tengamos (por ejemplo: listado, detalle, creación, edición, etc.). Dentro de users pondremos todas las vistas de usuarios que tengamos (por ejemplo: registro, login, perfil, etc.).

- Separar los componentes repetidos en archivos parciales: Crear una carpeta llamada partials dentro de la carpeta de views, separar las áreas comunes del sitio. 

2. Se encontró con algun impedimento

En momento de la reunion semanal, no se habian visto las clases 26 y 27, por lo cual se decidió esperar la clase, para aclarar los temas y continuar con el desarrollo del sprint 3.

3. Que va hacer la próxima semana

a. Página: creación y edición de productos: Formulario al que accede el usuario administrador para cargar nuevos productos y editar los existentes.
Un buen punto de partida para los campos de estos formularios puede ser el siguiente:
● Nombre del producto (name)
● Descripción (description)
● Imagen (image)
● Categoría (category)
● Colores (o cualquier otro campo similar como: tamaños, talles, etc)
● Precio (price).

b. Implementar el motor de templates: Implementar el módulo EJS y renombrar todas las vistas actuales para que utilicen la extensión .ejs.
Modificar los métodos de los controladores para que utilicen el método render().


