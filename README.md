# Proyecto E-commerce Carrito RC
Este proyecto implementa una tienda dinámica para la venta de carritos a control remoto.

## Estructura
- `/frontend`: Aplicación Next.js con Tailwind CSS y Framer Motion.
- `/backend`: API construida con NestJS y PostgreSQL.

## Requisitos Previos
- Node.js v18+
- PostgreSQL 14+
- npm o yarn

## Instalación y Ejecución

### Backend
1. `cd backend`
2. `npm install`
3. Configurar `.env` con las credenciales de la DB.
4. `npm run start:dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Despliegue Sugerido
- Frontend: Vercel
- Backend: Render / DigitalOcean / AWS
- DB: Neon.tech / Supabase / AWS RDS
