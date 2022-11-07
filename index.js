const getThisTodoResolver = require('./query/getThisTodoResolver');
const createUserResolver = require('./mutation/createUserResolver');
const createTodoResolver = require('./mutation/createTodoResolver');
const UpdateTodoResolver = require('./mutation/updateTodoResolver');
const DeleteTodoResolver = require('./mutation/deleteTodoResolver');
const getUsersResolver = require('./query/getUsersResolver');
const getTodosResolver = require('./query/getTodosResolver');

exports.handler = async (event) => {
    switch(event.info.fieldName){
        //mutations
        case "createUser": return await createUserResolver(event.arguments.name);
        case "createTodo": return await createTodoResolver(event.arguments.uid, event.arguments.newdata);
        case "UpdateTodo": return await UpdateTodoResolver(event.arguments.uid, event.arguments.tid, event.arguments.newdata);
        case "DeleteTodo": return await DeleteTodoResolver(event.arguments.uid, event.arguments.tid);
        //queries
        case "getUsers": return await getUsersResolver();
        case "getTodos": return await getTodosResolver(event.arguments.uid);
        case "getThisTodo": return await getThisTodoResolver(event.arguments.uid, event.arguments.tid);
    }
    
};
