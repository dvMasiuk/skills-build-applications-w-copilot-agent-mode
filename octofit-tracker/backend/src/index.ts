import { connectDatabase } from './config/database';
import { createApp, API_BASE_URL, PORT } from './server';

async function start() {
  try {
    await connectDatabase();
    const app = createApp();
    console.log('API base URL:', API_BASE_URL);
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();
