import { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { UserPlus, Trash2, Edit2 } from 'lucide-react';

const DDD_LIST = [
  { value: '11', label: 'SP (11)' },
  { value: '12', label: 'SP (12)' },
  { value: '13', label: 'SP (13)' },
  { value: '14', label: 'SP (14)' },
  { value: '15', label: 'SP (15)' },
  { value: '16', label: 'SP (16)' },
  { value: '17', label: 'SP (17)' },
  { value: '18', label: 'SP (18)' },
  { value: '19', label: 'SP (19)' },
  { value: '21', label: 'RJ (21)' },
  { value: '22', label: 'RJ (22)' },
  { value: '24', label: 'RJ (24)' },
  { value: '27', label: 'ES (27)' },
  { value: '28', label: 'ES (28)' },
  { value: '31', label: 'MG (31)' },
  { value: '32', label: 'MG (32)' },
  { value: '33', label: 'MG (33)' },
  { value: '34', label: 'MG (34)' },
  { value: '35', label: 'MG (35)' },
  { value: '37', label: 'MG (37)' },
  { value: '38', label: 'MG (38)' },
  { value: '41', label: 'PR (41)' },
  { value: '42', label: 'PR (42)' },
  { value: '43', label: 'PR (43)' },
  { value: '44', label: 'PR (44)' },
  { value: '45', label: 'PR (45)' },
  { value: '46', label: 'PR (46)' },
  { value: '47', label: 'SC (47)' },
  { value: '48', label: 'SC (48)' },
  { value: '49', label: 'SC (49)' },
  { value: '51', label: 'RS (51)' },
  { value: '53', label: 'RS (53)' },
  { value: '54', label: 'RS (54)' },
  { value: '55', label: 'RS (55)' },
  { value: '61', label: 'DF (61)' },
  { value: '62', label: 'GO (62)' },
  { value: '63', label: 'TO (63)' },
  { value: '64', label: 'GO (64)' },
  { value: '65', label: 'MT (65)' },
  { value: '66', label: 'MT (66)' },
  { value: '67', label: 'MS (67)' },
  { value: '68', label: 'AC (68)' },
  { value: '69', label: 'RO (69)' },
  { value: '71', label: 'BA (71)' },
  { value: '73', label: 'BA (73)' },
  { value: '74', label: 'BA (74)' },
  { value: '75', label: 'BA (75)' },
  { value: '77', label: 'BA (77)' },
  { value: '79', label: 'SE (79)' },
  { value: '81', label: 'PE (81)' },
  { value: '82', label: 'AL (82)' },
  { value: '83', label: 'PB (83)' },
  { value: '84', label: 'RN (84)' },
  { value: '85', label: 'CE (85)' },
  { value: '86', label: 'PI (86)' },
  { value: '87', label: 'PE (87)' },
  { value: '88', label: 'CE (88)' },
  { value: '89', label: 'PI (89)' },
  { value: '91', label: 'PA (91)' },
  { value: '92', label: 'AM (92)' },
  { value: '93', label: 'PA (93)' },
  { value: '94', label: 'PA (94)' },
  { value: '95', label: 'RR (95)' },
  { value: '96', label: 'AP (96)' },
  { value: '97', label: 'AM (97)' },
  { value: '98', label: 'MA (98)' },
  { value: '99', label: 'MA (99)' }
];

export default function ContactsPage() {
  const { contacts, addContact, removeContact, updateContact } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', ddd: '11', phone: '' });

  const applyMask = (val) => {
    let v = val.replace(/\D/g, '');
    if (v.length > 9) v = v.substring(0, 9);
    if (v.length > 5) {
      return v.substring(0, 5) + '-' + v.substring(5);
    }
    return v;
  };

  const resetForm = () => {
    setFormData({ name: '', ddd: '11', phone: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (c) => {
    let raw = c.phone.replace(/\D/g, '');
    let dddState = '11';
    let phonePart = '';
    
    // Ensure backwards compatibility with old records
    if (raw.startsWith('55') && raw.length >= 12) {
      dddState = raw.substring(2, 4);
      phonePart = raw.substring(4);
    } else if (raw.length >= 10) {
      dddState = raw.substring(0, 2);
      phonePart = raw.substring(2);
    } else {
      phonePart = raw;
    }

    setFormData({ name: c.name, ddd: dddState, phone: applyMask(phonePart) });
    setEditingId(c.id);
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawPhone = formData.phone.replace(/\D/g, '');
    if (!formData.name.trim() || rawPhone.length < 8) {
      alert("Por favor, preencha o número corretamente (8 ou 9 dígitos).");
      return;
    }
    
    const E164Phone = `55${formData.ddd}${rawPhone}`;
    const contactPayload = { name: formData.name, phone: E164Phone };
    
    if (editingId) {
      updateContact(editingId, contactPayload);
    } else {
      addContact(contactPayload);
    }
    resetForm();
  };

  const formatDisplayPhone = (p) => {
     let raw = p.replace(/\D/g, '');
     if (raw.startsWith('55') && raw.length >= 12) {
       return `+55 (${raw.substring(2,4)}) ${raw.substring(4,9)}-${raw.substring(9)}`;
     }
     return p;
  };

  return (
    <div className="page-container">
      <h2>Contatos de Emergência</h2>
      
      {!isAdding && (
        <button className="btn btn-primary" onClick={() => setIsAdding(true)} style={{ width: '100%' }}>
          <UserPlus size={20} /> Adicionar Contato
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="card">
          <h3>{editingId ? 'Editar Contato' : 'Novo Contato'}</h3>
          <div className="form-group">
            <label htmlFor="name" style={{ fontWeight: 'bold' }}>Nome do Contato</label>
            <input 
              id="name"
              type="text" 
              className="input" 
              placeholder="Ex: Mãe, Cuidador..."
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneGroup" style={{ fontWeight: 'bold' }}>Número do WhatsApp</label>
            <div style={{ fontSize: '0.8rem', color: 'var(--danger-color)', marginBottom: '0.5rem', fontWeight: '500' }}>
              Serviço nacional exclusívo para números do Brasil.
            </div>
            
            <div id="phoneGroup" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div 
                style={{ 
                  backgroundColor: 'var(--border-color)', 
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '46px'
                }}
                aria-label="Código do País Brasil"
              >
                +55
              </div>
              
              <select 
                className="input"
                style={{ flex: '1', minWidth: '110px', padding: '0.75rem', fontSize: '1rem', height: '46px' }}
                value={formData.ddd}
                onChange={e => setFormData({...formData, ddd: e.target.value})}
                aria-label="Selecione o Estado e DDD"
              >
                {DDD_LIST.map(item => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
              
              <input 
                type="tel" 
                className="input" 
                style={{ flex: '2', minWidth: '140px', padding: '0.75rem', fontSize: '1rem', height: '46px' }}
                placeholder="99999-9999"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: applyMask(e.target.value)})}
                required
                aria-label="Número do telefone celular com 9 dígitos"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={resetForm} style={{ flex: 1 }}>Cancelar</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Salvar</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {contacts.map(contact => (
          <div key={contact.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{contact.name}</div>
              <div style={{ opacity: 0.8, fontSize: '0.875rem' }}>{formatDisplayPhone(contact.phone)}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => handleEdit(contact)}
                className="btn btn-outline"
                style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
                title="Editar Contato"
                aria-label="Editar"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => {
                  if(window.confirm(`Deseja remover ${contact.name}?`)) removeContact(contact.id);
                }}
                className="btn btn-danger"
                style={{ padding: '0.5rem', borderRadius: '0.5rem' }}
                title="Remover Contato"
                aria-label="Remover"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {contacts.length === 0 && !isAdding && (
          <div style={{ textAlign: 'center', opacity: 0.6, padding: '2rem' }}>
            Nenhum contato cadastrado.
          </div>
        )}
      </div>
    </div>
  );
}
