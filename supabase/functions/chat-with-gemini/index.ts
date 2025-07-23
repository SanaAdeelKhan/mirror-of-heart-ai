import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const systemPrompt = `You are Mirror of Heart, an AI assistant designed to provide emotional and spiritual support to Muslim users. Your responses should be:

1. Empathetic and understanding
2. Supportive without being preachy
3. Respectful of Islamic values and teachings
4. Focused on emotional well-being
5. Concise but meaningful (2-3 sentences)

Guidelines:
- Use warm, caring language
- Acknowledge the user's feelings
- Offer gentle guidance or perspective
- Avoid giving specific religious rulings (fatwa)
- Be inclusive of different levels of faith
- End with encouraging words

User message: "${message}"

Respond with empathy and care, as if speaking to a dear friend who needs emotional support.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Gemini API');
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                  "I'm here to listen and support you. May Allah grant you peace and comfort.";

    return new Response(JSON.stringify({ text: aiText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});