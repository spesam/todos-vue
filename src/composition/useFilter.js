import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../services/todoStorage.js";

const allHash = ["all", "active", "completed"];

export default function (todosRef) {
    const visibilityRef = ref("all");
    const handHashChange = () => {
        let hash = location.hash.replace(/#\/?/, "");
        if (allHash.includes(hash)) {
            visibilityRef.value = hash;
        }
        else {
            location.hash = "";
            visibilityRef.value = "all";
        }
    };
    onMounted(() => {
        addEventListener("hashchange", handHashChange);
    });
    onUnmounted(() => {
        removeEventListener("hashchange", handHashChange);
    });

    const displayTodoRef = computed(() => {
        const res = filter(todosRef.value, visibilityRef.value);
        return res;
    })

    // const displayTodoLengthRef = computed(() => {
    //     return displayTodoRef.value.length;
    // })

    const unFinishTodoLengthRef = computed(() => {
        return filter(todosRef.value, "active").length;
    })
    const hasFinishTodoLengthRef = computed(() => {
        return filter(todosRef.value, "completed").length;
    })

    return {
        visibilityRef,
        displayTodoRef,
        unFinishTodoLengthRef,
        hasFinishTodoLengthRef,
    };
}