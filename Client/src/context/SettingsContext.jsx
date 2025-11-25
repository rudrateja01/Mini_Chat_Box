import React, { createContext, useState, useContext, useEffect } from 'react';
import { getSettings, updateSettings } from '../api/settings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (newSettings) => {
    setLoading(true);
    try {
      const updated = await updateSettings(newSettings);
      setSettings(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, loadSettings, updateConfig }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook
export const useSettings = () => useContext(SettingsContext);
