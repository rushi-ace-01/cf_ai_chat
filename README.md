Cloudflare AI Chat App (Workers AI + KV + Pages)

This is my Cloudflare assignment project: a simple full-stack AI chat application built using Cloudflare’s developer platform.
It includes:

LLM: Llama 3.3 (via Cloudflare Workers AI)

Workflow / coordination: Cloudflare Worker (backend)

User input: A browser-based chat UI (HTML + JS)

Memory / state: Cloudflare KV for conversation history per session

🚀 Architecture Overview
1. Backend – Cloudflare Worker

Located in: /backend

Responsibilities:

Accept POST requests from the chat UI

Read user messages and session ID

Load conversation history from KV

Call Llama 3.3 using Workers AI

Save the updated chat history

Return assistant message as JSON

2. Workers AI Integration

Uses the model:

@cf/meta/llama-3.3-70b-instruct-fp8-fast


Called through:

const aiResp = await env.AI.run(model, { messages });

3. Memory / State via KV

Each browser tab gets its own random sessionId.

History is stored as:

CHAT_HISTORY[sessionId] => JSON array of messages


This satisfies the Cloudflare requirement for stateful behavior.

4. Frontend Chat UI

Located in: /frontend/index.html

Features:

Simple chat interface

Sends user input to Worker using fetch()

Displays AI responses

Maintains same sessionId across messages

📦 Folder Structure
cf-ai-chat/
├── backend/
│   ├── wrangler.jsonc
│   ├── package.json
│   └── src/index.js
│
├── frontend/
│   └── index.html
│
└── README.md

🛠 Running Locally
Backend:
cd backend
wrangler dev

Frontend:

Open frontend/index.html in a browser
(or upload to Cloudflare Pages).

🌐 Deployment
Deploy Worker:
wrangler deploy

Deploy Frontend (optional):

Upload the /frontend folder to Cloudflare Pages.