'use client'

import { useEffect, useState } from "react";

const TableRow = ({ entry, index, id, updateInput, deleteRow }) => {
  return (
    <tr className={`${(index % 2) === 0 ? " bg-neutral-800" : ""}`}>
      <td>{index + 1}</td>
      {Object.keys(entry).map(key =>
        <td key={`${id}-${key}-${index}`}>
          <input className="bg-white/[.15] text-center p-2 w-24" name={`${id}-${key}-${index}`} value={entry[key]} onChange={(e) => updateInput(e)}></input>
        </td>
      )}
      <td><button className="bg-red-600 text-white rounded-lg px-8 p-2 m-2" onClick={() => deleteRow(index)}>-</button></td>
    </tr>
  )
}

export default function Table({ initTable, deleteTable}) {
  const [table, setTable] = useState(initTable);
  const [data, setData] = useState(initTable.data);

  useEffect(() => {
    console.log(data)
  })

  const updateInput = (e) => {
    e.preventDefault()
    const newData = [...data]
    newData[e.target.name.split('-')[2]][e.target.name.split('-')[1]] = e.target.value
    setData(newData)
    // console.log(newData)
  }

  const addNewRow = () => {
    const newData = [...data]
    newData.push(Object.fromEntries(table.columns.map((c) => [c.name, ""])))
    setData(newData)
    console.log(newData)
  }

  const deleteRow = (index) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  return (

    <main className="w-full text-center items-center justify-between my-8 max-w-2xl m-auto">
      <div>
        <div className="text-3xl text-white font-bold inline">{table.name}</div>
        <button className="bg-red-700 rounded p-2 ml-12" onClick={() => deleteTable(table)}>delete</button>
      </div>

      <div className="p-2">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th key="set" className="p-2 px-4">
                <p>Set</p>
              </th>
              {table.columns.map((c) => <th key={c.name}>{c.name}</th>)}
              <th key="delete" className="px-2">
                <p>delete</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) =>
              <TableRow key={`${entry}-${index}`} entry={entry} index={index} id={table.name} updateInput={updateInput} deleteRow={deleteRow} />
            )}
          </tbody>
        </table>
        <button className="w-56 bg-neutral-200 text-black rounded-b-lg p-2" onClick={() => addNewRow()}>Add +</button>
      </div>
    </main>
  );
}
