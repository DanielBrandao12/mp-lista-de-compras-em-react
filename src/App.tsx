import React, { useState } from "react";
import logo from "./assets/logo.svg";
import Item from "./components/item";

const App: React.FC = () => {
  const [errorItem, setErrorItem] = useState<boolean>(false);
  const [errorQtde, setErrorQtde] = useState<boolean>(false);
  const [product, setProduct] = useState<string>("");
  const [qtde, setQtde] = useState<number>(0);
  const [items, setItems] = useState<{ product: string; qtde: number; check: boolean }[]>([]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) {
      setErrorItem(true);
      return;
    }

    if (qtde <= 0) {
      setErrorQtde(true);
      return;
    }

    setItems([...items, { product, qtde, check: true }]);
    setProduct("");
    setQtde(0);
  };

  const checkItem = (indexToCheck: number) => {
    const newItems = items.map((item, index) =>
      index === indexToCheck ? { ...item, check: false } : item
    );
    setItems(newItems);
  };

  const removeItem = (indexToRemove: number) => {
    const newItems = items.filter((_, index) => index !== indexToRemove);
    setItems(newItems);
  };

  return (
    <main className="max-w-2xl px-6 py-12 pb-20 mx-auto my-10 bg-white md:my-20 md:px-32 md:rounded-3xl">
      <header className="text-center">
        <img src={logo} alt="logotipo" className="mx-auto" />
        <h1 className="mt-4 text-3xl font-medium font-display">
          Lista de Compras
        </h1>
        <p className="text-sm text-slate-500">
          Facilite sua ida ao supermercado!
        </p>
        <hr className="w-1/3 mx-auto mt-6 mb-8" />
      </header>

      <form className="flex gap-2" onSubmit={handleAddItem}>
        <div className="flex-shrink">
          <label htmlFor="name" className="block text-xs text-slate-400">
            Item
          </label>
          <input
            type="text"
            id="name"
            value={product}
            onFocus={() => setErrorItem(false)}
            onChange={(e) => setProduct(e.target.value)}
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
          {errorItem && (
            <span className="absolute top-[42%] right-[57%] text-[11px] text-red-500">
              Não pode estar vazio
            </span>
          )}
        </div>
        <div className="flex-shrink">
          <label htmlFor="quantity" className="block text-xs text-slate-400">
            Quantidade
          </label>
          <input
            type="number"
            id="quantity"
            value={qtde}
            onFocus={() => setErrorQtde(false)}
            onChange={(e) => setQtde(Number(e.target.value))}
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        {errorQtde && (
          <span className="absolute top-[42%] right-[39%] text-[11px] text-red-500">
            Número precisa ser maior que zero
          </span>
        )}
        <button
          type="submit"
          className="self-end flex-shrink h-10 px-4 font-extrabold text-white rounded-lg bg-fuchsia-300"
        >
          +
        </button>
      </form>

      <Item
        items={items}
        verify={true}
        removeItem={removeItem}
        checkItem={checkItem}
      />

      <section className="mt-16 space-y-3">
        <h2 className="mb-10 text-3xl text-center font-display">
          Itens já comprados
        </h2>
        <Item
          items={items}
          verify={false}
          removeItem={removeItem}
          checkItem={checkItem}
        />
      </section>
    </main>
  );
};

export default App;
