import { useState, useEffect } from 'react';
import { useStore } from '../hooks/useStore';
import api from '../services/api';

export default function SettingsPage() {

  const { settings, updateSettings } = useStore();

  const [contacts, setContacts] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [messageId, setMessageId] = useState(null);

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const resContatos = await api.get('/contato-emergencia/getAll');
        if (resContatos.data && resContatos.data.contatos) {
          const mapped = resContatos.data.contatos.map(c => ({
            id: c.id_contato_emergencia,
            name: c.nome_contato,
            phone: c.telefone_contato
          }));
          setContacts(mapped);
        }

        const resMensagem = await api.get('/mensagem/getAll');
        if (resMensagem.data && resMensagem.data.mensagens && resMensagem.data.mensagens.length > 0) {
          const firstMsg = resMensagem.data.mensagens[0];
          setMessageText(firstMsg.texto || "");
          setMessageId(firstMsg.id_mensagem);
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
      if (messageId) {
        await api.put(`/mensagem/update/${messageId}`, { texto: valor });
        console.log("Mensagem atualizada no banco com sucesso!");
      } else if (contacts.length > 0) {
        await api.post('/mensagem/create', { id_contato_emergencia: contacts[0].id, texto: valor });
        console.log("Mensagem criada no banco com sucesso!");
        
        // Re-busca para achar o ID da mensagem criada
        const resMsg = await api.get('/mensagem/getAll');
        if (resMsg.data && resMsg.data.mensagens && resMsg.data.mensagens.length > 0) {
          setMessageId(resMsg.data.mensagens[0].id_mensagem);
        }
      } else {
        console.warn("Nenhum contato cadastrado no banco para associar a mensagem.");
      }
    } catch (err) {
      console.error("Erro ao salvar mensagem no banco:", err);
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
          value={settings.selectedContactId || ''}
          onChange={(e) => updateSettings({ selectedContactId: e.target.value })}
        >
          <option value="">(Acionar o primeiro da lista)</option>
          {contacts.map(c => (
            <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
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
