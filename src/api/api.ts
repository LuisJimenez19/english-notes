import { URL_API } from "../config";
import { ResApuntes } from "../types";

export async function fetchData(): Promise<ResApuntes> {

  /* No queremos renderizar la columna de categorias, pero si necesitamos que las filas conozcan su categría para filtar después */
  const res = await fetch(URL_API);
  const data = await res.text();
  const [headers, ...rows] = data.split("\n");


  const dataHeaders = headers.split("\t"); 
  const dataRows = rows.map((row) => row.split("\t"));

  /* Response to render  */
  // ?INFO: get categories to filter
  const categories = dataRows.reduce((categories, row) => {
    const category = row[row.length - 1].split(";").map((c) => c.trim()).filter((c)=> c !== "audio"); // es la última columna
    return Array.from(new Set(categories.concat(category)));
  }, []);

  return { headers: dataHeaders, rows: dataRows, categories };
}
