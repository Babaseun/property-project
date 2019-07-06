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
        const { id, picture, location, numberofrooms, created_date } = value;
        output += `
                 <div class= "container results">
                     <div class="rows">
                    
                    <table>
                    <h1>Order details</h1>
                    <tr>
                 <th>Picture</th>
                 <th>Location</th>
                 <th>Rooms</th>
                 <th>Date</th>
                 <th>???</th>
                 </tr>
                 <tr>
             <td>${picture}</td>
              <td>${location}</td>
                <td>${numberofrooms}</td>
                <td>${created_date}</td>
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
      setTimeout(function time() {
        return location.reload();
      }, 7000);
    })

    .catch(e => console.log(e));
}
