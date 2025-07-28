import React, { useState } from "react";
import './assets/styles/bargraph.css'
import { BarChart } from "./components/Bar";
import { AddDayForm } from "./components/AddDayForm";

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h1 id='activity-breakdown'>Activity Breakdown</h1>
      <AddDayForm onAdd={() => setRefresh(r => r + 1)} />
      <BarChart refresh={refresh} />
    </div>
  );
}

export default App;
