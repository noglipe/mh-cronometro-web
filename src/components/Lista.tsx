
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };

type Obj = {
    time: number; 
    interference: boolean; 
    index: number 
}

interface ListaProps{
    savedTimes: Obj[] 
}

export default function Lista(props: ListaProps) {

    return(
        <div className="mt-4  h-[300px] overflow-auto p-10 py-0">
        <ul className="w-full text-center">
          {props.savedTimes.map(({ time, interference, index }) => (
            <li key={index} className={`hover:bg-gray-800 py-2 px-4 text-lg ${interference ? 'text-red-500' : ''}`}>
              {index}º tempo : {formatTime(time)} {interference ? '*' : ''}
            </li>
          ))}
        </ul>
      </div>
    )
}