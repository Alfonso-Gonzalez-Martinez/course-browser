import './course.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentModule, setCurrentCourse } from '../../features/currentCourseSlice';
import { setShowCurrentModule, showCourses } from '../../features/uiSlice';
import type { Module } from '../../interfaces/interfaces'

function Course() {

    const { showCurrentCourse } = useAppSelector((state) => state.ui)
    const { courses, loading, error } = useAppSelector((state) => state.courses);
    const { currentCourse } = useAppSelector((state) => state.currentCourse)
    const dispatch = useAppDispatch();

    const course = courses.find((course) => course.id === currentCourse?.id);

    const handleModuleClick = (module: Module) => {
        dispatch(setCurrentModule(module));
        dispatch(setShowCurrentModule());
    };

    const handleBackClick = () => {
        dispatch(setCurrentCourse(null));
        dispatch(showCourses())
    }

    return (
        <>
            {loading && <p>Loading course details...</p>}
            {error && <p>Error: {error}</p>}
            {showCurrentCourse && course &&
                <div className="course-container">
                    <h2>{course?.title}</h2>
                    <p>{course?.description}</p>
                    <h3>Modules:</h3>
                    <ul>
                        {course?.modules.map((module) => (
                            <li key={module.title} onClick={() => handleModuleClick(module)}>
                                {module.title}
                                <ul>
                                    {module.lessons.map((lesson, index) => (
                                        <li key={lesson.title}>{lesson.title}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleBackClick()}>Back</button>
                </div>}
        </>
    );
}

export default Course;