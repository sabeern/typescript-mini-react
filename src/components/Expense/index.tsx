import ExpenseForm from "./ExpenseForm";

const Expense = () => {
  const optionList = [
    { label: "Grocery", option: "Grocery" },
    { label: "Household", option: "Household" },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-w-full gap-6">
      <h1 className="text-2xl font-bold">Grocery Form</h1>
      <ExpenseForm optionList={optionList} />
    </div>
  );
};

export default Expense;
