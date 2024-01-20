import { ChangeEvent, useEffect, useRef, useState } from "react";

import { fetchData } from "../api/api";

import { TablePrincipal } from "./TablePrincipal";
import { SkeletonCardMain } from "./SkeletonCardMain";
import { WORD_TO_FILTER_CATEGORY } from "@/constants";

function CardMain() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const rowsInitial = useRef<string[][]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  const [filterToCategory, setFilterToCategory] = useState<string>(
    WORD_TO_FILTER_CATEGORY.all
  );

  const [withAudio, setWithAudio] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // setLoading(true);
    fetchData()
      .then((res) => {
        setHeaders(res.headers.slice(0, 3)); // no necesitamos la categoria
        setRows(res.rows); // necesitamos que cada row conozca a que catregría pertenece.
        rowsInitial.current = res.rows;
        setCategories(res.categories);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleChageFilter(e: ChangeEvent<HTMLSelectElement>) {
    setFilterToCategory(e.target.value.toLowerCase());
  }

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    setWithAudio(e.target.checked);
  }

  useEffect(() => {
    if (filterToCategory === WORD_TO_FILTER_CATEGORY.all && !withAudio)
      return setRows(rowsInitial.current);

    const rowsFiltered = rowsInitial.current.filter((row) => {
      if (withAudio && filterToCategory !== WORD_TO_FILTER_CATEGORY.all) {
        return row[3].includes(filterToCategory) && row[3].includes("audio");
      }

      if (withAudio) {
        return row[3].includes("audio");
      }

      return row[3].includes(filterToCategory);
    });

    setRows(rowsFiltered);
  }, [filterToCategory, withAudio]);

  return (
    <div className="md:w-11/12 mx-auto  relative max-w-4xl md:-mt-10 bg-zinc-300/70 dark:bg-zinc-900/70 min-h-40 md:p-5 p-2 pt-0 md:rounded-md shadow-lg  max-h-[80vh] md:max-h-[60vh] overflow-auto">
      {loading ? (
        <SkeletonCardMain />
      ) : (
        <article className="h-full w-full flex flex-col gap-3 md:flex-row relative">
          <aside className="md:min-w-52 sticky top-0 z-10 backdrop-blur-sm p-2 md:bg-transparent ">
            <div className="sticky top-0 flex  justify-between flex-col  gap-3 ">
              {/* Count rows */}
              <span className="dark:text-gray-400 ">
                Found Phrases {rows.length}
              </span>

              {/* Filter */}
              <div className="flex justify-between items-end md:flex-col md:items-start md:gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs dark:text-gray-400">
                    Filter by category
                  </span>
                  <select
                    onChange={handleChageFilter}
                    className="dark:bg-black w-[200px] flex-grow  p-2  rounded-lg select-none"
                  >
                    <option
                      defaultChecked
                      value={WORD_TO_FILTER_CATEGORY.all}
                      className="opacity-75 bg-zin-900"
                    >
                      All
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    className=""
                    onChange={handleCheck}
                    type="checkbox"
                    name="audio"
                    id="with-audio"
                  />
                  <label htmlFor="with-audio">With Audio</label>
                </div>
              </div>
            </div>
          </aside>

          <TablePrincipal headers={headers} rows={rows} />
        </article>
      )}
    </div>
  );
}

export { CardMain };

/* <table className="w-full relative divide-y-8 divide-transparent">
        <thead className="text-xs md:text-base w-full">
          <tr className="">
            <th>#</th>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-xs md:text-sm divide-transparent divide-y-[3em] ">
          {rows.map((row, index) => (
            <tr className="hover:bg-zinc-500/50 " key={index}>
             
              <td className="text-center">{index + 1}</td>
              {row.map((cell, index) => (
               

                <td
                  key={`${index}-${cell}`}
                  className={`${
                    index === row.length - 1 ? "text-right" : "text-center"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */
