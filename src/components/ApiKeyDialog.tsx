import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, ExternalLink } from 'lucide-react';

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApiKeySubmit: (apiKey: string) => void;
}

export const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  open,
  onOpenChange,
  onApiKeySubmit,
}) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
      onOpenChange(false);
    }
  };

  const handleSkip = () => {
    onApiKeySubmit('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-peaceful border-emerald-lighter/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald">
            <Key className="w-5 h-5" />
            Gemini API Configuration
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            To enable AI-powered spiritual guidance, please provide your Google Gemini API key.
            This will be stored locally in your browser and used to generate personalized responses.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-foreground">
              Gemini API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="border-emerald-lighter/30 focus:border-emerald focus:ring-emerald/20"
            />
          </div>
          
          <div className="bg-emerald/5 p-3 rounded-md border border-emerald-lighter/30">
            <p className="text-sm text-emerald-light">
              <strong>How to get your API key:</strong>
            </p>
            <ol className="text-sm text-muted-foreground mt-1 space-y-1">
              <li>1. Visit Google AI Studio</li>
              <li>2. Sign in with your Google account</li>
              <li>3. Generate a new API key</li>
              <li>4. Copy and paste it here</li>
            </ol>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 text-emerald border-emerald hover:bg-emerald/10"
              onClick={() => window.open('https://makersuite.google.com/app/apikey', '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Get API Key
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="border-emerald-lighter text-emerald hover:bg-emerald/10"
          >
            Skip (Demo Mode)
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!apiKey.trim()}
            className="bg-gradient-spiritual hover:shadow-warm"
          >
            Save & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};