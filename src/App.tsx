import { columns } from "@/components/climbs/columns";
import { climbs } from "@/utils/climbs";
import { DataTable } from "@/components/climbs/data-table";
import { Weather } from "@/components/weather";
import { Profile } from "@/components/profile";

function App() {
    return (
        <div className="m-8">
            <div className="px-4 flex gap-10 items-center justify-between h-56 rounded-xl shadow-xl bg-neutral-400/25 text-black/75">
                <Profile/>
                <Weather/>
            </div>
            <div className="mt-4">
                <DataTable columns={columns} data={climbs} />
            </div>

        </div>
    )
}

export default App;
