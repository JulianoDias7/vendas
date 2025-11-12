import { useState, useEffect } from 'react';
import List from '../components/List';

export default function Cadastros() {
  const [activeTab, setActiveTab] = useState('Cliente');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ id: '', nome: '', doc: '', email: '' });
  const [docError, setDocError] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    fetchPessoas();
  }, []);

  const BASE_URL = 'https://mighty-gerianna-personalprojectjfd-073599bc.koyeb.app/pessoas';

  async function fetchPessoas() {
    try {
      const res = await fetch(`${BASE_URL}`);
      if (!res.ok) throw new Error('Erro ao buscar pessoas');
      const data = await res.json();
      setClientes(data.filter((p) => p.type === 'Cliente'));
      setFornecedores(data.filter((p) => p.type === 'Fornecedor'));
    } catch (error) {
      console.error('Erro ao carregar pessoas:', error);
    }
  }

  async function Cadastro(e) {
    e.preventDefault();

    if (!isValidDoc(formData.doc, activeTab)) {
      setDocError(true); // marca erro se inválido
      return; // bloqueia envio
    }

    const payload = {
      nome: formData.nome,
      doc: formData.doc,
      email: formData.email,
      type: activeTab,
    };

    try {
      if (edit) {
        await fetch(`${BASE_URL}/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      await fetchPessoas();
      setOpen(false);
      setEdit(false);
      setFormData({ id: '', nome: '', doc: '', email: '' });
      setDocError(false);
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error);
    }
  }

  function Edit(id) {
    setOpen(true);
    setEdit(true);

    const lista = activeTab === 'Cliente' ? clientes : fornecedores;
    const pessoa = lista.find((p) => p.id === id);

    if (pessoa) {
      setFormData({
        id: pessoa.id,
        nome: pessoa.nome,
        doc: pessoa.doc,
        email: pessoa.email,
      });
    }
  }

  async function Delete(id) {
    try {
      await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      await fetchPessoas();
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
    }
  }

  function formatDoc(value, type) {
    const digits = value.replace(/\D/g, '');
    if (type === 'Cliente') {
      return digits
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else {
      return digits
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
        .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
  }
  function handleDocChange(e) {
    let digits = e.target.value.replace(/\D/g, ''); // só números

    // Limita o tamanho
    const maxLength = activeTab === 'Cliente' ? 11 : 14;
    if (digits.length > maxLength) digits = digits.slice(0, maxLength);

    setFormData({ ...formData, doc: digits });
    setDocError(false);
  }

  function isValidDoc(doc, type) {
    const digits = doc.replace(/\D/g, ''); // remove tudo que não é número
    if (type === 'Cliente') return digits.length === 11;
    else return digits.length === 14;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          className={`px-4 py-2 font-semibold rounded-t ${
            activeTab === 'Cliente'
              ? 'bg-slate-700 text-white border-b-2 border-blue-500'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('Cliente')}
        >
          Clientes
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t ${
            activeTab === 'Fornecedor'
              ? 'bg-slate-700 text-white border-b-2 border-blue-500'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('Fornecedor')}
        >
          Fornecedores
        </button>
      </div>

      {/* Buttons + List */}
      {activeTab === 'Cliente' && (
        <div>
          <div className="flex justify-center gap-4 mb-4">
            <button
              className="bg-slate-700 w-40 text-white p-2 rounded hover:bg-slate-600 transition"
              onClick={() => {
                setFormData({ id: '', nome: '', doc: '' });
                setOpen(true);
                setEdit(false);
              }}
            >
              + Novo Cliente
            </button>
          </div>
          <div className="overflow-x-auto">
            <List data={clientes} onDelete={Delete} onEdit={Edit} type={activeTab} />
          </div>
        </div>
      )}

      {activeTab === 'Fornecedor' && (
        <div>
          <div className="flex justify-center gap-4 mb-4">
            <button
              className="bg-slate-700 w-40 text-white p-2 rounded hover:bg-slate-600 transition"
              onClick={() => {
                setFormData({ id: '', nome: '', doc: '' });
                setOpen(true);
                setEdit(false);
              }}
            >
              + Novo Fornecedor
            </button>
          </div>
          <div className="overflow-x-auto">
            <List data={fornecedores} onDelete={Delete} onEdit={Edit} type={activeTab} />
          </div>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {edit ? 'Editar' : 'Cadastrar'} {activeTab}
            </h2>
            <form className="flex flex-col gap-3" onSubmit={Cadastro}>
              <input
                type="text"
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                className="p-2 border rounded focus:ring-2 focus:ring-slate-500"
              />

              <input
                type="text"
                placeholder={activeTab === 'Cliente' ? 'CPF' : 'CNPJ'}
                value={formatDoc(formData.doc, activeTab)}
                onChange={handleDocChange}
                onBlur={() => {
                  const valid = isValidDoc(formData.doc, activeTab);
                  setDocError(!valid);
                  if (valid) {
                    setFormData({ ...formData, doc: formatDoc(formData.doc, activeTab) });
                  }
                }}
                className={`p-2 border rounded transition-all ${
                  docError
                    ? 'border-red-500 ring-2 ring-red-500 animate-pulse'
                    : 'border-gray-300 focus:ring-2 focus:ring-slate-500'
                }`}
              />
              {docError && (
                <p className=" text-sm text-medium text-center">
                  Digite um {activeTab === 'Cliente' ? 'CPF' : 'CNPJ'} válido
                </p>
              )}
              <input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="p-2 border rounded focus:ring-2 focus:ring-slate-500"
              />

              <div className="flex justify-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setFormData({ id: '', nome: '', doc: '' });
                    setDocError(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
