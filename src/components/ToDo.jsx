import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

export default function ToDo({ todo, showDelete, showUpdate }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideSnackbar } = useToast();
  function handleCheck() {
    const updateTodo = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    showHideSnackbar("تم التعديل بنجاح");
  }
  function handleShowDelete() {
    showDelete(todo);
  }
  function handleShowUpdate() {
    showUpdate(todo);
  }

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          m: "8px auto",
          direction: "rtl",
        }}
        className="todocard"
      >
        <CardContent
          sx={{
            p: 1,
            "&:last-child": { pb: 1 },
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "1rem",
                    lg: "1.4rem",
                  },
                  fontWeight: 400,
                  mb: "2px",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: "0.7rem",
                    lg: "1.2rem",
                  },
                  color: "text.secondary",
                }}
              >
                {todo.details}
              </Typography>
            </div>

            <div
              style={{
                marginLeft: "4px",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <IconButton
                className="icon-btn check"
                onClick={handleCheck}
                sx={{
                  p: 0.5,
                  backgroundColor: todo.isCompleted ? "primary.main" : "white",
                  color: todo.isCompleted ? "white" : "black",
                  "&:hover": {
                    backgroundColor: todo.isCompleted
                      ? "primary.dark"
                      : "#f0f0f0",
                  },
                }}
              >
                <CheckIcon
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      lg: "1.6rem",
                    },
                  }}
                />
              </IconButton>

              <IconButton
                className="icon-btn edit"
                sx={{ p: 0.5 }}
                onClick={handleShowUpdate}
              >
                <ModeEditOutlinedIcon
                  sx={{ fontSize: { xs: "1rem", lg: "1.6rem" } }}
                />
              </IconButton>

              <IconButton
                className="icon-btn delete"
                sx={{ p: 0.5 }}
                onClick={handleShowDelete}
              >
                <DeleteOutlineIcon
                  sx={{ fontSize: { xs: "1rem", lg: "1.6rem" } }}
                />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
