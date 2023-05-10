import Image from "next/image";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <Image src='/Frame.svg' alt='nothing is found' width={240} height={230} />
  );
}
