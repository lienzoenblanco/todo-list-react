import React, { useState } from "react";

import { Input, Checkbox, Select } from "antd";

const Todo = () => {
	const [todoList, setTodoList] = useState([]);
	const [task, setTask] = useState("");

	const handleChange = (event) => {
		setTask(event.target.value);
	};

	const addNewTask = (event) => {
		event.preventDefault();
		if (task.trim().length !== 0) {
			setTodoList([...todoList, task]);
		}
	};

	function onChange(e) {
		console.log(`checked = ${e.target.checked}`);
	}

	return (
		<div className="todo">
			<h1>Todo List</h1>
			<form onSubmit={addNewTask} onChange={handleChange}>
				<span className="input">
					<Input
						name="new-task"
						type="text"
						placeholder="add a task"
					/>
				</span>
				<span className="select">
					{/* <Select defaultValue={normal} onChange={handleChange}>
						<Option value="urgente">Urgente</Option>
						<Option value="importante">Importante</Option>
						<Option value="normal">Normal</Option>
					</Select> */}
				</span>
			</form>
			<ul>
				{todoList.map((taskPrint) => {
					return (
						<li>
							<span className="check">
								<Checkbox onChange={onChange}></Checkbox>
							</span>
							{taskPrint}
						</li>
					);
				})}
			</ul>
			<div className="counters"></div>
		</div>
	);
};
export default Todo;
