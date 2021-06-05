export interface ITransformableData {
  timestamp: Date;
  context: string;
  color: (x: string) => string;
  level: string;
  message: string;
}
