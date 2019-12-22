# login-nodejs
Create login and register with Nodejs, expressjs
Que usaremos para nuestro registro y login?
Nodejs v12 librerías : moment, jwt-simple, bcrypt, dotenv, mysql, cors.
Express v4
MySQL v5.7
Creamos una base de datos para el proyecto en MySQL , solo crearemos la tabla “users” con datos simples para poder autentificar y logear.

Base de datos
Creamos nuestro proyecto con NodeJS y ExpressJS.

Creación de proyecto express
Conectamos nuestra aplicación a la base de datos:
- Instalamos en node cors, mysql y dotenv.
- Creamos en nuestro proyecto un archivo .env, dentro colocamos los siguientes datos: host, user, password, port, name “ Todos de nuestra base de datos antes creada en MySQL ”.
- Creamos db.js , aqui estara la configuración de nuestra base de datos.
- Requerimos en nuestro app.js a db.js, cors y dotenv.
- Por ultimo usamos cors en app.js.

Instalación de mysql, cors y dotenv

Archivo .env

Configuración db.js (Base de datos)

Require de cors, dotenv y db.js, uso de cors.
Creamos una carpeta models y dentro el modelo users.js, donde estarán todas las funciones para las peticiones a la base de datos de usuarios.
Hacemos la primera función en users.js que nos servirá para comprobar la conexión con la base de datos.

Función para pedir todos los usuarios a la base de datos
Creamos un manejador de rutas para poder mostrar un JSON y usar nuestro modelo de usuario en routes/users.js.

“Comprobar a este punto que la conexión es correcta, creando un usuario en mysql y mostrando un JSON en el navegador con sus datos”
Hacemos otras dos funciones en nuestro models/users.js que nos servirán para registrar un usuario y para el login.

Funciones insert y getByEmail
Usaremos users.js que ya debe estar en la carpeta routes.
Instalamos bcrypt, jwt-simple y moment en nuestro proyecto.

Creamos el manejador de rutas ‘/register’ y requerimos las librerías instaladas en routes/users.js.
bcrypt nos encripta el password, así que recordar la password para poder verificarla luego en el login.

Manejador de ruta ‘/register’

Password (1234) encriptada en base de datos
El registro podemos probarlo con ayuda de el Postman
https://www.getpostman.com/
Creamos la función para generar un Token en routes/users.js, el cual nos permitirá comprobar cuando el usuario esté logueado con ayuda del navegador.
- Agregar al .env el TOKEN_KEY=”Token-Auth”

Función createToken

Archivo .env
Procedemos a crear el manejador para la ruta ‘/login’ .

El login pueden comprobarlo con ayuda del Postman nuevamente
Ya tenemos tanto el login que nos genera un Token y el registro que encripta nuestra password, para finalizar con nodeJS y nuestro backend, nos falta crear un middleware, este se encargará de verificar cada petición que le hagan a ‘/users’ y esperar el Token como header, si el Token existe obtendremos el id del usuario y de esa manera su información para que en cada ruta de nuestra aplicación tengamos activo al Usuario logueado.
Creamos nuestro middleware.js en la carpeta routes.

middleware.js
Usamos el middleware en routes/users.js después de nuestro manejadores de rutas ‘/login’ y ‘/register’, si lo usaramos antes, nos pediría el Token en el header de la petición que aun no tendríamos generado ya que este Token se crea en el login.

Creamos una nueva función en models/users.js para obtener un usuario a partir de su id.

Función getById
Para finalizar nuestro login en el backend necesitaremos un manejador de ruta que utilice el Token que nos enviaran en el header de la petición y nos devuelva el usuario que se ha logueado, que posteriormente usaremos en nuestro frontend con Angular o cualquier otro framework.
Creamos un nuevo manejador de ruta ‘/mainUser’ en routes/users.js, este recibirá el id del usuario en el header gracias a nuestro middleware.

Manejador /mainUser
Con el postman puedes comprobar que con nuestro Token generado en el login, con la ruta /mainUsers, puedes tener siempre los datos del usuario logueado, recuerda agregar el Token en el header del postman.
Con esto ya tienes tu login y autentificación de usuarios.
