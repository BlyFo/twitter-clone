import './App.css';
import Content from './content';
import LeftBar from './leftBar';
import RightBar from './rightBar';
import Register_Login from './register_Login';

function App() {
  return (
    <div className='container'>
      <LeftBar />
      <Content />
      <RightBar />
      <Register_Login />
    </div>
  );
}

export default App;
