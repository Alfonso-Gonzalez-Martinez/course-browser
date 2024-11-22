import './coursesList.css'
import React, {useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchCourses } from '../../features/coursesSlice';
import { setCurrentCourse } from '../../features/currentCourseSlice';
import { setShowCurrentCourse } from '../../features/uiSlice';
import { selectFilteredCourses } from '../../app/selectors';
import type {Course} from '../../interfaces/interfaces'


const CoursesList: React.FC = (): JSX.Element => {

    const { showCourseList } = useAppSelector((state) => state.ui);
    const {courses, loading, error} = useAppSelector((state) => state.courseCatalog);
    const filteredCourses = useAppSelector(selectFilteredCourses);
    const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch])


  const handleCourseClick = (course: Course) => {
    dispatch(setCurrentCourse(course))
    dispatch(setShowCurrentCourse())
  }

    return(
      <>
        {loading && <p>Loading courses...</p>}
        {error && <p>Error: {error}</p>}
        {showCourseList && courses &&
          <div className='courses-list-container' >
            <ul data-testid="courses-list">
                {(filteredCourses.length > 0 ? filteredCourses : courses).map((course, index) => (
                    <li key={index} onClick={() => handleCourseClick(course)}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </li>
                ))}
            </ul>
          </div>
        }
     </>
    )
}

export default CoursesList;