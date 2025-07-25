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
  ],
  // Universal verses for any situation - these enhance all responses
  universal: [
    {
      type: 'ayah' as const,
      arabic: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ',
      translation: 'And my success is not but through Allah. Upon Him I have relied, and to Him I return.',
      reference: 'Quran 11:88'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَاللَّهُ غَالِبٌ عَلَىٰ أَمْرِهِ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ',
      translation: 'And Allah is predominant over His affair, but most of the people do not know.',
      reference: 'Quran 12:21'
    },
    {
      type: 'ayah' as const,
      arabic: 'رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ',
      translation: 'Our Lord, upon You we have relied, and to You we have returned, and to You is the destination.',
      reference: 'Quran 60:4'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَلِلَّهِ الْأَمْرُ مِن قَبْلُ وَمِن بَعْدُ',
      translation: 'And to Allah belongs the command before and after.',
      reference: 'Quran 30:4'
    },
    {
      type: 'dhikr' as const,
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
      translation: 'Glory is to Allah and praise is to Him. Glory is to Allah, the Magnificent.',
      reference: 'Sahih Bukhari'
    },
    {
      type: 'dua' as const,
      arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا',
      translation: 'Our Lord, pour upon us patience and plant firmly our feet.',
      reference: 'Quran 2:250'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَمَن يُؤْمِن بِاللَّهِ يَهْدِ قَلْبَهُ',
      translation: 'And whoever believes in Allah - He will guide his heart.',
      reference: 'Quran 64:11'
    },
    {
      type: 'ayah' as const,
      arabic: 'إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
      translation: 'Indeed, Allah does not allow to be lost the reward of those who do good.',
      reference: 'Quran 9:120'
    },
    {
      type: 'dua' as const,
      arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
      translation: 'My Lord, expand for me my breast and ease for me my task.',
      reference: 'Quran 20:25-26'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَكَانَ حَقًّا عَلَيْنَا نَصْرُ الْمُؤْمِنِينَ',
      translation: 'And it was an obligation upon Us to aid the believers.',
      reference: 'Quran 30:47'
    },
    {
      type: 'dhikr' as const,
      arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      translation: 'There is no deity except Allah, alone without partner.',
      reference: 'Sahih Bukhari'
    },
    {
      type: 'ayah' as const,
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ فُرْقَانًا',
      translation: 'And whoever fears Allah - He will make for him a criterion.',
      reference: 'Quran 8:29'
    }
  ]
};

class GeminiService {
  private supabaseUrl = 'https://xfieuamzkcdzqzzbtnsx.supabase.co/functions/v1/chat-with-gemini';
  private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaWV1YW16a2NkenF6emJ0bnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODUxMjEsImV4cCI6MjA2ODg2MTEyMX0.7Pwl15T02IurOUDEgtZAsCjU2K7Zd5e5LuBuDEdxZEg';

