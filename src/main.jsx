// 리액트 앱의 진입점
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ReactDOM.createRoot()로 HTML의 #root에 React 앱(App 컴포넌트 전체)을 렌더링
// App.jsx가 리액트 앱의 시작 화면
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
