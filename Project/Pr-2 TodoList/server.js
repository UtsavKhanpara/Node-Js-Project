const express=require("express")
const port=9000;
const app=express();

app.use(express.urlencoded())
app.set("view engine","ejs");
     
let todolist=[{
    id:1,
    name:"utsav",
    email:"utsav@gmail.com",   
    password:289    
},{
    id:2,
    name:"sarthak",
    email:"sarthak@gmail.com",
    password:809
},{
    id:3,
    name:"divyang",
    email:"divyang@gmail.com",
    password:909
}]

app.get('/',(req,res)=>{
    return res.render("view",{
        todolist:todolist
    })
})

app.get('/add',(req,res)=>{
    return res.render("add")
})

app.post('/adduser',(req,res)=>{
    const {name,email,password}=req.body;

    const obj={
        id:Math.floor(Math.random()*1000),
        name, 
        email,
        password
    }
    todolist.push(obj);
    console.log("Record Added");
    return res.redirect('/');
})

app.get('/edituser',(req,res)=>{
  let id=req.query.editid;
  let single=todolist.find(val=>val.id ==id);
  return res.render('edit',{
    single
  })
})

app.post('/updateuser',(req,res)=>{
    const{editid,name,email,password}=req.body
   let up=todolist.map((val)=>{
     if(val.id ==editid){
        val.name=name;   
        val.email=email;
        val.password=password;
    }
    return val;   
   })
   todolist=up;
   return res.redirect('/');
})

app.get('/deleteuser',(req,res)=>{
    let id=req.query.deleteid;
    let deletedata=todolist.filter(val=>val.id !=id);
    todolist=deletedata;
    console.log("Record Deleted");
    return res.redirect('/');
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is running on port ${port}`);
})