import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState, useContext, useEffect, useMemo } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ToDoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [open, setOpen] = useState(false);
  const [textField, setTextField] = useState("");
  const { showHideSnackbar } = useToast();
  const [todoType, setTodoType] = useState("all");
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);

  const completedTode = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTode = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todoToBeRendered = todos;

  if (todoType == "completed") {
    todoToBeRendered = completedTode;
  } else if (todoType == "non-completed") {
    todoToBeRendered = notCompletedTode;
  } else {
    todoToBeRendered = todos;
  }

  useEffect(() => {
    const localStorageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(localStorageTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      showHideSnackbar("تمت الأضافة بنجاح");
    }
  }
  function handleClose() {
    setOpen(false);
  }

  function changeTodoType(e) {
    setTodoType(e.target.value);
  }
  function handleCloseDelete() {
    setOpenDelete(false);
  }
  function handleShowDelete(todo) {
    if (openDelete === false) {
      setDialogTodo(todo);
      setOpenDelete(true);
    }
  }

  function handleShowUpdate(todo) {
    setDialogTodo(todo);
    setOpenUpdate(true);
  }
  function handleDeleteTodo() {
    const updateTodo = todos.filter((t) => {
      return t.id != dialogTodo.id;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    showHideSnackbar("تم الحذف بنجاح");
  }
  function handleCloseUpdate() {
    setOpenUpdate(false);
  }

  function handleUpdateTodo() {
    const updateTodo = todos.map((t) => {
      if (t.id == dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          details: dialogTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updateTodo);
    setOpenUpdate(false);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    showHideSnackbar("تم التحديث بنجاح");
  }

  const todoElement = todoToBeRendered.map((todo) => {
    return (
      <ToDo
        key={todo.id}
        todo={todo}
        showDelete={handleShowDelete}
        showUpdate={handleShowUpdate}
      />
    );
  });

  return (
    <>
      <Dialog
        onClick={handleCloseDelete}
        open={openDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
        sx={{ width: { sx: "300px", lg: "600px" }, margin: "auto" }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: { sm: "20px", lg: "30px" } }}
        >
          {"هل انت متأكد من رغبتك لحذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: { sm: "10px", lg: "22px" } }}
          >
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ fontSize: { sm: "10px", lg: "20px" } }}>أغلاق</Button>
          <Button
            onClick={handleDeleteTodo}
            sx={{ fontSize: { sm: "10px", lg: "20px" } }}
          >
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        sx={{ width: { sx: "300px", lg: "600px" }, margin: "auto" }}
        style={{ direction: "rtl" }}
      >
        <DialogTitle sx={{ fontSize: { sm: "20px", lg: "30px" } }}>
          تعديل المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "10px" }}></DialogContentText>
          <form>
            <TextField
              value={dialogTodo?.title || ""}
              margin="dense"
              id="name"
              name="text"
              label="عنوان المهمة"
              type="texl"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDialogTodo({ ...dialogTodo, title: e.target.value });
              }}
              InputProps={{
                style: {
                  fontSize: "20px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "13px",
                },
              }}
            />
            <TextField
              value={dialogTodo?.details || ""}
              margin="dense"
              id="name"
              name="text"
              label="ألتفاصيل"
              type="texl"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDialogTodo({ ...dialogTodo, details: e.target.value });
              }}
              InputProps={{
                style: {
                  fontSize: "20px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: "13px",
                },
              }}
            />
            <DialogActions
              style={{ marginLeft: "-23px", marginBottom: "-13px" }}
            >
              <Button
                onClick={handleCloseUpdate}
                sx={{ fontSize: { sm: "10px", lg: "20px" } }}
              >
                أغلاق
              </Button>
              <Button
                onClick={handleUpdateTodo}
                sx={{ fontSize: { sm: "10px", lg: "20px" } }}
              >
                تأكيد
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Container
        sx={{
          mt: 2,
          px: { xs: 1, sm: 2 },
          width: "100%",
          "@media (max-width:599px)": {
            width: "90vw",
            transform: "translateX(-15px)",
          },

          "@media (min-width:1200px)": {
            width: "600px",
          },
          "@media (min-width:1536px)": {
            width: "700px",
          },
        }}
      >
        <Dialog
          onClick={handleClose}
          open={open}
          style={{ direction: "rtl" }}
          sx={{ width: { sx: "300px", lg: "600px" }, margin: "auto" }}
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontSize: { sm: "20px", lg: "30px" } }}
          >
            {"يرجى كتابة شيئاََ"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontSize: { sm: "10px", lg: "22px" } }}
            >
              لا يمكنك ترك هذا الحقل فارغاََ
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ fontSize: { sm: "10px", lg: "20px" } }}>
              حسناََ
            </Button>
          </DialogActions>
        </Dialog>

        <Card
          sx={{
            width: "100%",
            maxWidth: "550px",
            margin: "0 auto",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                fontSize: {
                  xs: "1.9rem",
                  lg: "2.7rem",
                },
                fontWeight: 500,
              }}
            >
              مهامي
            </Typography>

            <Grid container spacing={1} sx={{ mt: 4 }} wrap="nowrap">
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
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
                    style: {
                      fontSize: "20px",
                    },
                  }}
                  InputLabelProps={{
                    style: { fontSize: "20px" },
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
                  width: "30%",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleValueOfTextField}
                  fullWidth
                  sx={{
                    fontSize: { sx: "0.7rem", lg: "1.2rem" },
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  أضافة
                  <AddOutlinedIcon
                    sx={{
                      fontSize: {
                        xs: "23px",
                        lg: "30px",
                      },
                    }}
                  />
                </Button>
              </Grid>
            </Grid>

            <ToggleButtonGroup
              value={todoType}
              exclusive
              color="primary"
              onChange={changeTodoType}
              size="small"
              sx={{
                mt: 3,
                mb: 3,
                direction: "ltr",
                "& .MuiToggleButton-root": {
                  minHeight: "30px",
                  fontSize: { sx: "0.7rem", lg: "1rem" },
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
    </>
  );
}
