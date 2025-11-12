import { useState, useEffect } from 'react';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';

export default function List({ data, type, onDelete, onEdit }) {
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsFull(true);
    } else {
      setIsFull(false);
    }
  }, [data]);

  if (!isFull) {
    return(
      <p className='text-center m-5'>Lista de {type === 'Cliente' ? 'Clientes' : 'Fornecedores'} vazia</p>
    )
  };

  return (
    <table className=" border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border text-center py-2 w-1/4">Nome</th>
          <th className="border text-center w-1/5">{type === 'Cliente' ? 'CPF' : 'CNPJ'}</th>
          <th className="border text-center w-1/3">E-mail</th>
          <th className="border text-center w-1/6">Tipo</th>
          <th className="border text-center w-1/6">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border px-4 py-2 w/1/4 truncate">{item.nome}</td>
            <td className="border px-4 py-2 w-1/5 truncate">{item.doc}</td>
            <td className="border px-4 py-2 w-1/4 truncate">{item.email}</td>
            <td className="border px-4 py-2 ">{item.type}</td>
            <div className="border py-2 flex justify-around">
              <td className='border-r-2 px-2'>
                <button onClick={() => onEdit(item.id)}>
                  <MdEdit size={26} color="green" className="opacity-40" />
                </button>
              </td>
              <td className='px-2'>
                <button onClick={() => onDelete(item.id)}>
                  <MdDeleteOutline size={26} color="red" className="opacity-40" />
                </button>
              </td>
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
