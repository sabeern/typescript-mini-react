import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ExpenseFormProps {
  optionList: { label: string; option: string }[];
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

const ExpenseForm = ({ optionList }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<dataType>({
    resolver: zodResolver(schema),
  });
  const submit = (data: dataType) => {
    console.log(data);
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
          <select className="w-96 h-10 rounded-lg border-2 px-2">
            <option value="All Categories">All Categories</option>
            {optionList.map((option, i) => (
              <option value={option?.option} key={i}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ExpenseForm;
