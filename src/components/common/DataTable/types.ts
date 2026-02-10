export interface column<T> {
    header: string;
    accessor: keyof T;
    render?: (row: T) => React.ReactNode;
}