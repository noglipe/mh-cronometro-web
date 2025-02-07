interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  h: string;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function Button(props: ButtonProps) {
  const cs =
    "px-3 py-2 bg-buttonBackground border border-solid border-borderColor text-white rounded-md ";
  return (
    <button
      className={
        props?.disabled ?
        `${cs} cursor-no-drop` : `${cs} ${props.h}`
    }
      onClick={props.onClick}
      disabled={props?.disabled}
    >
      {props.children}
    </button>
  );
}
