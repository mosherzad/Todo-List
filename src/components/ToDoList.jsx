import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ToDoList() {
  const [open, setOpen] = useState(false);
  const [textField, setTextField] = useState("");
  const { todos, setTodos } = useContext(TodosContext);
  const [todoType, setTodoType] = useState("all");

  const completedTode = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTode = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todoToBeRendered = todos;

  if (todoType == "completed") {
    todoToBeRendered = completedTode;
  } else if (todoType == "non-completed") {
    todoToBeRendered = notCompletedTode;
  } else {
    todoToBeRendered = todos;
  }
  const todoElement = todoToBeRendered.map((todo) => {
    return <ToDo key={todo.id} todo={todo} />;
  });
  useEffect(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(localStorageTodos);
  }, []);
  function handleValueOfTextField() {
    const newTodo = {
      id: uuidv4(),
      title: textField,
      details: "",
      isCompleted: false,
    };
    if (textField === "") {
      setOpen(true);
    } else {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTextField("");
    }
  }
  function handleClose() {
    setOpen(false);
  }

  function changeTodoType(e) {
    setTodoType(e.target.value);
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 2,
        px: { xs: 1, sm: 2 },
        "&.MuiContainer-root": {
          "@media (max-width: 600px)": {
            paddingLeft: "12px",
            paddingRight: "12px",
          },
        },
      }}
    >
      <Dialog
        onClick={handleClose}
        open={open}
        style={{ direction: "rtl" }}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 300,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: "0.9rem" }}>
          {"يرجى كتابة شيئاََ"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "0.75rem" }}
          >
            لا يمكنك ترك هذا الحقل فارغاََ
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: "0.75rem" }}>حسناََ</Button>
        </DialogActions>
      </Dialog>

      <Card
        sx={{
          width: "100%",
          maxWidth: "400",
          margin: "0 auto",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontSize: "1.1rem", fontWeight: 500 }}>
            مهامي
          </Typography>

          <Grid container spacing={1} sx={{ mt: 3 }} wrap="nowrap">
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value={textField}
                fullWidth
                onChange={(e) => setTextField(e.target.value)}
                id="outlined-basic"
                label=" عنوان المهمة "
                variant="outlined"
                size="small"
                InputProps={{
                  style: { fontSize: "13px" },
                }}
                InputLabelProps={{
                  style: { fontSize: "10px" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderWidth: "1px" },
                    "&:hover fieldset": { borderWidth: "1px" },
                    "&.Mui-focused fieldset": { borderWidth: "1px" },
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                size="small"
                onClick={handleValueOfTextField}
                fullWidth
                sx={{
                  height: "100%",
                  fontSize: "10px",
                  whiteSpace: "nowrap", // prevents text wrapping
                  minWidth: "fit-content", // ensures it fits nicely
                }}
              >
                أضافة
                <AddOutlinedIcon sx={{ fontSize: "17px", ml: 0.5 }} />
              </Button>
            </Grid>
          </Grid>

          <ToggleButtonGroup
            value={todoType}
            exclusive
            color="primary"
            onChange={changeTodoType}
            fullWidth
            size="small"
            sx={{
              mt: 2,
              direction: "ltr",
              "& .MuiToggleButton-root": {
                minHeight: "30px",
                fontSize: "0.65rem",
                px: "6px",
              },
            }}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {todoElement}
        </CardContent>
      </Card>
    </Container>
  );
}
