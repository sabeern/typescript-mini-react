import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
interface ItemType {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const Expense = () => {
  const optionList = [
    { label: "Grocery", option: "Grocery" },
    { label: "Household", option: "Household" },
  ];
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allItemList, setAllItemList] = useState<ItemType[]>([]);
  useEffect(() => {
    if (selectedCategory == "All") {
      setItemList(allItemList);
    } else {
      setItemList(
        allItemList.filter((item) => item.category == selectedCategory)
      );
    }
  }, [selectedCategory, allItemList]);
  return (
    <div className="flex flex-col items-center justify-center min-w-full gap-6">
      <h1 className="text-2xl font-bold">Grocery Form</h1>
      <ExpenseForm
        optionList={optionList}
        itemList={itemList}
        setAllItemList={setAllItemList}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        allItemList={allItemList}
      />
    </div>
  );
};

export default Expense;
