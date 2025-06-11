import { columns, Climb } from "./components/climbs/columns";
import { DataTable } from "./components/climbs/data-table";
import { Weather } from "./components/weather";
import { Profile } from "./components/profile";
import { useEffect, useState } from "react";

function App() {
    const [climbs, setClimbs] = useState<Climb[]>([]);

    const handleClimbCreated = (newClimb: Climb) => {
        setClimbs(prev => [...prev, newClimb]);
    }

    useEffect(() => {
        fetch("/climbs")
            .then(res => res.json())
            .then(data => setClimbs(data))
            .catch(err => console.error("Failed to fetch climbs"))
        }, [climbs]);


    return (
        <div className="m-8">
            <div className="px-4 flex gap-10 items-center justify-between h-56 rounded-xl shadow-xl bg-neutral-400/25 text-black/75">
                <Profile/>
                <Weather/>
            </div>
            <div className="mt-4">
                <DataTable columns={columns} data={climbs} onClimbCreated={handleClimbCreated} />
            </div>
        </div>
    )
}

export default App;
