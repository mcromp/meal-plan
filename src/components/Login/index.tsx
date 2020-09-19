import React, { useEffect, useState } from 'react';
const URL = "http://localhost:5000/users/"

const Login = () => {
    const [users, setUsers] = useState<any[]>([])
    const [value, setValue] = useState<any>()


    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })
    }, [])

    const xx = (users.map(user => (
        <option key={user._id} value={user._id}>{user.username}</option>)))

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log((e.target.value))
        setValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(value)
        deleteUser(value)
        setValue("")
        alert("User deleted")
    }

    const addUser = (id: any) => {
        fetch(URL + id, {
            method: 'DELETE',
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }
}

const deleteUser = (id: any) => {
    fetch(URL + id, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => console.log(res))
}
return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label> Select your username:
                    <select value={value} onChange={(e) => handleSelect(e)}>
                    {xx}
                </select>
            </label>
            <input type="submit" value="Submit" />
            <button>delete user</button>
        </form>
    </div>
)
}


const User: React.FC<any> = ({

}) => {
    return (
        <>

        </>
    )
}

export default Login