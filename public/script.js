async function getToDoList(){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    const response = await fetch('/tasks', requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error(body.message);
    }
    return body;   
}

function clickButton(){
    getToDoList().then((body) => {
        let objs = JSON.stringify(body);
        document.body.append(objs);
    }).catch((err) => {
        console.log(err);
    });
}