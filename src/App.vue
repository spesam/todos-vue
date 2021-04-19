<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addNewTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="isAllDone"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: item.isFinish,
              editting: item === edittingTodoRef,
            }"
            v-for="item in displayTodoRef"
            :key="item.id"
            @dblclick="onEdit(item)"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.isFinish" />
              <label>{{ item.title }}</label>
              <button class="destroy" @click="remove(item)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="item.title"
              @keyup.enter="onSave(item)"
              @blur="onSave(item)"
              @keyup.esc="onCancel(item)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0">
        <span class="todo-count">
          <strong>{{ unFinishTodoLengthRef }}</strong>
          <span>{{
            unFinishTodoLengthRef > 1 ? "items left" : "item left"
          }}</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="hasFinishTodoLengthRef > 0"
          @click="removeAllFinished"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList.js";
import useNewTodo from "./composition/useNewTodo.js";
import useFilter from "./composition/useFilter.js";
import useEdit from "./composition/useEdit.js";
import useRemove from "./composition/useRemove.js";
export default {
  setup() {
    const { todosRef } = useTodoList();
    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEdit(todosRef),
      ...useRemove(todosRef),
    };
  },
};
</script>
