import { Table } from "@chakra-ui/react";
//  {name:string,price:string}[]
export type RenderType<T> = {
  [key: string]: {
    columnHeaderRender?: (key: string) => React.ReactNode;
    renderColumn?: (item: T, action: unknown) => React.ReactNode;
  };
};

type Propstype<T> = {
  data: T[];
  render: RenderType<T>;
  actions?: { [key: string]: any };
  columns?: string[];
  onRowClick?: (rowData: T) => void;
};

const DataTable = <T extends { id: number }>(props: Propstype<T>) => {
  const { data, render, actions, columns, onRowClick } = props;
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns?.map((colKey) => {
            const columnHeaderRender = render[colKey]?.["columnHeaderRender"];
            return (
              <Table.ColumnHeader textAlign="center" key={colKey}>
                {columnHeaderRender ? columnHeaderRender(colKey) : colKey}
              </Table.ColumnHeader>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => (
          <Table.Row
            key={item.id}
            onClick={() => onRowClick && onRowClick(item)}
          >
            {columns?.map((colKey) => {
              const renderFunc = render[colKey]?.["renderColumn"];
              return (
                <Table.Cell key={colKey}>
                  {renderFunc
                    ? renderFunc(item, actions)
                    : String((item as any)[colKey] ?? "")}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default DataTable;
