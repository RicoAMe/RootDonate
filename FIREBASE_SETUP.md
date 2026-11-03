# Firebase-backed online AI setup

The site calls the `chat` Firebase callable function in `europe-west2`. The function searches Wikipedia for current reference material and forwards the prompt and results to Pollinations' OpenAI-compatible chat completions API. The provider API key is kept in Firebase Secret Manager and is never placed in the website or repository.

## Required one-time setup

1. Ensure the Firebase project `rootdonate-61e61` has Cloud Functions enabled and an appropriate billing plan. Configure budget alerts; function invocations and AI provider usage can incur costs.
2. Obtain a server-side Pollinations API key from [Pollinations](https://enter.pollinations.ai). Do not put the key in `index.html`, source control, or a public issue.
3. Install Node.js 20 and Firebase CLI, and authenticate with an account authorized to deploy to this Firebase project.

## Configure and deploy

From the repository root, run:

```sh
npx firebase-tools login
npx firebase-tools functions:secrets:set POLLINATIONS_API_KEY --project rootdonate-61e61
npm install --prefix functions
npx firebase-tools deploy --only functions:chat --project rootdonate-61e61
```

When prompted, enter the Pollinations key securely in the CLI prompt. Do not add the key to a command-line argument, source file, or commit. Deploying Firebase resources requires an authorized project operator; a GitHub commit by itself does not deploy the function. After deployment, open the site, accept the privacy notice, and send a test message.

## Troubleshooting

- **Online AI is not configured yet:** Set the `POLLINATIONS_API_KEY` Firebase secret, then redeploy `chat`.
- **Provider rejected its API key:** Check the key in Firebase Secret Manager and update the secret if needed, then redeploy.
- **Could not connect / provider unavailable:** Check the Cloud Functions logs, provider status and account limits, and verify that the function can make outbound HTTPS requests.
- **Function not found or HTTP 404:** Confirm `chat` is deployed in `europe-west2` in project `rootdonate-61e61`.
- Confirm project billing and required Google Cloud APIs are enabled. App Check and abuse/cost controls should be reviewed before public launch; the callable currently has App Check enforcement disabled.

## Privacy and runtime limits

- The AI function runs on demand when the user sends a message; it is not an always-running background worker and cannot keep a browser or microphone active after the page is closed.
- Chat history is stored in the user's browser. Messages are sent to the Firebase function, Wikipedia search, and the external AI provider. Do not send sensitive information.
- Voice input is optional and user-initiated. Recognized text is placed in the input box and is sent only after the user presses Send.
