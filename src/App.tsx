import { columns } from "@/components/climbs/columns";
import { climbs } from "@/utils/climbs";
import { DataTable } from "@/components/climbs/data-table";
import { Weather } from "@/components/weather";

function App() {
    return (
        <>
            <div className="p-4 flex justify-center items-center">
                <Weather/>
            </div>
            <div className="p-4">
                <DataTable columns={columns} data={climbs} />
            </div>

        </>
    )
}

export default App;
