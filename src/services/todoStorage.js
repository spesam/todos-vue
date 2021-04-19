const LOCAL_KEY = "todos";
/**
 * 获取目前所有的任务 
 */
export function fetch() {
    const res = localStorage.getItem(LOCAL_KEY);
    if (res) {
        return JSON.parse(res);
    }
    else {
        return [];
    }
}

/**
 * 保存所有任务
 * @param {*} todos 任务列表
 */
export function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

export function getId() {
    return Date.now() + Math.random().toString(16).slice(2, 6);
}

export function filter(todosList, visibility) {
    if (visibility === "all") {
        return todosList;
    }
    else if (visibility === "active") {
        return todosList.filter(item => !item.isFinish);
    }
    else if (visibility === "completed") {
        return todosList.filter(item => item.isFinish);
    }
    throw new Error("类型不匹配");
}
