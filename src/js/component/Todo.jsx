import React, { useState, useEffect } from "react";

import { Input, Checkbox, Select } from "antd";

const Todo = () => {
	const priorities = ["urgente", "importante", "normal"];

	const [taskDoneCounter, setTaskDoneCounter] = useState(0);

	const [taskNormalCounter, setTaskNormalCounter] = useState(0);
	const [taskUrgenteCounter, setTaskUrgenteCounter] = useState(0);
	const [taskImportanteCounter, setTaskImportanteCounter] = useState(0);

	const [todoList, setTodoList] = useState([]);
	const [task, setTask] = useState({
		name: "",
		priority: "importante",
		done: false,
	});
	const [priorityValue, setPriorityValue] = useState();

	useEffect(() => {
		calculateNormalTask();
		calculateUrgenteTask();
		calculateImportanteTask();
	}, [todoList]);

	const calculateDoneTask = () => {
		const todoListDone = todoList.filter((item) => {
			return item.done == true;
		});
		setTaskDoneCounter(todoListDone.length);
	};

	const calculateNormalTask = () => {
		const todoListNormal = todoList.filter((item) => {
			return item.priority == "normal";
		});
		setTaskNormalCounter(todoListNormal.length);
	};

	const calculateUrgenteTask = () => {
		const todoListUrgente = todoList.filter((item) => {
			return item.priority == "urgente";
		});
		setTaskUrgenteCounter(todoListUrgente.length);
	};

	const calculateImportanteTask = () => {
		const todoListImportante = todoList.filter((item) => {
			return item.priority == "importante";
		});
		setTaskImportanteCounter(todoListImportante.length);
	};

	const handleChange = (event) => {
		setTask({ ...task, name: event.target.value });
	};

	const addNewTask = (event) => {
		event.preventDefault();
		if (task.name.trim().length !== 0) {
			setTodoList([...todoList, task]);
		}
	};

	function onChange(e, taskIndex) {
		todoList[taskIndex].done = e.target.checked;
		setTodoList(todoList);
		calculateDoneTask();
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
						autoComplete="off"
					/>
				</span>
				<span className="select">
					{/* <Select defaultValue="normal">
						<Option value="urgente">Urgente</Option>
						<Option value="importante">Importante</Option>
						<Option value="normal">Normal</Option>
					</Select> */}
				</span>
			</form>
			<ul>
				{todoList.map((taskPrint, index) => {
					return (
						<li key={index}>
							<span className="check">
								<Checkbox
									onChange={(event) => {
										onChange(event, index);
									}}></Checkbox>
							</span>
							{taskPrint.name}
							--
							{taskPrint.done == true}
						</li>
					);
				})}
			</ul>
			<div className="counters">
				<ul className="list-group">
					<li className="list-group-item d-flex justify-content-between align-items-center">
						Urgente
						<span className="badge bg-primary rounded-pill">
							{taskUrgenteCounter}
						</span>
					</li>
					<li className="list-group-item d-flex justify-content-between align-items-center">
						Importante
						<span className="badge bg-primary rounded-pill">
							{taskImportanteCounter}
						</span>
					</li>
					<li className="list-group-item d-flex justify-content-between align-items-center">
						Normal
						<span className="badge bg-primary rounded-pill">
							{taskNormalCounter}
						</span>
					</li>
					<li className="list-group-item d-flex justify-content-between align-items-center">
						Hechas
						<span className="badge bg-primary rounded-pill">
							{taskDoneCounter}
						</span>
					</li>
					<li className="list-group-item d-flex justify-content-between align-items-center">
						Total
						<span className="badge bg-primary rounded-pill">
							{todoList.length}
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Todo;
