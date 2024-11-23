import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { SolanaPage } from "./pages/BlockWalletPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = { <LandingPage /> } />
          <Route path='/wallet' element = { <SolanaPage /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
