## Configuración del Entorno

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

3. Establecer variables de entorno creando el archivo .env dentro del directorio "notes-app-frontend/src". Asegúrate de que las variables en el archivo .env incluyan lo siguiente:

        
   
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

5. Establecer variables de entorno creando el archivo .env dentro de la raíz del directorio "notes-app-backend". Asegúrate de que las variables en el archivo .env incluyan lo siguiente:

        Utilizar el archivo .env.example como referencia para crear un archivo .env con las variables necesarias.
        
        Asegúrate de que las variables en el archivo .env incluyan lo siguiente:
        
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

    
