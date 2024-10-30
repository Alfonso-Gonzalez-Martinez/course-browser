import './module.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentLesson, setCurrentModule } from '../../features/currentCourseSlice'
import { setShowCurrentLesson, setShowCurrentCourse } from '../../features/uiSlice';
import type { Lesson } from '../../interfaces/interfaces'

function Module() {

    const { showCurrentModule } = useAppSelector((state) => state.ui)
    const { loading, error } = useAppSelector((state) => state.courses);
    const { currentCourse, currentModule } = useAppSelector((state) => state.currentCourse)
    const dispatch = useAppDispatch();

    const module = currentCourse?.modules.find((module) => module.title === currentModule?.title);

    const handleLessonClick = (lesson: Lesson) => {
        dispatch(setCurrentLesson(lesson));
        dispatch(setShowCurrentLesson());
    };

    const handleBackClick = () => {
        dispatch(setCurrentModule(null));
        dispatch(setShowCurrentCourse())
    }

    return (
        <>
            {loading && <p>Loading module details...</p>}
            {error && <p>Error: {error}</p>}
            {showCurrentModule && module && 
                <div className="module-container">
                    <h2>{module?.title}</h2>
                    <h3>Lessons:</h3>
                    <ul>
                        {module?.lessons.map((lesson) => (
                            <li key={lesson.title} onClick={() => handleLessonClick(lesson)}>
                                {lesson.title}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleBackClick()}>Back</button>
                </div>}
        </>
    );
}

export default Module;