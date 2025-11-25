import React, { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    headerColor:'#001f8b',
    backgroundColor:'#fff',
    initialMessage:'Hello! How can we help you?',
    missedChatTimer:5
  });

  const update = (key, value) => setSettings({...settings,[key]:value});

  const save = () => alert('Settings saved (mock)');

  return (
    <div style={{padding:20}}>
      <h3>Chat Bot Settings</h3>
      <div style={{display:'flex',flexDirection:'column',gap:10,width:320}}>
        <label>Header Color: <input type="color" value={settings.headerColor} onChange={e=>update('headerColor',e.target.value)} /></label>
        <label>Background Color: <input type="color" value={settings.backgroundColor} onChange={e=>update('backgroundColor',e.target.value)} /></label>
        <label>Initial Message: <input value={settings.initialMessage} onChange={e=>update('initialMessage',e.target.value)} /></label>
        <label>Missed Chat Timer (mins): <input type="number" value={settings.missedChatTimer} onChange={e=>update('missedChatTimer',e.target.value)} /></label>
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}
