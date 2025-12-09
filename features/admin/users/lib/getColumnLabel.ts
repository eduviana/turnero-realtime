import React from "react";

export function getColumnLabel(col: any, table: any) {
  const header = col.columnDef.header;

  if (typeof header === "string") {
    return header;
  }

  // Si el header es una función (ej: las columnas ordenables)
  if (typeof header === "function") {
    const rendered = header({ column: col, table });

    // Muchos headers son <Button>Texto<Icon/>
    // Intentamos extraer solo el texto visible.
    if (React.isValidElement(rendered)) {
      // @ts-ignore
      return rendered.props.children?.[0] ?? col.id;
    }

    return rendered ?? col.id;
  }

  return col.id;
}