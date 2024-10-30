export interface Course {
    id: number;
    title: string;
    description: string;
    modules: Module[];
  }

  export interface Module {
    title: string;
    lessons: Lesson[];
  }

  export interface Lesson {
    title: string;
    description: string;
    topics: string[];
    content: Content[];
  }

  export interface Content {
      type: 'text' | 'video' | 'audio' | 'podcast';
      data: string;
    }

  export interface CoursesState {
      courses: Course[];
      loading: boolean;
      error: string | null;
      searchTerm: string;
    }

  export interface CurrentCourseState {
    currentLesson: Lesson | null;
    currentModule: Module | null;
    currentCourse: Course | null;
  }

export interface uiState {
    showCourseList: boolean;
    showCurrentCourse: boolean;
    showCurrentModule: boolean;
    showCurrentLesson: boolean;
}