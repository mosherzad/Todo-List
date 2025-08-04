import "./App.css";
import ToDoList from "../src/components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Snackbar } from "@mui/material";
import { purple } from "@mui/material/colors";
import { TodosContext } from "./contexts/todosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastProvider } from "./contexts/ToastContext";
const initialTodos = [
  {
    id: uuidv4(),
    title: "قرائة كتب ",
    details: "قبل نهاية الشهر",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "ممارسة كرة القدم ",
    details: "قبل نهاية الشهر",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "الذهاب الى النادي",
    details: "قبل نهاية الشهر",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[600],
      },
      secondary: {
        main: purple[800],
      },
    },
    typography: {
      fontFamily: ["Alexandria"],
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CssBaseline />
        <div style={{ direction: "rtl" }}>
          <TodosContext.Provider value={{ todos, setTodos }}>
            <ToDoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
