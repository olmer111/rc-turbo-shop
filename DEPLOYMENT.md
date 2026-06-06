# Guía de Despliegue y Configuración - RC Speed E-commerce

Este proyecto ha sido diseñado siguiendo la arquitectura de un e-commerce dinámico y moderno. A continuación se detallan los pasos para ponerlo en producción.

## 🚀 Despliegue del Backend (NestJS + PostgreSQL)

### Opción Recomendada: Render o DigitalOcean App Platform
1. **Base de Datos:** Crea una instancia de PostgreSQL (en Neon.tech o Supabase). Copia la URL de conexión.
2. **Variables de Entorno:** Configura el siguiente `.env` en tu panel de despliegue:
   - `DB_HOST`: Host de la DB.
   - `DB_USER`: Usuario.
   - `DB_PASSWORD`: Contraseña.
   - `DB_NAME`: Nombre de la DB.
   - `STRIPE_SECRET_KEY`: Tu llave secreta de Stripe.
3. **Build & Run:**
   - Build command: `npm install && npm run build`
   - Start command: `npm run start:prod`

## 🎨 Despliegue del Frontend (Next.js)

### Opción Recomendada: Vercel
1. Conecta tu repositorio de GitHub/GitLab a Vercel.
2. **Variables de Entorno:** Configura la URL del backend:
   - `NEXT_PUBLIC_API_URL`: `https://tu-api-nest.com`
3. **Deploy:** Vercel detectará automáticamente Next.js y desplegará la aplicación con SSR habilitado.

## 🛠️ Mantenimiento y Escalabilidad
- **Imágenes:** Se recomienda mover las imágenes de `/public` a un bucket de **AWS S3** o **Cloudinary** para mejorar la velocidad de carga.
- **Caché:** Implementar **Redis** para los productos más visitados y sesiones de usuario.
- **Chatbot:** Para escalar el chatbot, reemplazar el `ChatbotService` básico por una integración con **OpenAI API (GPT-4o)** o **Dialogflow**.

## 🏁 Checklist de Calidad
- [x] Responsive Design (Mobile First).
- [x] Animaciones fluidas con Framer Motion.
- [x] Esquema de base de datos relacional optimizado.
- [x] Flujo de pagos seguro vía Stripe Mockup.
- [x] Chatbot interactivo integrado.
