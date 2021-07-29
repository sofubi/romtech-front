export function handleChange(e) {
  const target = e.target;
  const value = target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

export function request(endpoint, method='GET', token='', body={}) {
  let url = `http://localhost:8000/api/${endpoint}`;
  
  if (method === 'GET') {
    return fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }
  
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body),
  })
}
