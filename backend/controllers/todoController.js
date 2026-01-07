import Todo from "../models/Todo.js"
let todoList = [
    { id : "1" , title: "first todo" , complete : false },
    { id : "2" , title: "second todo" , complete : true },
    { id : "3" , title: "third todo" , complete : false },
    { id : "4" , title: "fourth todo" , complete : true },
    { id : "5" , title: "fifth todo" , complete : false },
    { id : "6" , title: "sixth todo" , complete : true },
]

//  async function createTodo( req , res){
//     const { title , complete } = req.body;
//     const newTodo = {
//         id: (todoList.length + 1).toString(),
//         title: title,
//         complete: complete
//     }
//     todoList.push(newTodo); 
//     try {
//         res.status(201).json(newTodo)
//     } catch (error) {
//         res.status(500).json({
//             message: "could not create todo",   
//             error: error.message    
//         })
//     }
//     }
async function createTodo(req, res) {
    const { title , complete} = req.body;
    try {
        const newTodo = await Todo.create({
            title , 
            complete
        })

        res.status(201).json(newTodo)
    } catch (error) {
        res.status(500).json({
            message : "could not create todo",
            error : error.message
        })
    }
}


function getAllTodo(req, res) {
  // 1. Read query params (they come as strings)
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 2;
  const complete = req.query.complete;

  // Filter todos based on 'complete' query param if provided

  let filteredTodos = [ ...todoList ] ;

  if (complete !== undefined) {
    const isComplete = complete === "true";
    filteredTodos = filteredTodos.filter(
      (todo) => todo.complete === isComplete
    );
  }

  // 2. Calculate start and end index
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // 3. Get paginated todos
  const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

  // 4. Send response with metadata
  res.status(200).json({
    page: page,
    limit: limit,
    totalTodos: filteredTodos.length,
    totalPages: Math.ceil(todoList.length / limit),
    data: paginatedTodos,
  });
}

// function getSingleTodo(req, res){
//     const id = req.params.id;
//     const todo = todoList.find((todo) => {
//   return todo.id === id;
// } )
//     res.status(200).json(todo)
// }
async function getSingleTodo( req , res){
    const { id } = req.params
    try {
        const todo = await Todo.findById(id)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({
            message : "could not find this todo",
            error : error.message
        })
    }
}

// function updateTodo(req, res){
//     const { id } = req.params;
//     const { title , complete } = req.body;
//     todoList = todoList.map((todo) => {
//         if(todo.id === id){
//             return {
//                 ...todo,
//                 title: title,
//                 complete: complete
//             }
//         }
//         return todoList;
//     })
//     res.status(200).json(todoList)
// }
async function updateTodo(req , res){
    const { id} = req.params;
const { title , complete } = req.body;
try {
    const updatedTodo = await Todo.findByIdAndUpdate(
  id,
  { title, complete },
  { new: true }
);
    res.status(200).json({
        message : "todo updated successfully",
        updatedTodo
    })
} catch (error) {
    res.status(500).json({
        message : "could not update todo",
        error : error.message
    })
}
}

function deleteTodo(req, res){
    const { id } = req.params;
    todoList = todoList.filter((todo) => {
        return todo.id !== id;
    })
    res.status(200).json(todoList)
}




export { getAllTodo , getSingleTodo , updateTodo , deleteTodo  , createTodo}