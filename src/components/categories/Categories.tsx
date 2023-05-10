import { setCategory } from "@/redux/features/inputSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Select } from "@mantine/core";

interface Category {
  key: number;
  title: string;
}

export default function Categories() {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.inputSlicer.category);
  const categories = useAppSelector((state) => state.inputSlicer.categories);

  return (
    <Select
      data-elem='industry-select'
      value={category}
      searchable
      clearable
      onChange={(e: string) => {
        dispatch(setCategory(e));
      }}
      placeholder='Выберете отрасль'
      data={categories.map(({ key, title }: Category) => {
        return { value: key.toString(), label: title };
      })}
    />
  );
}
