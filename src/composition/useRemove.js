export default function (todosRef) {
    const remove = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    };
    const removeAllFinished = () => {
        todosRef.value = todosRef.value.filter(item => item.isFinish === false);
    }
    return {
        remove,
        removeAllFinished,
    }
}