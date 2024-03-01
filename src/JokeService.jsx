
export const postJoke = (newJoke) => {
    const transientState = {
        "text" : newJoke,
        "told" : false
    }
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }

    const response = fetch("http://localhost:8089/jokes", postOptions)
    
}

export const getAllJokes = () => {
    return fetch ("http://localhost:8089/jokes").then((response) => response.json())
}

export const updateJokeStatus = (editedJoke) => {
    editedJoke.told = !editedJoke.told
    const putOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedJoke),
    }
    const response = fetch(`http://localhost:8089/jokes/${editedJoke.id}`, putOptions)
}

export const deleteJoke = (deletedJoke) => {

    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deletedJoke)
    }
    const response = fetch(`http://localhost:8089/jokes/${deletedJoke.id}`, deleteOptions)
}

