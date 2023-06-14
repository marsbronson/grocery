import { useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Input, List, ListItem, Paper, Typography } from "@mui/material";
import styles from "@/styles/Home.module.css";
import { ListItemComponent } from "@/components/listItemComponent/listItemComponent";
import { useGroceryApi } from "@/api/groceryApi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { getGroceryList, addGrocery } = useGroceryApi();
  const [newGroceryItem, setNewGroceryItem] = useState("");

  return (
    <>
      <Head>
        <title>Grocery List</title>
        <meta name="description" content="My Grocery List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>Grocery List</h1>
        <Paper
          elevation={3}
          sx={{ width: "100%", maxWidth: "720px", padding: "16px" }}
        >
          <List>
            <ListItem>
              <Input
                placeholder="Add Item"
                value={newGroceryItem}
                className="input"
                onChange={(e) => setNewGroceryItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addGrocery.mutate({
                      id: Date.now(),
                      title: newGroceryItem,
                      quantity: 1,
                      checked: false,
                    });
                    setNewGroceryItem("");
                    e.preventDefault();
                  }
                }}
              />
            </ListItem>
            {getGroceryList.data?.data.toReversed().map((item: GroceryItem) => (
              <ListItemComponent item={item} key={item.title} />
            ))}
            {getGroceryList.data?.data.length === 0 ? (
              <ListItem>
                <Typography variant="caption">No items in list</Typography>
              </ListItem>
            ) : (
              <ListItem>
                <div className="total">
                  Total: {getGroceryList.data?.data.length}
                </div>
              </ListItem>
            )}
          </List>
        </Paper>
      </main>
    </>
  );
}
