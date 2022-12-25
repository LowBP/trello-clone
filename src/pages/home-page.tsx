
import Home from '../components/Home/Home';
import './css/home-page.css'

function HomePage() {

  return (
    <div className="trello-boards">
      <div className="trello-boards-container">
        <div className="trello-boards-list-section">
          <Home/>
        </div>
      </div>
    </div>

  );
}

export default HomePage;
