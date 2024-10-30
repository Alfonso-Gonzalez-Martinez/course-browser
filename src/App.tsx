import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import CoursesList from './components/coursesList/CoursesList';
import Course from './components/course/Course'
import Module from './components/module/Module'
import Lesson from './components/lesson/Lesson'


function App() {


  return (
    <div className="app-container">
      <header className="header-container">
        <h1 className="header-title">Course Browser</h1>
        <nav>
          <SearchBar />
        </nav>
      </header>
      <main className="components-container">
        <CoursesList />
        <Course />
        <Module />
        <Lesson />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Course Browser App</p>
      </footer>
    </div>
  );
}

export default App;
