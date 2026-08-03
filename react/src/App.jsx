function App() {
  return (
    <div className="app">
      <header>
        <h1>React Example Project</h1>
        <p>This is a minimal React app created with Vite.</p>
      </header>
      <main>
        <button
          type="button"
          onClick={() => alert('Hello from React!')}
        >
          Click me
        </button>
      </main>
    </div>
  )
}

export default App
