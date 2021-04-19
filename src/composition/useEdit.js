import { ref, computed } from "vue";

export default function (todosRef) {
    let originContent;
    const edittingTodoRef = ref(null);
    const onEdit = (todo) => {
        originContent = todo.title;
        edittingTodoRef.value = todo;
    };
    const onSave = (todo) => {
        edittingTodoRef.value = null;
        const title = todo.title.trim();
        if (title) {
            todo.title = title;
        }
        else {
            // 删除
            todosRef.value.splice(todosRef.value.indexOf(todo), 1);
        }
    };
    const onCancel = (todo) => {
        todo.title = originContent;
        edittingTodoRef.value = null;
    };
    const isAllDone = computed({
        get() {
            return todosRef.value.filter(item => item.isFinish === false).length === 0;
        },
        set(checked) {
            todosRef.value.forEach(item => {
                item.isFinish = checked;
            })
        }
    });
    return {
        edittingTodoRef,
        onEdit,
        onSave,
        onCancel,
        isAllDone,
    }
}