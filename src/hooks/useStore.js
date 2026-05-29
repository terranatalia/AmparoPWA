import { useState, useEffect } from 'react';

const DEFAULT_STATE = {
  contacts: [],
  settings: {
    message: "Olá, estou precisando de ajuda agora. Por favor, entre em contato comigo.",
    useLocation: false,
    theme: 'light',
    contrast: 'normal',
    fontSize: 'normal',
    selectedContactId: null
  }
};

export const useStore = () => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('amparo_store');
      return saved ? JSON.parse(saved) : DEFAULT_STATE;
    } catch (e) {
      console.error("Failed to load state", e);
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('amparo_store', JSON.stringify(state));
  }, [state]);

  const addContact = (contact) => {
    const newContact = { ...contact, id: Date.now().toString() };
    setState(prev => ({
      ...prev,
      contacts: [...prev.contacts, newContact]
    }));
    return newContact;
  };

  const removeContact = (id) => {
    setState(prev => ({
      ...prev,
      contacts: prev.contacts.filter(c => c.id !== id),
      settings: {
        ...prev.settings,
        selectedContactId: prev.settings.selectedContactId === id ? null : prev.settings.selectedContactId
      }
    }));
  };

  const updateContact = (id, updatedData) => {
    setState(prev => ({
      ...prev,
      contacts: prev.contacts.map(c => c.id === id ? { ...c, ...updatedData } : c)
    }));
  };

  const updateSettings = (newSettings) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  return {
    contacts: state.contacts,
    settings: state.settings,
    addContact,
    removeContact,
    updateContact,
    updateSettings,
  };
};
