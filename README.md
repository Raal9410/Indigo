# Indigo

Indigo es una aplicación web orientada a los músicos buscando otros músicos con los mismos gustos musicales, para crear nuevos proyectos y conseguir esa pieza faltante para completar tu proyecto musical.

## Instalación

Para poder correr la aplicación de manera local hay que seguir los siguientes pasos:
1. Dar click en fork (si es que deseas tener un repositorio con la aplicación).
2. Clonar el repositorio en el directorio que desees.
3. En la carpeta de backend correr el siguiente comando, para instalar todas las dependencias:

```bash
npm install
```
4. Igual que el paso anterior hay que instalar todas las dependencias en el frontend con el siguiente comando:

```bash
yarn install
```
5. Ir a la página de developers de Spotify, crear una cuenta y después una aplicación en la siguiente liga https://developer.spotify.com/dashboard/login

6. Crear un .env en backend para colocar tu clientId y tu clientsecret de la apicación de spotify ahí bajo las siguientes variables:
 
-CLIENT_ID

-CLIENT_SECRET

Configurar las credenciales anteriores en el archivo app.js dentro de la carpeta authorization_code de l igual que colocar http://localhost:8888/callback en redirect_uri, en app.js de authorization_code del backend.

## Uso

1. Correr en la carpeta de backend en la terminal:

```bash
npm run dev
```
2. Correr en la carpeta de frontend en la terminal:
```bash
yarn start
```
3. Correr en otra pestaña en la carpeta de backend en la terminal:
```bash
node authorization_code/app.js
```
Ya dentro de la aplicación
