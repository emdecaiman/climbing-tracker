import { columns } from "@/components/climbs/columns";
import { climbs } from "@/utils/climbs";
import { DataTable } from "@/components/climbs/data-table";

function App() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Payment Table</h1>
            <DataTable columns={columns} data={climbs} />
        </div>
    )
}

export default App;
