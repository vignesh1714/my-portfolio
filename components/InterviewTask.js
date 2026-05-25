"use client";

import { useEffect, useState } from "react";

const userDataJson = [
  {
    user_id: "583c3ac3f38e84297c002546",
    email: "test@test.com",
    name: "test@test.com",
    given_name: "Hello",
    family_name: "Test",
    nickname: "test",
    last_ip: "94.121.163.63",
    logins_count: 15,
    created_at: "2016-11-28T14:10:11.338Z",
    updated_at: "2016-12-02T01:17:29.310Z",
    last_login: "2016-12-02T01:17:29.310Z",
    email_verified: true,
  },
  {
    user_id: "583c5484cb79a5fe593425a9",
    email: "test1@test.com",
    name: "test1@test.com",
    given_name: "Hello1",
    family_name: "Test1",
    nickname: "test1",
    last_ip: "94.121.168.53",
    logins_count: 1,
    created_at: "2016-11-28T16:00:04.209Z",
    updated_at: "2016-11-28T16:00:47.203Z",
    last_login: "2016-11-28T16:00:47.203Z",
    email_verified: true,
  },
  {
    user_id: "583c57672c7686377d2f66c9",
    email: "aaa@aaa.com",
    name: "aaa@aaa.com",
    given_name: "John",
    family_name: "Dough",
    nickname: "aaa",
    last_ip: "94.121.168.53",
    logins_count: 2,
    created_at: "2016-11-28T16:12:23.777Z",
    updated_at: "2016-11-28T16:12:52.353Z",
    last_login: "2016-11-28T16:12:52.353Z",
    email_verified: true,
  },
  {
    user_id: "5840b954da0529cd293d76fe",
    email: "a@a.com",
    name: "a@a.com",
    given_name: "Jane",
    family_name: "Dough",
    nickname: "a",
    last_ip: "94.121.163.63",
    logins_count: 3,
    created_at: "2016-12-01T23:59:16.473Z",
    updated_at: "2016-12-01T23:59:53.474Z",
    last_login: "2016-12-01T23:59:53.474Z",
    email_verified: true,
  },
  {
    user_id: "584a9d13e808bcf75f05f580",
    email: "test9999@test.com",
    given_name: "Dummy",
    family_name: "User",
    created_at: "2016-12-09T12:01:23.787Z",
    updated_at: "2016-12-09T12:01:23.787Z",
    email_verified: false,
  },
];

const styles = {
  main: {
    padding: "20px",
  },
  title: {
    color: "#5C6AC4",
  },
};

const arr1 = [1, [2, 3, [4, 5]], 6];

function flattenArr(arrData) {
  let result = [];
  for (const item of arrData) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArr(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

function sumOfArray(num) {
  let result;
  return {
    count() {
      return (result = num + 1);
    },
    getValue() {
      return result;
    },
  };
}

export default function InterviewTask() {
  const [count, setCount] = useState(0);
  const [textValue, setValue] = useState("");
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState("");
  const [flatteredArray, setFlatteredArray] = useState("");

  const filteredUserData = userDataJson.filter((item) => item.name?.includes(search));

  const createItem = () => {
    if (!textValue.trim()) return;
    setTask([...task, { id: Date.now(), title: textValue, completed: false }]);
    setValue("");
  };

  const deleteItem = (itemId) => {
    setTask(task.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    console.log("Sum of Array: ", sumOfArray(2).count());
    console.log("Value of Array: ", sumOfArray(3).getValue());
    setFlatteredArray(flattenArr(arr1));
  }, []);

  return (
    <div>
      <h1>Task</h1>
      <h2>Flattered Array: {JSON.stringify(flatteredArray)}</h2>
      <div style={styles.main}>
        <h1 style={styles.title}>Todo List!</h1>
        <input
          type="text"
          className="todo-create"
          onChange={(e) => setValue(e.target.value)}
          value={textValue}
        />
        <button type="button" onClick={createItem}>
          Add
        </button>
        {task.length > 0 &&
          task.map((item) => (
            <div key={item.id}>
              <input type="checkbox" className="todo-checkbox" />
              <label className="todo-label"> {item.title} </label>
              <button type="button" onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </div>
          ))}
        <br />
        <br />
        <br />
        <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} />
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Nickname</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserData.map((item) => (
              <tr key={item.user_id}>
                <td>{item.user_id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.nickname ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button type="button" onClick={() => setCount((c) => c + 1)}>
            count {count}
          </button>
        </div>
      </div>
    </div>
  );
}
