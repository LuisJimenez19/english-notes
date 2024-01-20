import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RowPrincipal } from "./RowPrincipal";
import { useState } from "react";
import { Speaker } from "lucide-react";
import { StatePlaying } from "@/types";

interface Props {
  headers: string[];
  rows: string[][];
}



function TablePrincipal({ headers, rows }: Props) {
  /* Identificar cuál es el audio que se esta reproduciedo. */
  const [playing, setPlaying] = useState<StatePlaying>({
    currentWord: undefined,
    isPlaying: false,
  });

  return (
    <Table className="fade-down-min">
      <TableCaption>A list of phrases to practice.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead><Speaker width={16} /></TableHead>
          {headers.map((head, index) => {
            return (
              <TableHead
                key={head}
                className={`${
                  index === headers.length - 1 ? "text-right" : "text-left"
                }`}
              >
                {head}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => {
          return (
            <RowPrincipal
              playing={playing}
              setPlaying={setPlaying}
              key={index}
              index={index}
              row={row}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}

export { TablePrincipal };
