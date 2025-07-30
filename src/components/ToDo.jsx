import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [inputUpdate, setUpdateInput] = useState({
    titleInput: todo.title,
    detailInput: todo.details,
  });

  function handleCheck() {
    const updateTodo = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  }
  function handleShowDelete() {
    if (openDelete === false) {
      setOpenDelete(true);
    }
  }
  function handleShowUpdate() {
    setOpenUpdate(true);
  }
  function handleCloseDelete() {
    setOpenDelete(false);
  }
  function handleCloseUpdate() {
    setOpenUpdate(false);
  }
  function handleDeleteTodo() {
    const updateTodo = todos.filter((t) => {
      return todo.id != t.id;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  }
  function handleUpdateTodo() {
    const updateTodo = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: inputUpdate.titleInput,
          details: inputUpdate.detailInput,
        };
      } else {
        return t;
      }
    });
    setTodos(updateTodo);
    setOpenUpdate(false);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  }

  return (
    <>
      <Dialog
        onClick={handleCloseDelete}
        open={openDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
        PaperProps={{
          style: {
            width: "300px",
            maxWidth: "90%",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" fontSize={"small"}>
          {"هل انت متأكد من رغبتك لحذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "10px" }}
          >
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: "10px" }}>أغلاق</Button>
          <Button onClick={handleDeleteTodo} sx={{ fontSize: "10px" }}>
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        PaperProps={{
          style: {
            width: "300px",
            maxWidth: "90%",
          },
        }}
        style={{ direction: "rtl" }}
      >
        <DialogTitle sx={{ fontSize: "15px" }}>تعديل المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "10px" }}></DialogContentText>
          <form>
            <TextField
              autoFocus
              value={inputUpdate.titleInput}
              margin="dense"
              id="name"
              name="text"
              label="عنوان المهمة"
              type="texl"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setUpdateInput({ ...inputUpdate, titleInput: e.target.value });
              }}
              InputProps={{
                style: {
                  fontSize: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "10px",
                },
              }}
            />
            <TextField
              value={inputUpdate.detailInput}
              autoFocus
              margin="dense"
              id="name"
              name="text"
              label="ألتفاصيل"
              type="texl"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setUpdateInput({ ...inputUpdate, detailInput: e.target.value });
              }}
              InputProps={{
                style: {
                  fontSize: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "10px",
                },
              }}
            />
            <DialogActions
              style={{ marginLeft: "-23px", marginBottom: "-13px" }}
            >
              <Button onClick={handleCloseUpdate} sx={{ fontSize: "10px" }}>
                أغلاق
              </Button>
              <Button sx={{ fontSize: "10px" }} onClick={handleUpdateTodo}>
                تأكيد
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Card
        sx={{
          width: "100%",
          maxWidth: 360,
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
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  mb: "2px",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.65rem", color: "text.secondary" }}
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
                <CheckIcon sx={{ fontSize: "1rem" }} />
              </IconButton>

              <IconButton
                className="icon-btn edit"
                sx={{ p: 0.5 }}
                onClick={handleShowUpdate}
              >
                <ModeEditOutlinedIcon sx={{ fontSize: "1rem" }} />
              </IconButton>

              <IconButton
                className="icon-btn delete"
                sx={{ p: 0.5 }}
                onClick={handleShowDelete}
              >
                <DeleteOutlineIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
