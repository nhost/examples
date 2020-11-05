import React from "react";

import { AddItem } from "components/add-item";
import { ListItems } from "components/list-items";

export function Dashboard() {
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div>
        <AddItem />
      </div>
      <div>
        <ListItems />
      </div>
    </div>
  );
}
