import { setErrorMessage } from "@/redux/features/errorSlicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Notification } from "@mantine/core";
import styles from "./ErrorAlert.module.scss";

export default function ErrorAlert() {
  const isError = useAppSelector((state) => state.errorSlicer.errorMessage);
  const dispatch = useAppDispatch();

  return (
    <div className={`${styles.error_container} ${!isError && styles.none}`}>
      {isError && (
        <Notification
          icon={"X"}
          color='red'
          onClose={() => {
            dispatch(setErrorMessage(""));
          }}
        >
          {isError}
        </Notification>
      )}
    </div>
  );
}
