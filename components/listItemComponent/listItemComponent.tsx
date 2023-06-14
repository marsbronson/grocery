import { useState } from "react";
import { ListItem, Checkbox, Input, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useGroceryApi } from "@/api/groceryApi";

interface ListItemProps {
  item: GroceryItem;
}

export const ListItemComponent = ({ item }: ListItemProps) => {
  const { updateGrocery, deleteGrocery } = useGroceryApi();

  const [groceryTitle, setGroceryTitle] = useState(item.title);
  const [groceryQuantity, setGroceryQuantity] = useState(item.quantity);

  return (
    <>
      <ListItem
        key={item.title}
        className={`list-item ${item.checked ? "checked" : ""}`}
      >
        <Checkbox
          checked={item.checked}
          onChange={(e) => {
            updateGrocery.mutate({
              ...item,
              checked: e.target.checked,
            });
          }}
        />
        <Input
          value={groceryTitle}
          disabled={item.checked}
          className="input input-title"
          onChange={(e) => {
            setGroceryTitle(e.target.value);
          }}
          onBlur={() => {
            updateGrocery.mutate({
              ...item,
              title: groceryTitle,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateGrocery.mutate({
                ...item,
                title: groceryTitle,
              });
            }
          }}
        />
        <Input
          type="number"
          inputProps={{ min: 1 }}
          value={groceryQuantity}
          disabled={item.checked}
          className="input input-quantity"
          onChange={(e) => {
            setGroceryQuantity(parseInt(e.target.value));
          }}
          onBlur={() => {
            updateGrocery.mutate({
              ...item,
              quantity: groceryQuantity,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateGrocery.mutate({
                ...item,
                quantity: groceryQuantity,
              });
            }
            if (e.key === "ArrowUp") {
              updateGrocery.mutate({
                ...item,
                quantity: groceryQuantity + 1,
              });
            }
            if (e.key === "ArrowDown") {
              updateGrocery.mutate({
                ...item,
                quantity: groceryQuantity - 1,
              });
            }
          }}
        />
        <IconButton
          aria-label="delete"
          color="error"
          className="delete"
          onClick={() => deleteGrocery.mutate(item)}
        >
          <Delete />
        </IconButton>
      </ListItem>
    </>
  );
};
