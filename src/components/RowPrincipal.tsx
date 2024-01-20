import { StatePlaying } from "@/types";
import { TableCell, TableRow } from "./ui/table";
import { Volume1, Volume2, VolumeX } from "lucide-react";

interface Props {
  row: string[];
  index?: number;
  playing: StatePlaying;
  setPlaying: ({ isPlaying, currentWord }: StatePlaying) => void;
}
function RowPrincipal({ playing, setPlaying, row }: Props) {
  const [text, audioSrc] = row[1].split(",");

  const rowToRender = row.slice(0, 3); // quito la última columna (categories)

  function handleClick() {
    if (playing.isPlaying) return;

    if (audioSrc) {
      setPlaying({
        currentWord: text.trim(),
        isPlaying: true,
      });

      const audio = new Audio(audioSrc);
      audio.volume = 0.7;
      audio.play();

      audio.onended = () => {
        setPlaying({
          currentWord: undefined,
          isPlaying: false,
        });
        audio.remove();
      };
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
          "dark:bg-zinc-500 bg-zinc-200"
        }
      `}
    >
      <TableCell>
        {!audioSrc ? (
          // TODO: buscar una mejor forma de hacer esto.
          <VolumeX
            className="text-rose-500"
            width={16}
          /> /* Si no tiene audio */
        ) : playing.isPlaying && playing.currentWord?.trim() === text.trim() ? (
          <Volume2
            className="text-emerald-500"
            width={16}
          /> /* Si esta reproduciendo la fila actual */
        ) : (
          <Volume1 width={16} /> /* Si tiene audio y no esta reproduciendo */
        )}
      </TableCell>
      {rowToRender.map((text, index) => {
        const [textToRender] = text.split(", "); // Quito la url del audio cuando es debido
        return (
          <TableCell
            key={textToRender}
            className={`${index === rowToRender.length - 1 && "text-right"}`}
          >
            {textToRender}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export { RowPrincipal };
