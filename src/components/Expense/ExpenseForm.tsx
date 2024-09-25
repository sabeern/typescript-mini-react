import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpenseView from "./ExpenseView";
import { Dispatch } from "react";

interface ItemType {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface ExpenseFormProps {
  optionList: { label: string; option: string }[];
  itemList: ItemType[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<React.SetStateAction<string>>;
  setAllItemList: Dispatch<React.SetStateAction<ItemType[]>>;
  allItemList: ItemType[];
}
const schema = z.object({
  description: z
    .string()
    .min(3, { message: "minimum 3 character." })
    .max(10, "maximum 10 character."),
  amount: z.number({ invalid_type_error: "Age field is required" }).min(18),
  category: z.string().min(1),
});
type dataType = z.infer<typeof schema>;

const ExpenseForm = ({
  optionList,
  itemList,
  selectedCategory,
  setSelectedCategory,
  setAllItemList,
  allItemList,
}: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dataType>({
    resolver: zodResolver(schema),
  });
  const submit = (data: dataType) => {
    setAllItemList([...allItemList, { id: Date.now(), ...data }]);
  };
  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col gap-1">
          <label>
            Description
            <span className="text-red-600">
              {errors.description && errors.description?.message}
            </span>
          </label>
          <input
            type="text"
            className="w-96 h-10 rounded-lg border-2 px-2"
            {...register("description")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>
            Amount
            <span className="text-red-600">
              {errors.amount && errors.amount?.message}
            </span>
          </label>
          <input
            type="text"
            className="w-96 h-10 rounded-lg border-2 px-2"
            {...register("amount", { valueAsNumber: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>
            Category
            <span className="text-red-600">
              {errors.category && errors.category?.message}
            </span>
          </label>
          <select
            className="w-96 h-10 rounded-lg border-2 px-2"
            {...register("category")}
          >
            <option value=""></option>
            {optionList.map((option, i) => (
              <option value={option?.option} key={i}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <div className="flex flex-col gap-1">
          <label>Category</label>
          <select
            className="w-96 h-10 rounded-lg border-2 px-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {optionList.map((option, i) => (
              <option value={option?.option} key={i}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        <ExpenseView
          itemList={itemList}
          setAllItemList={setAllItemList}
          allItemList={allItemList}
        />
      </div>
    </>
  );
};

export default ExpenseForm;
