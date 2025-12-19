import './App.css'
import ChatWindow from './components/ChatWindow.jsx'
import Sidebar from './components/Sidebar.jsx'
import { ContextProvider } from './contexts/context.jsx' 
function App() {
  return (
    <ContextProvider>
      <div className='App'>
        <Sidebar/>
        <ChatWindow/>
      </div>
    </ContextProvider>
  )
}

export default App