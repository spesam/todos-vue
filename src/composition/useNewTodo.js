import { ref } from "vue";
import { getId } from "../services/todoStorage.js"

export default function (todoRef) {
    const newTodoRef = ref("");
    const addNewTodo = () => {
        const content = newTodoRef.value && newTodoRef.value.trim();
        if (content) {
            // 文本框有值，新增一个Todo
            const newTodo = {
                id: getId(),
                title: content,
                isFinish: false,
            }
            todoRef.value.push(newTodo);
            newTodoRef.value = "";
        }
        else {
            return;
        }
    }
    return {
        newTodoRef,
        addNewTodo
    }
}