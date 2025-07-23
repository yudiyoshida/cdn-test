export interface RunPrediction {
  category: 'tops' | 'bottoms' | 'one-pieces' | 'sets';
  mode: 'performance' | 'balanced' | 'quality';
  modelImage: string;
  garmentImage: string;
}
