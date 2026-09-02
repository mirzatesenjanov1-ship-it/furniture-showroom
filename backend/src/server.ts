import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

async function start() {
  try {
    // Fastify плагиндерин регистрациялоо
    await fastify.register(cors, {
      origin: [
        'https://mirzatesenjanov1-ship-it.github.io',
        'http://localhost:3000',
        'http://localhost:5173'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    });

    // Негизги тестодук маршрут
    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    
    // Серверди ишке киргизүү
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Серверди чакыруу
start();
