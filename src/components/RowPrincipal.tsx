import { StatePlaying } from "@/types";
import { TableCell, TableRow } from "./ui/table";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useRef } from "react";

interface Props {
  row: string[];
  index?: number;
  playing: StatePlaying;
  setPlaying: ({ isPlaying, currentWord }: StatePlaying) => void;
}
function RowPrincipal({ playing, setPlaying, row }: Props) {
  const [text, audioSrc] = row[1].split("; ");

  const audio = useRef(new Audio(audioSrc));
  audio.current.volume = 0.7;

  const rowToRender = row.slice(0, 3); // quito la última columna (categories)

  function handleClick() {
    /* Not playing other audio */
    if (playing.isPlaying && playing.currentWord?.trim() !== text.trim())
      return;

    /*  if exists audio */
    if (audioSrc) {
      /* Pause to current audio */
      if (playing.isPlaying && playing.currentWord?.trim() === text.trim()) {
        audio.current.pause();
        audio.current.remove();
        setPlaying({
          currentWord: undefined,
          isPlaying: false,
        });
        
        /* Play first */
      } else {
        setPlaying({
          currentWord: text.trim(),
          isPlaying: true,
        });

        audio.current.play();
        audio.current.onended = () => {
          setPlaying({
            currentWord: undefined,
            isPlaying: false,
          });
          audio.current.remove();
        };
      }
    }
  }

  return (
    <TableRow
      onClick={() => {
        handleClick();
      }}
      className={`${playing.isPlaying ? "cursor-wait" : "cursor-pointer"}
        ${
          playing.isPlaying &&
          playing.currentWord?.trim() === text.trim() &&
          "dark:bg-zinc-500 bg-zinc-200 cursor-crosshair"
        }
        leading-tight md:leading-snug text-clip`}
    >
      <TableCell className="px-">
        {!audioSrc ? (
          // TODO: buscar una mejor forma de hacer esto.
          <VolumeX
            className="text-rose-500"
            width={16}
          /> /* Si no tiene audio.current */
        ) : playing.isPlaying && playing.currentWord?.trim() === text.trim() ? (
          <Volume2
            className="text-emerald-500"
            width={16}
          /> /* Si esta reproduciendo la fila actual */
        ) : (
          <Volume1 width={16} /> /* Si tiene audio y no esta reproduciendo */
        )}
      </TableCell>
      {rowToRender.map((text) => {
        const [textToRender] = text.split("; "); // Quito la url del audio cuando es debido
        return (
          <TableCell key={textToRender} className={`left px-2 md:p-4`}>
            {textToRender}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export { RowPrincipal };
