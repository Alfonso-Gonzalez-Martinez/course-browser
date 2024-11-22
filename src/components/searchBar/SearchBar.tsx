import './searchBar.css'
import { setSearchTerm, resetSearchTerm } from "../../features/coursesSlice";
import { setCurrentCourse, setCurrentLesson, setCurrentModule } from "../../features/currentCourseSlice"
import { showCourses } from "../../features/uiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import homeIcon from '../../assets/home-icon.webp';


function SearchBar(){

    const dispatch = useAppDispatch()
    const searchTerm = useAppSelector((state) => state.courseCatalog.searchTerm);
    const showCourseList = useAppSelector((state) => state.ui.showCourseList);
    const handleHomeClick = () => {
        dispatch(setCurrentLesson(null));
        dispatch(setCurrentCourse(null));
        dispatch(setCurrentModule(null));
        dispatch(resetSearchTerm());
        dispatch(showCourses());
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    };

    return(
        <div className="search-bar-container">
            <button className='home-button' onClick={() => handleHomeClick()}>
                <img src={homeIcon} alt='Home icon'/>
            </button>
            <input
                type="text"
                value={searchTerm}
                placeholder={showCourseList ? "Search courses by title or description" : "Disabled. Press Home to continue searching."}
                onChange={handleSearchChange}
                disabled={!showCourseList}
            />
            <button className="clear-button"
                onClick={() => {
                    if(searchTerm)
                        handleHomeClick()
                }}
                disabled={!searchTerm}
                >
                    Clear Search
            </button>
        </div>)
}

export default SearchBar;