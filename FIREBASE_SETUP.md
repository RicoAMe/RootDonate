# Firebase-backed AI setup

The web page uses Firebase project `rootdonate-61e61` and calls the `chat` Firebase callable function in `europe-west2`. The function forwards prompts to the configured OpenAI-compatible Pollinations endpoint. It requires Firebase App Check; the Firebase web config and reCAPTCHA v3 site key in `index.html` are public client identifiers, not server secrets.

## One-time Firebase Console setup

1. Confirm the Firebase project is on the Blaze plan and enable Cloud Functions. Functions deployment requires billing; set a budget alert.
2. Register the web app with the reCAPTCHA v3 site key in `index.html`. Add `rootdonate.co.uk` and any actual preview domains to the authorized domains for that reCAPTCHA key.
3. Register the web app with Firebase App Check using the same reCAPTCHA v3 provider. Deploy the function, test it, and keep `enforceAppCheck: true`. If App Check rejects calls, inspect App Check metrics and confirm the registered domain/site key match.
4. Install Node.js 20 and Firebase CLI, and authenticate with an account allowed to deploy to this Firebase project.

## Deploy

From the repository root:

```sh
npm install --prefix functions
npx firebase-tools login
npx firebase-tools deploy --only functions:chat --project rootdonate-61e61
```

The Firebase CLI may request enabling Google Cloud APIs. Review any billing prompt before accepting. The current site is served from GitHub Pages; it calls the Firebase function directly, so no Hosting migration or DNS change is required.

## Limits and operations

- This backend can answer requests while deployed; it cannot keep a browser tab or microphone running after the page is closed or an Apple device sleeps. Browsers may suspend background tabs.
- The Pollinations endpoint is used without a private API credential. If switching to a provider requiring a key, store it as a Firebase Secret and access it only server-side; never commit it in the web files.
- App Check reduces unauthorized traffic but does not guarantee cost protection. Monitor Cloud Functions and provider usage, configure budgets/alerts, and add authentication/rate limiting before broad public use.
- Chat history remains in local browser storage. Prompts are sent to the Firebase function and external AI provider. Do not send sensitive information.
- This commit adds configuration and code but does not deploy Firebase resources. Deployment must be run by an authorized Firebase project operator.
