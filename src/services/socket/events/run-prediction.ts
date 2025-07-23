export interface RunPrediction {
  category: 'tops' | 'bottoms' | 'one-pieces' | 'sets' | 'auto';
  mode: 'performance' | 'balanced' | 'quality';
  modelImage: string;
  garmentImage: string;
}
