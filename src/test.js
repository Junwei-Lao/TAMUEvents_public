fetch('http://127.0.0.1:6500/receiving_element', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mainText: "Please list all the events in categories" })
}).then(res => {return res.json()}).then(file => {console.log(file)})
