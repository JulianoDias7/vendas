export default function ModalProdutos({ isOpen, onClose, onSubmit, formData, setFormData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Novo Produto</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nome do produto"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
            className="p-2 border rounded focus:ring-2 focus:ring-slate-500"
          />
          <textarea
            placeholder="Descrição do produto"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            required
            className="p-2 border rounded focus:ring-2 focus:ring-slate-500"
          />

          <input
            type="number"
            placeholder="Preço"
            value={formData.preco}
            onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
            required
            className="p-2 border rounded focus:ring-2 focus:ring-slate-500"
          />
          <div className="flex justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
