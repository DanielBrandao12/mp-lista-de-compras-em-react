import React from "react";
import trash from "../../assets/trash.svg";
import todo from "../../assets/todo.svg";
import done from "../../assets/done.svg";

interface ItemProps {
  checkItem: (value:number) => void,
  removeItem: (value:number) => void,
  verify: boolean;
  items: Array<{
    product: string;
    qtde: number;
    check: boolean;
  }>;
}

const Item: React.FC<ItemProps> = ({ items, verify, removeItem, checkItem }) => {
  const filteredItems = items.filter(item => item.check === verify);

  

  return (
    <section className="mt-10 space-y-3">
   {filteredItems.map((item) => {
  const originalIndex = items.indexOf(item);
  return (
    <div key={originalIndex}>
      <article className="flex w-full gap-4">
        <img
          src={item.check ? todo : done}
          alt="ícone de status"
          className={item.check ? "" : "cursor-pointer"}
        />
        <div className="flex-1">
          <p className={!item.check ? "line-through text-slate-400" : ""}>
            {item.product}
          </p>
          <p className={!item.check ? "text-sm line-through text-slate-400" : ""}>
            {item.qtde} Caixas
          </p>
        </div>
        <img
          src={trash}
          alt="ícone de lixeira"
          className="justify-self-end cursor-pointer"
          onClick={() => item.check ? checkItem(originalIndex) : removeItem(originalIndex)}
        />
      </article>
      <hr />
    </div>
  );
})}

    </section>
  );
};

export default Item;
