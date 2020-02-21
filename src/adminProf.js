
export function clientList() {

    const json = '{"data": [  {    "Name": "Kotsios", "Surname": "Kotsiou", "id": 123456789, "UserID": 1, "type": 1  }]}';
    const obj = JSON.parse(json);
    var sel = document.getElementById('userList');
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(obj.data[0].Name));
    opt.value = obj.data[0].id;
    sel.appendChild(opt);

    sel = document.getElementById('userList');
    opt = document.createElement('option');
    opt.appendChild(document.createTextNode(obj.data[0].Surname));
    opt.value = obj.data[0].id;
    sel.appendChild(opt);

    sel = document.getElementById('nameInput');
    sel.value = obj.data[0].Name;



}
