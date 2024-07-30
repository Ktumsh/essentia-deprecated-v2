import { NextRequest, NextResponse } from "next/server";

const COHERE_API_URL = "https://api.cohere.com/v1/chat";
const COHERE_API_KEY = process.env.COHERE_API_KEY;

export async function POST(request: NextRequest) {
  if (!COHERE_API_KEY) {
    return new NextResponse("API key not provided", { status: 500 });
  }

  try {
    const body = await request.json();
    console.log("Request body:", body);

    const response = await fetch(COHERE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COHERE_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error text from Cohere API:", errorText);
      throw new Error(
        `API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    const stream = new ReadableStream({
      start(controller) {
        async function push() {
          try {
            if (!reader) {
              throw new Error("No response body");
            }
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                break;
              }

              buffer += decoder.decode(value, { stream: true });

              let parts = buffer.split("\n");
              buffer = parts.pop() || ""; // Keep the last incomplete part in the buffer

              for (const part of parts) {
                if (part.trim().length > 0) {
                  try {
                    const parsedResponse = JSON.parse(part);
                    controller.enqueue(JSON.stringify(parsedResponse) + "\n");
                  } catch (e) {
                    console.error("Failed to parse JSON part:", part, e);
                  }
                }
              }
            }
          } catch (error) {
            console.error("Error while reading the stream:", error);
            controller.error(error);
          }
        }
        push();
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new NextResponse("Error processing the request", { status: 500 });
  }
}