  private detectEmotion(text: string): string {
    const lowerText = text.toLowerCase();
    const sentences = text.split(/[.!?]+/).map(s => s.trim().toLowerCase());
    
    // Behavioral pattern analysis
    const patterns = {
      sadness: {
        keywords: ['sad', 'upset', 'depressed', 'hurt', 'cry', 'crying', 'tears', 'hopeless', 'despair', 'broken', 'devastated', 'miserable', 'heartbroken', 'down', 'low'],
        phrases: ['i feel empty', 'everything is falling apart', 'i want to cry', 'life is meaningless', 'i feel broken', 'nothing matters', 'i am lost'],
        behaviors: ['why me', 'what\'s the point', 'i give up', 'i can\'t take it anymore', 'everything hurts']
      },
      
      loneliness: {
        keywords: ['lonely', 'alone', 'isolated', 'empty', 'disconnected', 'abandoned', 'forgotten', 'invisible'],
        phrases: ['nobody understands', 'no one cares', 'i have no one', 'i feel invisible', 'nobody listens', 'i am all alone'],
        behaviors: ['everyone left me', 'nobody calls', 'i sit alone', 'no friends', 'family doesn\'t care']
      },
      
      fear: {
        keywords: ['scared', 'afraid', 'terrified', 'fear', 'nightmare', 'panic', 'phobia', 'frightened'],
        phrases: ['i am scared', 'what if something bad happens', 'i can\'t face this', 'terrified of', 'afraid that'],
        behaviors: ['hiding from', 'avoiding', 'running away', 'can\'t handle', 'too scary']
      },
      
      anxiety: {
        keywords: ['anxious', 'worried', 'stress', 'overwhelmed', 'nervous', 'restless', 'panic', 'tension'],
        phrases: ['can\'t sleep', 'mind racing', 'heart beating fast', 'sweating', 'shaking', 'can\'t breathe', 'overthinking'],
        behaviors: ['what if', 'constantly thinking', 'can\'t stop worrying', 'checking repeatedly', 'need to control']
      },
      
      forgiveness: {
        keywords: ['guilty', 'shame', 'regret', 'forgive', 'mistake', 'sin', 'wrong', 'repent', 'sorry'],
        phrases: ['i did something wrong', 'allah will never forgive me', 'i am a bad person', 'i feel guilty'],
        behaviors: ['seeking forgiveness', 'made a mistake', 'did something bad', 'hurt someone', 'want to repent']
      },
      
      guidance: {
        keywords: ['confused', 'lost', 'direction', 'guidance', 'advice', 'help', 'unclear', 'uncertain'],
        phrases: ['don\'t know what to do', 'which path to take', 'need guidance', 'show me the way', 'help me decide'],
        behaviors: ['stuck between choices', 'crossroads', 'difficult decision', 'need direction', 'seeking advice']
      },
      
      strength: {
        keywords: ['weak', 'tired', 'exhausted', 'drained', 'powerless', 'defeated', 'giving up'],
        phrases: ['i have no energy', 'can\'t continue', 'too tired to fight', 'no strength left', 'want to give up'],
        behaviors: ['struggling to cope', 'barely holding on', 'need motivation', 'losing hope', 'can\'t go on']
      },
      
      gratitude: {
        keywords: ['grateful', 'thank', 'blessed', 'alhamdulillah', 'appreciate', 'blessing', 'fortunate', 'thankful'],
        phrases: ['thank allah', 'i am blessed', 'grateful for', 'allah has given me', 'feeling blessed'],
        behaviors: ['counting blessings', 'appreciating', 'recognizing gifts', 'feeling thankful', 'acknowledging goodness']
      },
      
      patience: {
        keywords: ['patient', 'difficult', 'trial', 'test', 'hardship', 'struggle', 'endure', 'bear', 'waiting'],
        phrases: ['this is a test', 'allah is testing me', 'need patience', 'hard times', 'difficult period'],
        behaviors: ['going through hardship', 'facing challenges', 'enduring pain', 'waiting for relief', 'struggling but trying']
      }
    };
    
    // Score each emotion based on multiple factors
    const emotionScores: { [key: string]: number } = {};
    
    for (const [emotion, pattern] of Object.entries(patterns)) {
      let score = 0;
      
      // Check keywords (base score)
      pattern.keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          score += 1;
        }
      });
      
      // Check phrases (higher weight)
      pattern.phrases.forEach(phrase => {
        if (lowerText.includes(phrase)) {
          score += 2;
        }
      });
      
      // Check behavioral patterns (highest weight)
      pattern.behaviors.forEach(behavior => {
        if (lowerText.includes(behavior)) {
          score += 3;
        }
      });
      
      // Context analysis - look for emotional intensity
      if (lowerText.includes('very ') || lowerText.includes('extremely ') || lowerText.includes('so ')) {
        score += 0.5;
      }
      
      // Repetition analysis - if emotion words appear multiple times
      const wordCount = (lowerText.match(new RegExp(pattern.keywords.join('|'), 'g')) || []).length;
      if (wordCount > 1) {
        score += wordCount * 0.3;
      }
      
      // Question patterns suggest confusion/guidance seeking
      if (emotion === 'guidance' && (lowerText.includes('?') || lowerText.includes('how ') || lowerText.includes('what '))) {
        score += 1;
      }
      
      // Exclamation marks suggest strong emotions
      const exclamationCount = (text.match(/!/g) || []).length;
      if (exclamationCount > 0) {
        score += exclamationCount * 0.2;
      }
      
      emotionScores[emotion] = score;
    }
    
    // Find the emotion with the highest score
    const sortedEmotions = Object.entries(emotionScores)
      .sort(([,a], [,b]) => b - a)
      .filter(([,score]) => score > 0);
    
    // Return the highest scoring emotion, or 'comfort' if no clear emotion detected
    return sortedEmotions.length > 0 ? sortedEmotions[0][0] : 'comfort';
  }

  private getSpiritualContent(emotion: string): SpiritualContent | undefined {
    // 30% chance to use universal verses for any situation
    const useUniversal = Math.random() < 0.3;
    
    if (useUniversal && spiritualDatabase.universal) {
      const universalContents = spiritualDatabase.universal;
      return universalContents[Math.floor(Math.random() * universalContents.length)];
    }
    
    // Otherwise use situation-specific verses
    const contents = spiritualDatabase[emotion as keyof typeof spiritualDatabase];
    if (contents && contents.length > 0) {
      return contents[Math.floor(Math.random() * contents.length)];
    }
    
    // Fallback to universal verses if no specific category found
    const universalContents = spiritualDatabase.universal;
    if (universalContents && universalContents.length > 0) {
      return universalContents[Math.floor(Math.random() * universalContents.length)];
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