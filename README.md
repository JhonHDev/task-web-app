# Task Web App (status: en desarollo)

Aplicación Web que pose una autenticación con Firebase y una pantalla de principal
donde se podrán ver una lista de tareas, se pueden crear tareas, actualizarlas y eliminarás.
Además de contar con diferentes tipos de filtros que permiten agrupar las tareas según su estado, prioridad y fecha de entrega.

## Link del proyecto en producción

[Task Web App](https://task-web-app-jelou.vercel.app)

## Para usar el proyecto

1. Clonar el repositorio

```
git clone https://github.com/JhonHDev/task-web-app.git
```

2. Instalar los node modules

```
yarn install
```

3. Crear el archivo .env y añadir las variables de entorno

```
VITE_APP_TASK_BASE_API=
VITE_APP_API_KEY=
VITE_APP_AUTH_DOMAIN=
VITE_APP_PROJECT_ID=
VITE_APP_STORAGE_BUCKET=
VITE_APP_MESSAGING_SENDER_ID=
VITE_APP_APP_ID=

```

4. Levantar el servidor de desarrollo

```
yarn dev
```
