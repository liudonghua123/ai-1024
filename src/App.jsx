import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Transformer from './pages/Transformer.jsx'
import LLM from './pages/LLM.jsx'
import StableDiffusion from './pages/StableDiffusion.jsx'
import DiT from './pages/DiT.jsx'
import Embedding from './pages/Embedding.jsx'
import RAG from './pages/RAG.jsx'
import RLHF from './pages/RLHF.jsx'
import Multimodal from './pages/Multimodal.jsx'
import Agent from './pages/Agent.jsx'
import Papers from './pages/Papers.jsx'
import { ThemeProvider } from './theme.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transformer" element={<Transformer />} />
            <Route path="/llm" element={<LLM />} />
            <Route path="/stable-diffusion" element={<StableDiffusion />} />
            <Route path="/dit" element={<DiT />} />
            <Route path="/embedding" element={<Embedding />} />
            <Route path="/rag" element={<RAG />} />
            <Route path="/rlhf" element={<RLHF />} />
            <Route path="/multimodal" element={<Multimodal />} />
            <Route path="/agent" element={<Agent />} />
            <Route path="/papers" element={<Papers />} />
          </Routes>
        </main>
        <footer className="footer">
          <span>1024 程序员节特供 · 用最硬核的方式说人话</span>
          <span className="footer-dec">0b10000000000 = 1024</span>
        </footer>
      </div>
    </ThemeProvider>
  )
}
