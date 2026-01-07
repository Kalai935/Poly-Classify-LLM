export interface FewShotExample {
  id: string;
  text: string;
  label: string;
  language?: string; // Optional metadata
}

export interface ClassificationResult {
  label: string;
  confidence: number;
  reasoning: string;
  detectedLanguage: string;
}

export interface ClassificationState {
  isLoading: boolean;
  result: ClassificationResult | null;
  error: string | null;
}

export interface AppConfig {
  categories: string[];
  examples: FewShotExample[];
}