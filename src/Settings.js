import React, { useState, useEffect } from 'react';

function Settings({ currentModel, onModelChange, onClose }) {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(currentModel);
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    fetchModels();
    checkOllamaStatus();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        const data = await response.json();
        // 假设 API 返回的是一个对象数组，每个对象包含 model 属性
        setModels(data.models.map(model => model.name));
      } else {
        setStatus('Failed to fetch models');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  const checkOllamaStatus = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/version');
      if (response.ok) {
        const data = await response.json();
        setStatus(`Ollama service is available (version: ${data.version})`);
      } else {
        setStatus('Ollama service is not responding');
      }
    } catch (error) {
      setStatus('Error: ' + error.message);
    }
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleSave = () => {
    onModelChange(selectedModel);
    onClose();
  };

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <div>
        <label htmlFor="model-select">Select Model:</label>
        <select id="model-select" value={selectedModel} onChange={handleModelChange}>
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div>
        <p>Status: {status}</p>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default Settings;
