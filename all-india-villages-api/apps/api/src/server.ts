import app from './app';

const PORT = process.env.PORT || 3000;

import { requestLogger } from './middlewares/requestLogger';
import { ensureDemoApiKey } from './scripts/seedDemoKey';

app.use(requestLogger);

(async () => {
  try {
    await ensureDemoApiKey();
  } catch (err) {
    console.warn('Failed to ensure demo API key', err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();