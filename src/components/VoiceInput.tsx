import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceAnalysis {
  emotion: string;
  behavior: string;
  confidence: number;
  text: string;
}

interface VoiceInputProps {
  onVoiceMessage: (analysis: VoiceAnalysis) => void;
  isLoading?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onVoiceMessage, isLoading }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          handleVoiceComplete(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const analyzeEmotionAndBehavior = (text: string, audioMetrics: { avgVolume: number; variability: number }): VoiceAnalysis => {
    const lowercaseText = text.toLowerCase();
    
    // Enhanced emotion detection with voice characteristics
    const emotionScores: Record<string, number> = {
      sadness: 0,
      joy: 0,
      anxiety: 0,
      anger: 0,
      fear: 0,
      gratitude: 0,
      loneliness: 0,
      love: 0,
      frustration: 0,
      calmness: 0
    };

    // Text-based emotion indicators
    const emotionKeywords = {
      sadness: ['sad', 'depressed', 'down', 'hurt', 'broken', 'lost', 'empty', 'hopeless', 'cry', 'crying', 'tears'],
      joy: ['happy', 'joyful', 'excited', 'blessed', 'grateful', 'wonderful', 'amazing', 'love', 'celebrating'],
      anxiety: ['worried', 'anxious', 'nervous', 'stressed', 'panic', 'overwhelmed', 'uncertain', 'scared'],
      anger: ['angry', 'mad', 'furious', 'frustrated', 'annoyed', 'irritated', 'hate', 'rage'],
      fear: ['afraid', 'terrified', 'frightened', 'scared', 'worried', 'fearful', 'panic'],
      gratitude: ['thankful', 'grateful', 'blessed', 'appreciation', 'alhamdulillah', 'thank'],
      loneliness: ['alone', 'lonely', 'isolated', 'abandoned', 'empty', 'disconnected'],
      love: ['love', 'adore', 'cherish', 'care', 'affection', 'heart', 'beloved'],
      frustration: ['frustrated', 'stuck', 'blocked', 'difficult', 'hard', 'struggle'],
      calmness: ['calm', 'peaceful', 'serene', 'relaxed', 'tranquil', 'content']
    };

    // Score based on keywords
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      for (const keyword of keywords) {
        if (lowercaseText.includes(keyword)) {
          emotionScores[emotion] += 1;
        }
      }
    }

    // Voice characteristic analysis
    const { avgVolume, variability } = audioMetrics;
    
    // High volume + high variability = anger/frustration
    if (avgVolume > 0.7 && variability > 0.5) {
      emotionScores.anger += 2;
      emotionScores.frustration += 1;
    }
    
    // Low volume + low variability = sadness/depression
    if (avgVolume < 0.3 && variability < 0.3) {
      emotionScores.sadness += 2;
      emotionScores.loneliness += 1;
    }
    
    // High variability = anxiety/excitement
    if (variability > 0.6) {
      emotionScores.anxiety += 1;
      emotionScores.joy += 0.5;
    }

    // Find dominant emotion
    const dominantEmotion = Object.entries(emotionScores).reduce((a, b) => 
      emotionScores[a[0]] > emotionScores[b[0]] ? a : b
    )[0];

    // Behavior analysis
    const behaviorScores: Record<string, number> = {
      passive: 0,
      hopeful: 0,
      expressive: 0,
      angry: 0,
      depressed: 0,
      overwhelmed: 0,
      peaceful: 0,
      seeking: 0
    };

    // Behavior indicators
    const behaviorPatterns = {
      passive: ['maybe', 'i guess', 'whatever', 'i dont know', 'i suppose'],
      hopeful: ['inshallah', 'hope', 'pray', 'bismillah', 'alhamdulillah', 'trust', 'faith'],
      expressive: ['really', 'very', 'so much', 'extremely', 'absolutely', 'definitely'],
      angry: ['why', 'unfair', 'stupid', 'hate', 'wrong', 'terrible'],
      depressed: ['nothing', 'never', 'always', 'pointless', 'useless', 'worthless'],
      overwhelmed: ['too much', 'cant handle', 'everything', 'all at once', 'pressure'],
      peaceful: ['alhamdulillah', 'grateful', 'content', 'peaceful', 'blessed'],
      seeking: ['help', 'guidance', 'advice', 'what should', 'how can', 'please']
    };

    for (const [behavior, patterns] of Object.entries(behaviorPatterns)) {
      for (const pattern of patterns) {
        if (lowercaseText.includes(pattern)) {
          behaviorScores[behavior] += 1;
        }
      }
    }

    // Voice-based behavior analysis
    if (avgVolume > 0.8) behaviorScores.expressive += 1;
    if (avgVolume < 0.2) behaviorScores.passive += 1;
    if (variability > 0.7) behaviorScores.overwhelmed += 1;

    const dominantBehavior = Object.entries(behaviorScores).reduce((a, b) => 
      behaviorScores[a[0]] > behaviorScores[b[0]] ? a : b
    )[0];

    const confidence = Math.min(
      (emotionScores[dominantEmotion] + behaviorScores[dominantBehavior]) / 5,
      1
    );

    return {
      emotion: dominantEmotion,
      behavior: dominantBehavior,
      confidence,
      text
    };
  };

  const getVolumeData = (): Promise<{ avgVolume: number; variability: number }> => {
    return new Promise((resolve) => {
      if (!analyserRef.current) {
        resolve({ avgVolume: 0.5, variability: 0.3 });
        return;
      }

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      const volumes = Array.from(dataArray).map(val => val / 255);
      const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
      const variance = volumes.reduce((sum, val) => sum + Math.pow(val - avgVolume, 2), 0) / volumes.length;
      const variability = Math.sqrt(variance);

      resolve({ avgVolume, variability });
    });
  };

  const setupAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      
      // Start volume monitoring
      const updateVolume = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setVolume(avg / 255);
        }
        if (isListening) {
          animationRef.current = requestAnimationFrame(updateVolume);
        }
      };
      updateVolume();
    } catch (error) {
      console.error('Error setting up audio analysis:', error);
    }
  };

  const handleVoiceComplete = async (text: string) => {
    setIsProcessing(true);
    
    try {
      const audioMetrics = await getVolumeData();
      const analysis = analyzeEmotionAndBehavior(text, audioMetrics);
      onVoiceMessage(analysis);
    } catch (error) {
      console.error('Error analyzing voice:', error);
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const startListening = async () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    try {
      await setupAudioAnalysis();
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <Card className="p-4 bg-card border-emerald-lighter/30 shadow-gentle">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Voice Input</h3>
            <p className="text-sm text-muted-foreground">Speak your heart, I'm listening</p>
          </div>
          
          <div className="flex items-center gap-2">
            {isListening && (
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald" />
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald to-emerald-light transition-all duration-100"
                    style={{ width: `${volume * 100}%` }}
                  />
                </div>
              </div>
            )}
            
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading || isProcessing}
              className={cn(
                "transition-all duration-300",
                isListening 
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse" 
                  : "bg-gradient-spiritual hover:shadow-warm"
              )}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {(transcript || isProcessing) && (
          <div className="p-3 bg-muted/50 rounded-lg border border-emerald-lighter/20">
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-emerald rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-emerald rounded-full animate-pulse delay-200"></div>
                </div>
                <span className="text-sm text-muted-foreground">Analyzing your voice...</span>
              </div>
            ) : (
              <p className="text-sm text-foreground italic">"{transcript}"</p>
            )}
          </div>
        )}

        {isListening && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald/10 text-emerald rounded-full text-xs">
              <div className="w-2 h-2 bg-emerald rounded-full animate-pulse"></div>
              Listening...
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};