🌐 Cloudflare AI Chat App
LLM + Workers AI + Workers KV + Frontend Chat UI

This project is my submission for the Cloudflare AI-Powered Application Assignment.
It demonstrates the required components:

✔️ LLM using Cloudflare Workers AI
✔️ Workflow & coordination using Cloudflare Workers
✔️ User input via a browser-based chat UI
✔️ Memory/state using Cloudflare KV
-------
🚀 Live Components
Component	Description
Backend Worker	Handles AI requests, stores memory, exposes API
Workers AI	Runs Llama 3.3 Instruct model
KV Storage	Stores chat history per session
Frontend UI	Simple chat interface (HTML + JS)
🧠 Architecture Overview
1. Cloudflare Worker (Backend)

Located in /backend.

The Worker performs:

Accepts POST requests from the chat UI

Extracts message and sessionId

Loads previous messages from KV

Calls Llama 3.3 via Workers AI

Appends response to history

Saves updated conversation in KV

Returns the AI response to the client

It uses:

const aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
  messages: history
});

2. Workers AI (LLM)

The app uses Cloudflare’s hosted model:

@cf/meta/llama-3.3-70b-instruct-fp8-fast


Workers AI inference is accessed through:

env.AI.run(model, { messages })

3. Memory / State (Cloudflare KV)

Each chat browser tab generates a unique:

sessionId = "sess-" + random string


Stored into KV:

CHAT_HISTORY[sessionId] = JSON array of messages


This gives the app memory, enabling conversational context.

4. Frontend Chat UI

Located in /frontend.

Single HTML file (index.html)

Minimal JavaScript to send/receive chat messages

Uses fetch() to send POST requests to the Worker

Displays user + AI messages

Passes the same sessionId to preserve conversation state

Frontend code example:

fetch(WORKER_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: text, sessionId }),
});

📁 Folder Structure
cf-ai-chat/
│
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── wrangler.jsonc
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    └── index.html

▶️ Running Locally
Backend
cd backend
wrangler dev


Backend runs at:

http://127.0.0.1:8787

Frontend

Open /frontend/index.html in a browser or deploy it with Cloudflare Pages.

🚀 Deployment
Deploy Worker
cd backend
wrangler deploy


This gives you a public Worker URL like:

https://your-worker-name.your-account.workers.dev

Deploy Frontend (optional)

Use Cloudflare Pages:

Dashboard → Pages → Create Application

Upload the frontend folder

Publish

Access chat UI from your Pages URL

🧪 Example Conversation

User:

Hi, how are you?

AI:

I'm doing great and here to help you explore Cloudflare…

User:

What did I just ask you?

AI:

You asked how I am doing.

Memory is preserved using the sessionId.

📌 Requirements Check (Cloudflare Assignment)
Requirement	How it's implemented
LLM	Workers AI — Llama 3.3 70B Instruct
Workflow / coordination	Cloudflare Worker for routing, KV integration, AI calls
User input via chat or voice	HTML/JS chat UI
Memory / state	KV namespace CHAT_HISTORY

All assignment criteria are successfully met.

🙋‍♂️ Author

Rushi
Cloudflare Assignment Project
Built using Workers AI, KV, and Cloudflare Pages.
