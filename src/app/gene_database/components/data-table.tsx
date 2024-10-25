"use client"

import * as React from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { getSoybeanGeneData } from "@/lib/api/soybean";
import {Card} from "@/components/ui/card";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
}


export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const [tableData, setTableData] = React.useState(data)
  const [tableColumns, setTableColumns] = React.useState(columns)

  const [loading, setLoading] = React.useState(false)

  let table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4 h-16">
        <div className="flex items-center">
          <Label htmlFor="chrom" className="font-bold">染色体：</Label>
          <Input id="chrom" placeholder="7" className="w-24 h-8 mr-8" defaultValue="7"/>

          <Label htmlFor="posStart" className="font-bold">位置：</Label>
          <Input id="posStart" placeholder="6711586" className="w-24 h-8 mr-2" defaultValue="6711586"/>
          <span className="text-2xl mr-2">-</span>
          <Input id="posEnd" placeholder="6713607" className="w-24 h-8 mr-8" defaultValue="6713607"/>
          <Button
            className="h-8 bg-primary text-white space-x-2"
            size="lg"
            onClick={() => {
              setLoading(true);
              let chrom = document.getElementById('chrom') as HTMLInputElement
              let posStart = document.getElementById('posStart') as HTMLInputElement
              let posEnd = document.getElementById('posEnd') as HTMLInputElement

              if (chrom == null || posStart == null || posEnd == null) {
                return
              }

              if (chrom.value == "" || posStart.value == "" || posEnd.value == "") {
                chrom.value = "7"
                posStart.value = "6711586"
                posEnd.value = "6713607"
              }

              getSoybeanGeneData(Number(chrom.value), Number(posStart.value), Number(posEnd.value)).then((res) => {
                // @ts-ignore
                setTableData(res['data']);
                // @ts-ignore
                setTableColumns(res['columns']);
                setLoading(false);
              }).catch((err) => {
                console.log(err);
                setLoading(false);
              });
            }}
          >
            <i className="fa-duotone fa-magnifying-glass"></i>
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <i className="fa-duotone fa-spinner fa-spin text-4xl text-primary"></i>
        </div>
      ) : (
        <div>
          <Label htmlFor="columns" className="font-bold">选择显示的列：</Label>
          <Card className="w-full h-48 flex flex-wrap overflow-x-hidden mb-4 bg-background" id="columns">
            {
              table.getAllColumns().length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  No results.
                </div>
              ) : (
                table
                  .getAllColumns().slice(4, )
                  .filter(
                    (column) => column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <div className="flex items-center" key={column.id}>
                        <Checkbox
                          key={column.id}
                          className="capitalize m-4 mr-1"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: any) =>
                            column.toggleVisibility(value)
                          }
                        >
                        </Checkbox>
                        <label htmlFor={column.id} className="capitalize">{column.id}</label>
                      </div>
                    )
                  })
              )
            }
          </Card>
          <div className="rounded-md flex flex-row">
            <div className="left-0 mr-4 rounded-md border bg-background" style={{width: 'calc(20% - 16px)'}}>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.slice(0, 4).map((header) => {
                        return (
                          <TableHead key={header.id} className="font-bold">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().slice(0, 4).map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="left-0 w-[80%] rounded-md border bg-background">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.slice(4, ).map((header) => {
                        return (
                          <TableHead key={header.id} className="font-bold">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().slice(4, ).map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-10 py-6 h-8">
            <div className="flex items-center text-sm">
              每页最多显示 &nbsp;
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[80px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              &nbsp; 行，共 {tableData.length} 行
            </div>
            <div className="flex items-center text-sm">
              当前在第 {table.getState().pagination.pageIndex + 1} 页，共 {table.getPageCount()} 页
            </div>
            <div className="flex items-center space-x-2">
              <Button
                className="h-8"
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <i className="fa-duotone fa-angles-left"></i>
              </Button>
              <Button
                className="h-8"
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <i className="fa-duotone fa-angle-left"></i>
              </Button>
              <Button
                className="h-8"
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <i className="fa-duotone fa-angle-right"></i>
              </Button>
              <Button
                className="h-8"
                variant="outline"
                size="sm"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <i className="fa-duotone fa-angles-right"></i>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
