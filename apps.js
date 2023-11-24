var firebaseConfig = {
  apiKey: "AIzaSyCtXnp0jDdajqVXN5wFs1_tEkpltJukHpo",
  authDomain: "todo-app-15984.firebaseapp.com",
  databaseURL: "https://todo-app-15984-default-rtdb.firebaseio.com",
  projectId: "todo-app-15984",
  storageBucket: "todo-app-15984.appspot.com",
  messagingSenderId: "951157372896",
  appId: "1:951157372896:web:00a20d8c09d29936d0dd85"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

firebase.database().ref("todo-list").on("child_added",(data)=> {
  // console.log(data.val());

  
     var list = document.createElement("li");
    // console.log(list);
    
     var liItem = document.createTextNode(data.val().value);
    //  console.log(liItem);
    
     list.appendChild(liItem);
    
    //  --------------DeleteButton--------------
    
    var dBtn = document.createElement("button");
    
    var dText = document.createTextNode("X");
    
    dBtn.appendChild(dText);
    
    dBtn.setAttribute("onclick", "del(this)")
    
    dBtn.setAttribute("class", "btn1");

    dBtn.setAttribute("id",data.val().key);
    
    list.appendChild(dBtn);
    
    
    //  -------------Edit Button--------------
    
    var editBtn = document.createElement("button");
    
    var editText = document.createTextNode("Edit");
    
    editBtn.appendChild(editText);
    
    editBtn.setAttribute("onclick", "edt(this)");
    
    editBtn.setAttribute("class", "btn2");

    editBtn.setAttribute("id", data.val().key);
    
    list.appendChild(editBtn);
     
    var item = document.getElementById("listItems");
    
    item.appendChild(list);
    
    // console.log(item);
    
    
  })
  
  
  function addtodo(){
    
    var input = document.getElementById("todo");
  // console.log(input.value);
  
    var key = firebase.database().ref("todo-list").push().key;

    var obj ={
      value:input.value,
      key:key
    };
    
    firebase.database().ref("todo-list").child(key).set(obj);
    input.value = "";
  }
   
    
    function deleteAll(){
      var item = document.getElementById("listItems");
      
        firebase.database().ref("todo-list").remove()
        // item.innerHTML="";                 ///first method for Delete All
        item.remove();                         ///// second method for delete all
    }
    
    function del(x){ 
      console.log(x.id);

      firebase.database().ref("todo-list").child(x.id).remove();
      x.parentNode.remove();
    }
    
    function edt(y) {
      var inputvalue = y.parentNode.firstChild.nodeValue = inputField;
    
    var inputField = prompt("Enter Your Updated Value");
    if (inputField !== null) { 
      // console.log(inputField);
    }

    var editbutton = {
      value : inputField,
      key: y.id
    }

    firebase.database().ref("todo-list").child(y.id).set(editbutton);
    
    y.parentNode.firstChild.nodeValue = inputField;
    }