//produtos.jsx
import { useEffect, useState } from 'react';
import CardProdutos from '../components/CardProdutos';
import ModalProdutos from '../components/ModalProdutos'



export default function Produtos() {
  const [products, setProduct] = useState([]);
   const [search, setSearch] = useState('');
   const [isOpen, setIsOpen] = useState(false);
   const [formData, setFormData] = useState({ nome: '', descricao: '', preco: '' });
   
 useEffect(() => {
   fetch('http://localhost:8080/produtos')
     .then((res) => {
       if (!res.ok) {
         throw new Error('Erro ao buscar produtos');
       }
       return res.json();
     })
     .then((data) => setProduct(data))
     .catch((error) => console.error('Erro: ', error));
 }, [])
 function deleteProduct(id) {
   fetch(`http://localhost:8080/produtos/${id}`, { method: 'DELETE' })
     .then((res) => {
       if (!res.ok) throw new Error('Não foi possível deletar o item!');
       return res.text();
     })
     .then(() => {
       setProduct((prev) => prev.filter((p) => p.id !== id));
     })
     .catch((error) => console.error(error));
   setIsOpen(false)
 }
  async function createProduct(produto) {
    try {
      const response = await fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
      });

      if (!response.ok) throw new Error('Erro ao criar produto');

      const data = await response.json();
      console.log('Produto criado:', data);

      setProduct((prev) => [...prev, data]);

      setFormData({ nome: '', descricao: '', preco: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Erro:', error);
    }
  }


  const produtosFiltrados = products.filter((prod) =>
    prod.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-2">
      <div className="w-1/2 justify-center mb-4 mx-auto sm:flex-row md:flex-row">
        <div className="flex flex-col justify-center items-center gap-4 sm:flex-row md:flex-row">
          <button
            className="bg-slate-700 w-32 text-white p-2 rounded hover:bg-slate-600 transition"
            onClick={() => setIsOpen(true)}
          >
            Cadastrar Produto
          </button>

          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-1 border rounded shadow focus:outline-none focus:ring-2 focus:ring-slate-500 md:w-64"
          />
        </div>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {produtosFiltrados.map((prod) => (
          <CardProdutos
            key={prod.id}
            id={prod.id}
            nome={prod.nome}
            descricao={prod.descricao}
            preco={prod.precoFormatado}
            imagem={prod.imagem}
            onDelete={() => deleteProduct(prod.id)}
          />
        ))}
      </div>

      <ModalProdutos
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          createProduct(formData);
        }}
        formData={formData}
        setFormData={setFormData}
        
      />
      {console.log(formData)}
    </div>
  );
}
