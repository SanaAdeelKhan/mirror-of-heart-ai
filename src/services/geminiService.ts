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

// Comprehensive Islamic content database with situational Quran verses
const spiritualDatabase = {
  comfort: [
    {
      type: 'ayah' as const,
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      translation: 'And whoever fears Allah - He will make for him a way out.',
      reference: 'Quran 65:2'
    },
    {
      type: 'ayah' as const,
      arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
      translation: 'So verily, with hardship comes ease. Verily, with hardship comes ease.',
      reference: 'Quran 94:5-6'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ',
      translation: 'And He is with you wherever you are.',
      reference: 'Quran 57:4'
    },
    {
      type: 'dua' as const,
      arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
      translation: 'Allah is sufficient for us, and He is the best Guardian.',
      reference: 'Quran 3:173'
    }
  ],
  sadness: [
    {
      type: 'ayah' as const,
      arabic: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ',
      translation: 'And do not despair of the mercy of Allah. Indeed, no one despairs of Allah\'s mercy except the disbelieving people.',
      reference: 'Quran 12:87'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ',
      translation: 'And My mercy encompasses all things.',
      reference: 'Quran 7:156'
    },
    {
      type: 'dua' as const,
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ',
      translation: 'O Allah, I ask You of Your favor and mercy.',
      reference: 'Sahih Bukhari'
    }
  ],
  loneliness: [
    {
      type: 'ayah' as const,
      arabic: 'وَهُوَ الَّذِي يُنَزِّلُ الْغَيْثَ مِن بَعْدِ مَا قَنَطُوا وَيَنشُرُ رَحْمَتَهُ',
      translation: 'It is He who sends down rain after they had despaired and spreads His mercy.',
      reference: 'Quran 42:28'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَاعْلَمُوا أَنَّ اللَّهَ يَحُولُ بَيْنَ الْمَرْءِ وَقَلْبِهِ',
      translation: 'And know that Allah intervenes between a man and his heart.',
      reference: 'Quran 8:24'
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
      type: 'ayah' as const,
      arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
      translation: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
      reference: 'Quran 65:3'
    },
    {
      type: 'dua' as const,
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
      translation: 'O Allah, I seek refuge in You from worry and grief.',
      reference: 'Sahih Bukhari'
    }
  ],
  fear: [
    {
      type: 'ayah' as const,
      arabic: 'فَلَا تَخَافُوهُمْ وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ',
      translation: 'So fear them not, but fear Me, if you are believers.',
      reference: 'Quran 3:175'
    },
    {
      type: 'ayah' as const,
      arabic: 'إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ',
      translation: 'Indeed, with me is my Lord; He will guide me.',
      reference: 'Quran 26:62'
    }
  ],
  gratitude: [
    {
      type: 'ayah' as const,
      arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
      translation: 'If you are grateful, I will certainly give you more.',
      reference: 'Quran 14:7'
    },
    {
      type: 'dhikr' as const,
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'All praise is due to Allah, Lord of all the worlds.',
      reference: 'Quran 1:2'
    },
    {
      type: 'dhikr' as const,
      arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
      translation: 'Our Lord, give us good in this world and good in the next world.',
      reference: 'Quran 2:201'
    }
  ],
  patience: [
    {
      type: 'ayah' as const,
      arabic: 'وَبَشِّرِ الصَّابِرِينَ',
      translation: 'And give good tidings to the patient.',
      reference: 'Quran 2:155'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا',
      translation: 'And be patient for the decision of your Lord, for indeed, you are in Our eyes.',
      reference: 'Quran 52:48'
    },
    {
      type: 'ayah' as const,
      arabic: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
      translation: 'Indeed, the patient will be given their reward without account.',
      reference: 'Quran 39:10'
    }
  ],
  forgiveness: [
    {
      type: 'ayah' as const,
      arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
      translation: 'Say, "O My servants who have transgressed against themselves, do not despair of the mercy of Allah."',
      reference: 'Quran 39:53'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا',
      translation: 'And whoever does a wrong or wrongs himself but then seeks forgiveness of Allah will find Allah Forgiving and Merciful.',
      reference: 'Quran 4:110'
    }
  ],
  guidance: [
    {
      type: 'ayah' as const,
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مِنْ أَمْرِهِ يُسْرًا',
      translation: 'And whoever fears Allah - He will make for him ease in his matter.',
      reference: 'Quran 65:4'
    },
    {
      type: 'dua' as const,
      arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
      translation: 'Our Lord, give us from Yourself mercy and prepare for us from our affair right guidance.',
      reference: 'Quran 18:10'
    }
  ],
  strength: [
    {
      type: 'ayah' as const,
      arabic: 'وَمَن يَعْتَصِم بِاللَّهِ فَقَدْ هُدِيَ إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
      translation: 'And whoever holds firmly to Allah has been guided to a straight path.',
      reference: 'Quran 3:101'
    },
    {
      type: 'ayah' as const,
      arabic: 'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ',
      translation: 'And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely upon Him.',
      reference: 'Quran 3:159'
    }
  ]
};

