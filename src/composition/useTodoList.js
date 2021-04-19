import { ref, watchEffect } from "vue";
import * as todoStorage from "../services/todoStorage.js";
export default function () {
    const todosRef = ref(todoStorage.fetch());
    watchEffect(() => {
        todoStorage.save(todosRef.value);
    });
    return {
        todosRef,
    }
}