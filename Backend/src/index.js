/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(
        'Send a POST request with JSON: {"message": "Hello"}',
        { status: 405 }
      );
    }

    // Read JSON body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response("Invalid JSON body", { status: 400 });
    }

    const message = body.message;
    if (!message) {
      return new Response("Missing 'message' field", { status: 400 });
    }

    // Call Workers AI – Llama 3.3
    const aiResult = await env.AI.run(
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      {
        messages: [
          {
            role: "system",
            content:
              "You are a friendly assistant in a Cloudflare demo. Answer clearly and simply.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }
    );

    const reply =
      aiResult.response ||
      aiResult.output_text ||
      JSON.stringify(aiResult);

    return new Response(JSON.stringify({ reply }), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