class GeminiService {
  private supabaseUrl = 'https://xfieuamzkcdzqzzbtnsx.supabase.co/functions/v1/chat-with-gemini';
  private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaWV1YW16a2NkenF6emJ0bnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODUxMjEsImV4cCI6MjA2ODg2MTEyMX0.7Pwl15T02IurOUDEgtZAsCjU2K7Zd5e5LuBuDEdxZEg';

  private detectEmotion(text: string): string {
    const lowerText = text.toLowerCase();
    
    // Sadness and despair detection
    if (lowerText.includes('sad') || lowerText.includes('upset') || lowerText.includes('depressed') || 
        lowerText.includes('hurt') || lowerText.includes('cry') || lowerText.includes('hopeless') ||
        lowerText.includes('despair') || lowerText.includes('broken') || lowerText.includes('devastated')) {
      return 'sadness';
    }
    
    // Loneliness detection
    if (lowerText.includes('lonely') || lowerText.includes('alone') || lowerText.includes('isolated') ||
        lowerText.includes('nobody understands') || lowerText.includes('no one cares') ||
        lowerText.includes('empty') || lowerText.includes('disconnected')) {
      return 'loneliness';
    }
    
    // Fear detection (separate from anxiety)
    if (lowerText.includes('scared') || lowerText.includes('afraid') || lowerText.includes('terrified') ||
        lowerText.includes('fear') || lowerText.includes('nightmare') || lowerText.includes('panic attack')) {
      return 'fear';
    }
    
    // Anxiety and worry detection
    if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('stress') || 
        lowerText.includes('overwhelmed') || lowerText.includes('can\'t sleep') ||
        lowerText.includes('restless') || lowerText.includes('nervous')) {
      return 'anxiety';
    }
    
    // Forgiveness and guilt detection
    if (lowerText.includes('guilty') || lowerText.includes('shame') || lowerText.includes('regret') ||
        lowerText.includes('forgive') || lowerText.includes('mistake') || lowerText.includes('sin') ||
        lowerText.includes('wrong') || lowerText.includes('repent')) {
      return 'forgiveness';
    }
    
    // Guidance and confusion detection
    if (lowerText.includes('confused') || lowerText.includes('lost') || lowerText.includes('direction') ||
        lowerText.includes('guidance') || lowerText.includes('don\'t know') || lowerText.includes('help me') ||
        lowerText.includes('what should i do') || lowerText.includes('advice')) {
      return 'guidance';
    }
    
    // Strength and empowerment detection
    if (lowerText.includes('weak') || lowerText.includes('tired') || lowerText.includes('exhausted') ||
        lowerText.includes('give up') || lowerText.includes('strength') || lowerText.includes('power') ||
        lowerText.includes('can\'t continue') || lowerText.includes('motivation')) {
      return 'strength';
    }
    
    // Gratitude detection
    if (lowerText.includes('grateful') || lowerText.includes('thank') || lowerText.includes('blessed') || 
        lowerText.includes('alhamdulillah') || lowerText.includes('appreciate') ||
        lowerText.includes('blessing') || lowerText.includes('fortunate')) {
      return 'gratitude';
    }
    
    // Patience detection
    if (lowerText.includes('patient') || lowerText.includes('difficult') || lowerText.includes('trial') || 
        lowerText.includes('test') || lowerText.includes('hardship') || lowerText.includes('struggle') ||
        lowerText.includes('endure') || lowerText.includes('bear')) {
      return 'patience';
    }
    
    return 'comfort'; // Default fallback
  }

  private getSpiritualContent(emotion: string): SpiritualContent | undefined {
    const contents = spiritualDatabase[emotion as keyof typeof spiritualDatabase];
    if (contents && contents.length > 0) {
      return contents[Math.floor(Math.random() * contents.length)];
    }
    return undefined;
  }

  async generateResponse(userMessage: string): Promise<GeminiResponse> {
    try {
      const response = await fetch(this.supabaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.supabaseAnonKey}`,
          'apikey': this.supabaseAnonKey,
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI service');
      }

      const data = await response.json();
      const aiText = data.text || "I'm here to listen and support you. May Allah grant you peace and comfort.";

      const emotion = this.detectEmotion(userMessage);
      const spiritualContent = this.getSpiritualContent(emotion);

      return {
        text: aiText,
        spiritualContent
      };
    } catch (error) {
      console.error('Error calling AI service:', error);
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