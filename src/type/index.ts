interface UserInfo {
  //인적사항
  name: string;
  grade: number;
  class: string;
  teacher: string;
}
interface DefaultInfo {
  onlineLearningTime: number;
  learningProgress?: number;
  point: number;
  score?: number;
}

interface ClassInfo extends DefaultInfo {
  testTime?: number;
  testResult?: boolean[];
}

interface HomeWorkInfo extends DefaultInfo {
  onlineLearningTime: number;
  isLearned: boolean[];
}

interface AddLearningInfo {
  totalLearningTime: number;
  classLearningTime?: number;
  hwLearningTime?: number;
  point: number;
  descInfo: AddLearningDesc[];
}

interface AddLearningDesc {
  learnDate: Date;
  learnTitle: string;
  endLearnTime: Date;
  point: number;
}

// final test
