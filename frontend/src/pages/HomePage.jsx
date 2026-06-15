import { useState, useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import { AlertCircle, XCircle } from 'lucide-react';
import api from '../services/api';

export default function HomePage() {
  const { settings } = useStore();

  const [countdown, setCountdown] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [emergencyMessage, setEmergencyMessage] = useState("Preciso de ajuda urgente!");
  const [erro, setErro] = useState(null);


  useEffect(() => {
    const buscarDadosIniciais = async () => {
      try {
   
        const resContatos = await api.get('/contato_emergencia');
        if (resContatos.data && resContatos.data.length > 0) {
  
          setContacts(resContatos.data);
        }

        const resMensagem = await api.get('/mensagem');
        if (resMensagem.data && resMensagem.data.length > 0) {
          setEmergencyMessage(resMensagem.data[0].conteudo || resMensagem.data[0].texto);
        }
      } catch (err) {
        console.error("Erro ao carregar dados da Home:", err);
        setErro("Não foi possível carregar as configurações de emergência.");
      }
    };

    buscarDadosIniciais();
  }, []);
  
  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(c => c - 1);
      }, 1000);
    } else if (countdown === 0) {
      triggerHelp();
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleHelpClick = () => {
    if (countdown === null) {
    
      if (navigator.vibrate) navigator.vibrate(200);
      setCountdown(3);
    }
  };

  const cancelHelp = () => {
    setCountdown(null);
  };

 const triggerHelp = async () => {

  if (!contacts || contacts.length === 0) {
    alert("Por favor, adicione um contato de emergência na aba Contatos antes de pedir ajuda.");
    return;
  }

  let message = emergencyMessage;
  let latitudeAtual = null;
  let longitudeAtual = null;

 
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
      });
      
      const { latitude, longitude } = position.coords;
      latitudeAtual = latitude;
      longitudeAtual = longitude;
      
      message += `\n\nMinha localização: https://maps.google.com/?q=${latitude},${longitude}`;
    } catch (e) {
      console.error("Localização falhou", e);
    }
  }


  try {
    const payloadAlerta = {
      descricao: "Botão de emergência acionado",
      latitude: latitudeAtual,
      longitude: longitudeAtual,
      data: new Date().toISOString()
    };

   
    await api.post('/alerta', payloadAlerta);
    console.log("Alerta registrado com sucesso no MariaDB!");
  } catch (err) {
  
    console.error("Falha ao registrar histórico de alerta no banco:", err);
  }


  const phone = contacts[0].phone.replace(/\D/g, '');
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);


  window.location.href = url;
};
    
  return (
    <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1, textAlign: 'center' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Amparo</h1>
      
      {countdown === null ? (
        <button 
          className="btn btn-danger" 
          style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            fontSize: '1.75rem',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 10px 25px -5px var(--danger-color)',
            animation: 'pulse 2s infinite'
          }}
          onClick={handleHelpClick}
          aria-label="Botão de emergência - Preciso de Ajuda"
        >
          <AlertCircle size={80} />
          <span style={{ fontWeight: '900', lineHeight: 1.2 }}>PRECISO DE<br/>AJUDA</span>
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Enviando pedido de ajuda em...</div>
          <div style={{ 
            fontSize: '8rem', 
            fontWeight: '900', 
            color: 'var(--danger-color)',
            lineHeight: '1'
          }}>
            {countdown}
          </div>
          <button className="btn btn-outline" onClick={cancelHelp} style={{ borderColor: 'var(--text-color)', marginTop: '2rem' }}>
            <XCircle size={24} /> Cancelar Envio
          </button>
        </div>
      )}
      
      {contacts.length === 0 && (
        <div style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.8 }} className="card">
          <strong>Atenção:</strong> Você ainda não tem contatos cadastrados. Adicione um na aba "Contatos".
        </div>
      )}
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
}
