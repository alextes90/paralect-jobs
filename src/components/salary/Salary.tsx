import { SALARY } from "@/constants/defaultVal";
import { setSalary } from "@/redux/features/inputSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NumberInput } from "@mantine/core";
import styles from "./Salary.module.scss";

export default function Salary() {
  const dispatch = useAppDispatch();
  const salary = useAppSelector((state) => state.inputSlicer.salary);
  return (
    <div className={styles.container}>
      <NumberInput
        data-elem='salary-from-input'
        value={salary.amountForm === SALARY.amountForm ? "" : salary.amountForm}
        onChange={(e: number | "") =>
          dispatch(
            setSalary({
              amountForm: +e,
              amountTill: salary.amountTill,
            })
          )
        }
        min={SALARY.amountForm}
        max={SALARY.amountTill}
        step={1000}
        placeholder='От'
      />
      <NumberInput
        data-elem='salary-to-input'
        value={salary.amountTill === SALARY.amountTill ? "" : salary.amountTill}
        onChange={(e: number | "") =>
          dispatch(
            setSalary({
              amountForm: salary.amountForm,
              amountTill: +e,
            })
          )
        }
        min={SALARY.amountForm}
        max={SALARY.amountTill}
        placeholder='До'
      />
    </div>
  );
}
