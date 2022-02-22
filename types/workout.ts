export interface Workout {
  slug: string;
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  logo?: string;
  description?: string;
  instruction?: string;
  unit: 'time' | 'reps';
  vatiant?: string;
  type: 'exercise' | 'souplesse' | 'echauffement';
  RIS?: number;
  RIE?: number;
  nbSet?: number;
  //   aim: string;
  reps?: number;
}
