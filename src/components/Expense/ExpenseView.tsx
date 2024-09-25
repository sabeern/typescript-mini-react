import { Dispatch } from "react";

interface ItemType {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface ExpenseViewProps {
  itemList: ItemType[];
  setAllItemList: Dispatch<React.SetStateAction<ItemType[]>>;
  allItemList: ItemType[];
}
const ExpenseView = ({
  itemList,
  setAllItemList,
  allItemList,
}: ExpenseViewProps) => {
  const total = itemList.reduce((acc, item) => acc + item.amount, 0);
  const removeItem = (id: number) => {
    setAllItemList(allItemList.filter((item) => item.id != id));
  };
  return (
    <div className="my-4">
      <table className="min-w-full text-center">
        {itemList.map((expense) => {
          return (
            <tr className="border-2">
              <td className="border-2 p-2">{expense.description}</td>
              <td className="border-2 ">{expense.category}</td>
              <td className="border-2">{expense.amount}</td>
              <td className="border-2">
                <button
                  className="border-2 bg-red-500 px-4 py-2 rounded-lg"
                  onClick={() => removeItem(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
        {itemList.length > 0 && (
          <tr>
            <td className="border-2 p-2 font-semibold" colSpan={2}>
              Total
            </td>
            <td className="border-2 p-2 font-bold" colSpan={2}>
              {total}
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default ExpenseView;
