# Configuración del Entorno

### Frontend
1. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install

2. Iniciar el servidor de desarrollo:

        npm start
        # o
        yarn start

3. Establecer variables de entorno creando el archivo .env dentro del directorio "notes-app-frontend". Utilizar el archivo .env.example como referencia para crear un archivo .env con las variables necesarias. Asegúrate de que las variables en el archivo .env incluyan lo siguiente:

        
   
        REACT_APP_ENV=<enviroment>
        REACT_APP_API_URL=<http://backendurl:port> # Ejemplo: http://127.0.0.1:8000


### Backend

1. Crear un entorno virtual:

        python -m venv venv

2. Activar el entorno virtual:

        Windows:
        
        venv\Scripts\activate
        
        Unix/Linux:
        
        source venv/bin/activate

3. Instalar dependencias:

        pip install -r requirements.txt

4. Base de Datos (PostgreSQL)

        Instalar y ejecutar PostgreSQL. Puedes descargarlo desde postgresql.org.
        
        Crear la base de datos y el usuario necesarios:
            Accede a PostgreSQL desde la terminal o una herramienta gráfica como pgAdmin.
            Ejecuta los siguientes comandos, reemplazando <db_name>, <user>, y <password> con tus valores:
        
        CREATE DATABASE <db_name>;
        CREATE USER <user> WITH PASSWORD '<password>';
        GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <user>;

5. Establecer variables de entorno creando el archivo .env dentro de la raíz del directorio "notes-app-backend". Utilizar el archivo .env.example como referencia para crear un archivo .env con las variables necesarias. Asegúrate de que las variables en el archivo .env incluyan lo siguiente:
        
        DATABASE_USERNAME=<your_db_username>
        DATABASE_PASS=<your_db_password>
        DATABASE_NAME=<your_db_name>
        DATABASE_HOST=<your_db_host>
        DATABASE_PORT=<your_db_port>
        SECRET_KEY=<your_secret_key>
        FRONTEND_ORIGIN=<your_frontend_origin>


7. Ejecutar migraciones de base de datos (si usas Alembic con SQLAlchemy):

        alembic upgrade head

8. Iniciar el servidor:

        uvicorn main:app --reload

    



---


# Documentación del API

FastAPI genera automáticamente una interfaz de documentación interactiva usando Swagger UI. Esto permite a los desarrolladores explorar la API de manera sencilla y probar las rutas disponibles sin necesidad de escribir código adicional.

### Acceder a la documentación de la API

Para acceder a la documentación de tu API, abre tu navegador y dirígete a la URL de tu servidor backend:

-Swagger UI:

    http://127.0.0.1:8000/docs

 Esta interfaz te permitirá ver todas las rutas de la API, sus parámetros, y probar las solicitudes directamente desde el navegador.


### Documentación alternativa con ReDoc

También puedes acceder a una versión alternativa de la documentación utilizando ReDoc, que presenta una estructura más detallada y ordenada:

-ReDoc:

    http://127.0.0.1:8000/redoc

Ambas interfaces ofrecen una experiencia interactiva para probar y entender cómo funciona tu API, lo que facilita el desarrollo y la integración de nuevos servicios o consumidores.

---

# Estrategia de Bloqueo Implementada

En esta aplicación se implementó un bloqueo optimista para gestionar las actualizaciones concurrentes de notas. Esta estrategia asegura que los usuarios no sobrescriban cambios hechos por otros, verificando si la versión de la nota que se intenta actualizar es la misma que la última versión registrada en la base de datos.

### Implementación del Bloqueo Optimista

Cuando un usuario edita una nota, el sistema guarda la fecha y hora de la última actualización en el campo updated_at de la nota. Al intentar guardar los cambios, el sistema compara la fecha de updated_at de la nota que se está editando (note.updated_at) con la fecha de la nota almacenada en la base de datos (existing_note.updated_at).

   -Si las fechas coinciden, el sistema permite guardar los cambios, ya que no se ha producido ninguna modificación en la nota desde que el usuario la cargó.
   
   -Si las fechas no coinciden, significa que otra persona ha modificado la nota desde que el usuario la cargó. En este caso, se lanza una excepción que notifica al usuario que los cambios no pueden guardarse y le sugiere recargar la página para obtener la versión más reciente de la nota.

Mensaje de Error

Cuando el sistema detecta que la versión de la nota ha cambiado, se lanza el siguiente mensaje de error:

      "La versión de la nota no coincide con la actual, vuelva a cargar la página para cargar la versión más reciente"

Este mensaje le indica al usuario que debe recargar la página para obtener la versión actualizada de la nota antes de intentar realizar cambios nuevamente.
