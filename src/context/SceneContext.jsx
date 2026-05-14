import { createContext, useContext, useState } from 'react';

const SceneCtx = createContext(null);

export function SceneProvider({ children }) {
  const [panel,   setPanel]   = useState(null);   // { type, data }
  const [showAI,  setShowAI]  = useState(false);
  const [camTarget, setCamTarget] = useState(null);

  return (
    <SceneCtx.Provider value={{ panel, setPanel, showAI, setShowAI, camTarget, setCamTarget }}>
      {children}
    </SceneCtx.Provider>
  );
}

export const useScene = () => useContext(SceneCtx);
