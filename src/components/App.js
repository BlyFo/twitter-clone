import './App.css';
import Content from './content';
import LeftBar from './leftBar';
import RightBar from './rightBar';

function App() {
  return (
    <div className='container'>
      <LeftBar />
      <Content />
      <RightBar />
    </div>
  );
}

export default App;
