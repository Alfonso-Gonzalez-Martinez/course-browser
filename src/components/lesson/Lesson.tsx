import './lesson.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentLesson } from '../../features/currentCourseSlice';
import { setShowCurrentModule } from '../../features/uiSlice';
import type { Content } from '../../interfaces/interfaces';

function Lesson() {
    const { showCurrentLesson } = useAppSelector((state) => state.ui);
    const { loading, error } = useAppSelector((state) => state.courses);
    const { currentModule, currentLesson } = useAppSelector((state) => state.currentCourse);
    const dispatch = useAppDispatch();


    const lesson = currentModule?.lessons.find((lesson) => lesson.title === currentLesson?.title);
    const handleBackClick = () => {
        dispatch(setCurrentLesson(null));
        dispatch(setShowCurrentModule())
    }


    return (
        <>
            {loading && <p>Loading lesson details...</p>}
            {error && <p>Error: {error}</p>}
            {showCurrentLesson && lesson &&
                <div className="lesson-container">
                    <h2>{lesson.title}</h2>
                    <p>{lesson.description}</p>
                    <h3>Topics:</h3>
                    <ul>
                        {lesson.topics?.map((topic) => (
                            <li key={topic}>{topic}</li>
                        ))}
                    </ul>
                    <h3>Content:</h3>
                    {lesson.content?.map((item: Content, index) => {
                         switch (item.type) { // Switch for the data types to be rendered. 
                            case "text":
                                return <p key={index}>{item.data}</p>;
                            case "video":
                                return (
                                    <div key={index}>
                                        <h4>Video:</h4>
                                        <video width="560" height="315" controls>
                                            <source src={item.data} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                );
                            case "audio":
                            case "podcast":
                                return (
                                    <div key={index}>
                                        <h4>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}:</h4>
                                        <audio controls>
                                            <source src={item.data} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                    <button onClick={() => handleBackClick()}>Back</button>
                </div>
            }
        </>
    );
}

export default Lesson;
