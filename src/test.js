fetch('http://3.82.113.137:6500/receiving_element', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mainText: "What reading events we have there?" })
}).then(res => {return res.json()}).then(file => {console.log(file)})
