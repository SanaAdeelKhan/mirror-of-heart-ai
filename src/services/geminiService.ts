interface SpiritualContent {
  type: 'ayah' | 'dua' | 'dhikr';
  arabic?: string;
  translation?: string;
  reference?: string;
}

interface GeminiResponse {
  text: string;
  spiritualContent?: SpiritualContent;
}

// Islamic content database
const spiritualDatabase = {
  comfort: [
    {
      type: 'ayah' as const,
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      translation: 'And whoever fears Allah - He will make for him a way out.',
      reference: 'Quran 65:2'
    },
    {
      type: 'dua' as const,
      arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
      translation: 'Allah is sufficient for us, and He is the best Guardian.',
      reference: 'Quran 3:173'
    }
  ],
  gratitude: [
    {
      type: 'dhikr' as const,
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'All praise is due to Allah, Lord of all the worlds.',
      reference: 'Quran 1:2'
    }
  ],
  anxiety: [
    {
      type: 'ayah' as const,
      arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      translation: 'Verily, in the remembrance of Allah do hearts find rest.',
      reference: 'Quran 13:28'
    },
    {
      type: 'dua' as const,
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
      translation: 'O Allah, I seek refuge in You from worry and grief.',
      reference: 'Sahih Bukhari'
    }
  ],
  patience: [
    {
      type: 'ayah' as const,
      arabic: 'وَبَشِّرِ الصَّابِرِينَ',
      translation: 'And give good tidings to the patient.',
      reference: 'Quran 2:155'
    }
  ]
};

class GeminiService {
  private apiKey: string = '';
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  private detectEmotion(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('sad') || lowerText.includes('upset') || lowerText.includes('depressed') || 
        lowerText.includes('hurt') || lowerText.includes('cry')) {
      return 'comfort';
    }
    
    if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('stress') || 
        lowerText.includes('fear') || lowerText.includes('panic')) {
      return 'anxiety';
    }
    
    if (lowerText.includes('grateful') || lowerText.includes('thank') || lowerText.includes('blessed') || 
        lowerText.includes('alhamdulillah')) {
      return 'gratitude';
    }
    
    if (lowerText.includes('patient') || lowerText.includes('difficult') || lowerText.includes('trial') || 
        lowerText.includes('test')) {
      return 'patience';
    }
    
    return 'comfort'; // Default
  }

  private getSpiritualContent(emotion: string): SpiritualContent | undefined {
    const contents = spiritualDatabase[emotion as keyof typeof spiritualDatabase];
    if (contents && contents.length > 0) {
      return contents[Math.floor(Math.random() * contents.length)];
    }
    return undefined;
  }

  async generateResponse(userMessage: string): Promise<GeminiResponse> {
    // Simulate API call if no API key is provided
    if (!this.apiKey) {
      return this.generateMockResponse(userMessage);
    }

    try {
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

User message: "${userMessage}"

Respond with empathy and care, as if speaking to a dear friend who needs emotional support.`;

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
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

      const emotion = this.detectEmotion(userMessage);
      const spiritualContent = this.getSpiritualContent(emotion);

      return {
        text: aiText,
        spiritualContent
      };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return this.generateMockResponse(userMessage);
    }
  }

  private generateMockResponse(userMessage: string): GeminiResponse {
    const emotion = this.detectEmotion(userMessage);
    const spiritualContent = this.getSpiritualContent(emotion);
    
    // Generate contextual responses based on emotion
    const responses = {
      comfort: [
        "I can hear the pain in your words, and I want you to know that what you're feeling is valid. Allah sees your struggles and He is always with you. Remember that after every hardship comes ease, and you are stronger than you know.",
        "It takes courage to share your feelings, and I'm honored that you've opened your heart here. Your pain matters, and you don't have to carry it alone. May Allah grant you peace and surround you with His mercy."
      ],
      anxiety: [
        "Feeling anxious can be overwhelming, but you're taking a positive step by acknowledging these feelings. Allah is aware of your concerns and He has power over all things. Try to take deep breaths and remember that you are in His care.",
        "Anxiety can make everything feel uncertain, but remember that Allah's plan for you is filled with wisdom and love. Focus on what you can control today, and trust that He will guide you through whatever comes next."
      ],
      gratitude: [
        "Your gratitude is beautiful and it reflects a heart that recognizes Allah's countless blessings. This positive mindset is a gift that not only brings you closer to Allah but also illuminates the path for others around you.",
        "MashAllah, gratitude is one of the most powerful ways to connect with the divine. Your thankful heart is a source of strength and a reminder that even in challenges, there are always blessings to be found."
      ],
      patience: [
        "Patience is indeed one of the most challenging yet beautiful qualities to develop. Every moment of patience you practice is an act of worship and trust in Allah's timing. You're doing better than you think.",
        "The path of patience is not easy, but it leads to incredible spiritual growth. Allah tests those He loves, and your perseverance through difficulties is building strength within you that will serve you in this life and the next."
      ]
    };

    const responseArray = responses[emotion as keyof typeof responses] || responses.comfort;
    const text = responseArray[Math.floor(Math.random() * responseArray.length)];

    return { text, spiritualContent };
  }
}

export const geminiService = new GeminiService();