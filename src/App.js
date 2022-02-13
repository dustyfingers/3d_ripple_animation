import { Suspense } from 'react';

import AnimationCanvas from './AnimationCanvas';
import './App.css';


function App() {
  return (
    <div className="anim">
      <Suspense fallback={<div>Loading...</div>}>
        <AnimationCanvas/>
      </Suspense>
    </div>
  );
}

export default App;
