import app from './app';

const PORT = process.env.PORT || 3000;

import { requestLogger } from './middlewares/requestLogger';
import { ensureDemoApiKey } from './scripts/seedDemoKey';
import { ensureAdminUser } from './scripts/seedAdminUser';

app.use(requestLogger);

(async () => {
  try {
    await ensureDemoApiKey();
  } catch (err) {
    console.warn('Failed to ensure demo API key', err);
  }

  try {
    await ensureAdminUser();
  } catch (err) {
    console.warn('Failed to ensure admin user', err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})();