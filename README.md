# Decodificador de Imagen Base64

Este proyecto es una aplicación completa que permite decodificar imágenes a partir de cadenas base64 usando ReactJS para el frontend y NestJS para el backend. La aplicación también permite redimensionar, comprimir y convertir imágenes a formato JPG, y proporciona una vista previa y descarga automática de la imagen procesada.

# Actualización

Ahora la aplicación permite convertir html a un documento de .doc, donde identifica las imágenes en diferentes formatos pero en especial las de base64, además tiene la opción de hacer limpieza de código para que el desarrollo las detecte de forma correcta y sean procesadas, para esta nueva herramienta, tambien se vinculan las opciones de redimensionar, comprimir y convertir imágenes a formato JPG.

## Tecnologías Utilizadas

- **Frontend**: ReactJS
- **Backend**: NestJS
- **Procesamiento de Imágenes**: Sharp
- **Notificaciones**: React Toastify

## Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- Node.js (versión 12 o superior)
- npm (gestor de paquetes de Node)

## Instalación

### Backend (NestJS)

1. Clona el repositorio y navega al directorio del backend:

```bash
   git clone https://github.com/tu-usuario/base64-decoder-nestjs-reactjs.git
```

2. Instala las dependencias del backend (base64-decoder-backend):

```bash
npm install
```

3. Configura body-parser para manejar solicitudes grandes. Abre el archivo main.ts y asegúrate de que contiene:

```bash
   import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  app.enableCors({
    origin: 'http://localhost:3001', // Cambia esto según el puerto de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
```

4. Inicia el servidor:

```bash
npm run start
```

## Frontend (ReactJS)

1. En el mismo repositorio, navega al directorio del frontend:

```bash
cd ../base64-decoder-frontend
```

2. Instala las dependencias del frontend:

```bash
npm install
```

3. Inicia la aplicación React:

```bash
npm start
```


## Uso
Abre tu navegador y navega a http://localhost:3001.

En el cuadro de texto, pega la cadena base64 de la imagen que deseas decodificar. Puedes pegar la cadena con o sin el prefijo data:image/png;base64,.

Selecciona las opciones adicionales según tus necesidades:

- Redimensionar: Marca esta opción y selecciona el porcentaje de redimensionado en el desplegable (10% a 100% en incrementos de 10%).
- Comprimir: Marca esta opción para comprimir la imagen.
- Convertir a JPG: Marca esta opción para convertir la imagen a formato JPG.

Haz clic en "Decodificar Imagen" para procesar la imagen.

La imagen decodificada se mostrará en la vista previa y se descargará automáticamente. También se mostrará una tabla de detalles con un resumen de las operaciones realizadas.

Para realizar una nueva decodificación, haz clic en "Nueva Decodificación" para limpiar el formulario y empezar de nuevo.

## Detalles Adicionales

- Fuente Tipográfica: El proyecto utiliza la fuente "Poppins" de Google Fonts para mejorar la apariencia visual.
- Notificaciones: Se utilizan notificaciones toast para informar al usuario sobre el estado de la conversión.


## Contribuciones
Las contribuciones son bienvenidas. Por favor, sigue los pasos a continuación para contribuir:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y commitea (git commit -am 'Agrego nueva funcionalidad').
Haz un push a la rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
