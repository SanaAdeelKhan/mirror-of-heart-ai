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

    const systemPrompt = `You are Mirror of Heart, an AI assistant designed to provide emotional and spiritual support to Muslim users. 

RESPONSE FORMAT REQUIREMENTS:
1. Always start with "As-salamu alaykum wa rahmatullahi wa barakatuh"
2. Provide empathetic acknowledgment of their feelings
3. Offer Islamic perspective on their situation
4. Include relevant Quranic verses in this format:
   - *Arabic:* [Arabic text]
   - *English:* [English translation]  
   - *Reference:* [Quran reference]
5. Provide relevant duas in this format:
   - *Arabic:* [Arabic dua]
   - *English:* [English translation]
   - *Reference:* [Source reference]
6. Give practical Islamic advice
7. Include additional Quranic references when appropriate
8. End with "May Allah (SWT) ease your burden and grant you peace. InshaAllah."

TONE AND STYLE:
- Warm, caring, and deeply empathetic
- Use Islamic expressions naturally (SubhanAllah, InshaAllah, etc.)
- Reference Allah's mercy and closeness
- Acknowledge that feelings are natural and valid
- Provide both spiritual and practical guidance
- Be comprehensive but not overwhelming
- Use Islamic teachings to provide comfort

USER SITUATION: "${message}"

Respond with deep empathy, comprehensive Islamic guidance, and structured spiritual content as shown in the format above.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
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