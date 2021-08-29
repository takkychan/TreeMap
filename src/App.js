import Form from './components/Form';

function App() {
  return (
    <div className="tree-map-app">
      <header className="header">
        <a href="/">
          <h1 className="title">BuildATree</h1>
        </a>
      </header>
      <div className="container">
        <Form />
      </div>
    </div>
  );
}

export default App;
