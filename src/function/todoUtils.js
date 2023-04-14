import API from "../api/axios";

const access_token = JSON.parse(localStorage.getItem("active_user"))?.jwt;

export const fetchData = async (setUpdateState, setTodoState) => {
    try {
        const res = await API.get('/todos', {
            headers: {"Authorization": `Bearer ${access_token}`},
        });
        console.log('get: ', res.data);
        setUpdateState(new Array(res.data.length).fill(false));
        setTodoState(res.data);
    } catch (err) {
        console.error(err);
    }
};

export const onCreateHandler = async function(e) {
    try {
        const res = await API.post("/todos",
            {
                todo: e.target.newinput.value,
            },
            {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                },
            }
        );
        console.log('create: ', res);
    } catch (err) {
        console.error(err);
    }
};

export const onCheckHandler = async function(e, data, todoState, setTodoState) {
    e.preventDefault();
    const isCompleted = e.target.checked;
    console.log('todocheck: ', isCompleted);
    try {
        const res = await API.put(`/todos/${data.id}`, 
            {
                todo: data.todo,
                isCompleted: isCompleted,
            },
            {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            }
        );
        console.log('update: ', res);
        setTodoState(todoState.map(todo => {
            if (todo.id === data.id) {
              return {
                ...todo,
                isCompleted: isCompleted
              }
            }
            return todo;
        }));
    } catch (err) {
        console.error(err);
    }
};

export const onUpdateHandler = async function (e, data) {
    e.preventDefault();
    try {
        const res = await API.put(`/todos/${data.id}`, 
            {
                todo: data.todo,
                isCompleted: data.isCompleted,
            },
            {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            }
        )
    } catch (err) {
        console.error(err);
    }
}

export const onDeleteHandler = async function(e, data, refetchState, setRefetchState) {
    e.preventDefault();
    try {
        const res = await API.delete(`/todos/${data.id}`, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
            }
        })
        setRefetchState(!refetchState);
        console.log('delete', res);
    } catch (err) {
        console.error(err);
    }
};

export const dataRefetchControl = function (e, i, update, updateState, setUpdateState, refetchState, setRefetchState) {
    e.preventDefault();
    if (!update) setRefetchState(!refetchState);
    let copy = [...updateState];
    copy[i] = !copy[i];
    setUpdateState(copy);
};

export const dataModifyControl = function (e, data, todoState, setTodoState) {
    e.preventDefault();
    setTodoState(todoState.map(todo => {
        if(todo.id === data.id) {
            return {
                ...todo,
                todo: e.target.value
            }
        }
        return todo;
    }));
};