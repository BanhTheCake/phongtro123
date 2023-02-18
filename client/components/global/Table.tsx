import React from 'react';
import { useTable } from 'react-table';

interface ITable {
    data: any;
    columns: any[];
}

const Table = ({ data, columns }: ITable) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ data: data, columns: columns });

    return (
        <div className='w-full overflow-x-auto'>
            <table
                {...getTableProps()}
                className="w-full text-sm text-left text-gray-500 border "
            >
                <thead className="text-gray-700 capitalize bg-gray-50 border-b">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="px-6 py-3 whitespace-nowrap"
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="bg-white odd:bg-slate-100 border-b"
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4"
                                        >
                                            <div className='line-clamp-1 max-w-[240px]'>
                                                {cell.render('Cell')}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
