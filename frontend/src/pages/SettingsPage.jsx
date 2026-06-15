import { useState, useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import api from '../services/api';

export default function SettingsPage() {

  const { settings, updateSettings } = useStore();

  const [contacts, setContacts] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedContactId, setSelectedContactId] = useState("");

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const resContatos = await api.get('/contato_emergencia');
        setContacts(resContatos.data);

        const resMensagem = await api.get('/mensagem');
        if (resMensagem.data && resMensagem.data.length > 0) {
          setMessageText(resMensagem.data[0].conteudo || resMensagem.data[0].texto || "");
        }
      } catch (err) {
        console.error("Erro ao carregar dados de configurações do banco:", err);
      }
    };

    carregarConfiguracoes();
  }, []);


  const handleMessageChange = async (valor) => {
    setMessageText(valor);
    try {

      await api.post('/mensagem', { texto: valor, conteudo: valor });
      console.log("Mensagem atualizada no banco com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar mensagem no banco:", err);
    }
  };


  const handleContactChange = async (idContato) => {
    setSelectedContactId(idContato);
    try {

      await api.put('/usuario/preferencias', { selectedContactId: idContato });
      console.log("Contato preferencial atualizado no banco!");
    } catch (err) {
      console.error("Erro ao salvar contato preferencial no banco:", err);
    }
  };

  return (
    <div className="page-container">
      <h2>Configurações</h2>

      <div className="card form-group">
        <label htmlFor="message" style={{ fontWeight: 'bold' }}>Mensagem Automática</label>
        <textarea
          id="message"
          className="textarea"
          rows="4"
          value={messageText}
          onChange={(e) => handleMessageChange(e.target.value)}
        />
        <small style={{ opacity: 0.7 }}>Esta mensagem será enviada junto com o pedido de ajuda.</small>
      </div>

      <div className="card form-group">
        <label htmlFor="selectedContact" style={{ fontWeight: 'bold' }}>Contato Preferencial</label>
        <select
          id="selectedContact"
          className="input"
          value={selectedContactId} // Mudado aqui
          onChange={(e) => handleContactChange(e.target.value)} // Mudado aqui
        >
          <option value="">(Acionar o primeiro da lista)</option>
          {contacts.map(c => (
            <option key={c.id} value={c.id}>{c.name || c.nome} ({c.phone})</option>
          ))}
        </select>
        
        <small style={{ opacity: 0.7 }}>Selecione o contato principal para receber a emergência.</small>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Privacidade e Acessibilidade</h3>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>Enviar Localização (GPS)</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Anexa um link do Google Maps na mensagem</div>
          </div>
          <input
            type="checkbox"
            checked={settings.useLocation}
            onChange={(e) => updateSettings({ useLocation: e.target.checked })}
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>Tema Visual</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Escolha um modo de cor adequado</div>
          </div>
          <select
            className="input"
            style={{ width: 'auto' }}
            value={settings.theme}
            onChange={(e) => updateSettings({ theme: e.target.value })}
          >
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>Alto Contraste</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Para facilitar a leitura</div>
          </div>
          <select
            className="input"
            style={{ width: 'auto' }}
            value={settings.contrast}
            onChange={(e) => updateSettings({ contrast: e.target.value })}
          >
            <option value="normal">Desativado</option>
            <option value="high">Ativado</option>
          </select>
        </label>

        <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
          <div>
            <div style={{ fontWeight: 'bold' }}>Tamanho da Fonte</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Aumenta o tamanho dos textos</div>
          </div>
          <select
            className="input"
            style={{ width: 'auto' }}
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="large">Grande</option>
          </select>
        </label>
      </div>
    </div>
  );
}
