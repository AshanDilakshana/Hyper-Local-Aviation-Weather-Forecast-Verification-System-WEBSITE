import { fetchLiveVerificationData } from './src/utils/liveData.ts';

async function run() {
  try {
    // Override fetch to use localhost:5173
    global.fetch = async (url) => {
      const fullUrl = url.startsWith('/') ? 'http://localhost:5173' + url : url;
      const res = await import('node-fetch').then(m => m.default(fullUrl));
      return {
        ok: res.ok,
        status: res.status,
        json: async () => res.json()
      };
    };
    const data = await fetchLiveVerificationData();
    console.log("Success! Data keys:", Object.keys(data));
  } catch(err) {
    console.error("Caught error:", err);
  }
}
run();
