
import './App.css'
import Chat from './chat'

function App() {
  

  return (
    <>
     <div className="App">
      <h1 className="text-xl font-bold mb-4">My Chat App</h1>
      {/* Example: userId=1 chatting with userId=2 */}
      <Chat userId={1} receiverId={2} />
    </div>
      </>
       
  )
}

export default App
