//cardProdutos.jsx
import { useEffect, useState } from 'react';
import { IoAdd, IoCloseCircle } from 'react-icons/io5';

export default function CardProdutos({ id ,nome,descricao,preco, imagem, onDelete }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [open]);


  return (
    <div className="w-full flex flex-col shadow-xl rounded-lg">
      <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
        <img
          className="object-contain h-full max-w-full"
          src={imagem == null ? 'https://placehold.co/400x400' : imagem}
          alt={nome}
        />
      </div>

      <div className="m-2 text-center">
        <p className="font-semibold truncate">{nome}</p>
        <button
          disabled={open}
          className="w-full bg-slate-700 text-white rounded-lg p-2 hover:bg-slate-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Descrição</span>
            <IoAdd />
          </div>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-slate-700 bg-opacity-80 backdrop-blur-md flex items-center justify-center "
          onClick={() => setOpen(false)} //
        >
          <div
            className="bg-white rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 relative transform transition-all duration-1000 ease-out scale-95 opacity-100 animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-1 right-1 text-gray-600 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              <IoCloseCircle size={32} />
            </button>
            <button
              className="bg-slate-700 w-32 text-white p-2 rounded hover:bg-slate-600 transition"
              onClick={() => onDelete(id)}
            >
              Excluir Produto
            </button>

            <div>
              <div className="mx-auto m-2 w-full">
                <img
                  className="w-full h-2/3 object-contain"
                  src={imagem == null ? 'https://placehold.co/400x400' : imagem}
                  alt={nome}
                />
              </div>
              <p className="text-gray-700">{id}</p>
              <p className="text-2xl font-semibold text-gray-900 mb-2">{nome}</p>
              <p className="text-gray-700">{descricao}</p>
              <p className="text-gray-700 text-2xl font-bold">R$ {preco}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
