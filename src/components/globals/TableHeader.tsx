export default function TableHeader({headers}) {
  const { header1, header2, header3, header4 } = headers;
  
  return (
    <thead className="bg-gray-100 border-b">
      <tr>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">{header1}</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">{header2}</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">{header3}</th>
        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">{header4}</th>
      </tr>
    </thead>
  )
}