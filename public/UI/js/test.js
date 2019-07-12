getAll();
function getAll() {
  fetch('http://localhost:5000/api/v1/products', {
    method: 'GET',
    headers: { 'x-access-token': localStorage.getItem('x-access-token') }
  })
    .then(res => res.json())
    .then(data => {
      let output = '';
      var count = 0;
      data.rows.forEach(value => {
        const { id, location, numberofrooms, created_date, price } = value;
        output += `
                 <div class= "container results">
                     <div class="rows">
                    
                    <table  class="table table-bordered">
                    <h1>Order details</h1>
                    <thead>
                    <tr>
                
                 <th scope="col">Location</th>
                 <th scope="col">Rooms</th>
                 <th scope="col">Date</th>
                 <th scope="col">Price</th>
                 <th scope="col">???</th>
                 </tr>
                 </thead>
                 <tr>
            
              <td>${location}</td>
                <td>${numberofrooms}</td>
                <td>${created_date}</td>
               
                <td>${price}</td>
                 <td><button class="delete"  onclick=deleteButton("${id}",${count})><div class="message">Delete</div>
                 </button></td></tr></table>
                 </div>
                 
                 </div> `;
        count++;
      });
      document.querySelector('.result').innerHTML = output;
      console.log(data);
      console.log(count);
    });
}
function deleteButton(id, track) {
  fetch(`http://localhost:5000/api/v1/products/${id}`, {
    method: 'DELETE',
    headers: { 'x-access-token': localStorage.getItem('x-access-token') }
  })
    .then(res => res.json())
    .then(data => {
      var button = document.querySelectorAll('.delete')[track];
      button.style.backgroundColor = 'green';
      document.querySelectorAll('.message')[track].textContent = data.message;
      setTimeout(() => {
        return location.reload();
      }, 1000);
    })

    .catch(e => console.log(e));
}
document.getElementById('logout').addEventListener('click', clear);
function clear() {
  return localStorage.removeItem('x-access-token');
}
