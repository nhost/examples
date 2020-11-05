import React, { useState } from "react";
import gql from "graphql-tag";
import { useSubscription, useMutation } from "@apollo/client";

const INSERT_ITEM = gql`
  mutation insertItem($item: items_insert_input!) {
    insert_items_one(object: $item) {
      id
    }
  }
`;

const GET_ITEMS = gql`
  subscription getItems {
    items {
      id
      name
    }
  }
`;

function AddItem() {
  const [name, setName] = useState("");
  const [insertItem] = useMutation(INSERT_ITEM);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await insertItem({
        variables: {
          item: {
            name,
          },
        },
      });
    } catch (error) {
      console.error(error);
      return alert("Failed adding item");
    }

    setName("");
    alert("Item added");
  }

  return (
    <div>
      <div>Add item</div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add item</button>
        </div>
      </form>
    </div>
  );
}

function ListItems() {
  const { loading, error, data } = useSubscription(GET_ITEMS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading items</div>;
  }

  const { items } = data;

  return (
    <div>
      {items.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}

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
