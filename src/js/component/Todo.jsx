import React, { useState, useEffect } from "react";

import { Input, Checkbox, Select, Badge, Button } from "antd";

const Todo = () => {
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

	useEffect(() => {
		calculateNormalTask();
		calculateUrgenteTask();
		calculateImportanteTask();
	}, [todoList]);

	const handleChangePriority = (value) => {
		setTask({ ...task, priority: value });
	};

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
			<div className="add-task">
				<form onSubmit={addNewTask} className="input">
					<span className="input">
						<Input
							onChange={handleChange}
							name="new-task"
							type="text"
							placeholder="añade una tarea"
							autoComplete="off"
						/>
					</span>
				</form>

				<span className="select">
					<Select
						defaultValue="importante"
						onChange={handleChangePriority}>
						<Select.Option value="urgente">Urgente</Select.Option>
						<Select.Option value="importante">
							Importante
						</Select.Option>
						<Select.Option value="normal">Normal</Select.Option>
					</Select>
				</span>
			</div>
			<ul>
				{todoList.map((taskPrint, index) => {
					return (
						<li
							key={index}
							className={`priority-${taskPrint.priority}`}>
							<span className="check">
								<Checkbox
									onChange={(event) => {
										onChange(event, index);
									}}></Checkbox>
							</span>
							{taskPrint.name}
						</li>
					);
				})}
			</ul>
			<div className="counters">
				<Badge count={todoList.length}>
					<Button className={"total"}>Total</Button>
				</Badge>
				<Badge count={taskDoneCounter}>
					<Button className={"hechas"}>Hechas</Button>
				</Badge>
				<Badge count={taskNormalCounter}>
					<Button className={"normal"}>Normal</Button>
				</Badge>
				<Badge count={taskImportanteCounter}>
					<Button className={"importante"}>Importante</Button>
				</Badge>
				<Badge count={taskUrgenteCounter}>
					<Button className={"urgente"}>Urgente</Button>
				</Badge>
			</div>
		</div>
	);
};
export default Todo;
