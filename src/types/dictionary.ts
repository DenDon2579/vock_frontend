export interface IWord {
  englishWord: string;
  type: string;
  translations: ITranslation[];
  progress: number;
}

export interface ITranslation {
  pos: string;
  text: string;
  popularity: number;
}
