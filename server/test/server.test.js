const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { ObjectID } = require('mongodb');

const todos = [
    {
        _id: new ObjectID(),
        text: "first test todo"
    },
    {
        _id: new ObjectID(),
        text:"second test  todo"
    }
]

beforeEach((done)=>{
    Todo.deleteMany({})
        .then(()=> {
            return Todo.insertMany(todos);
        })
        .then(()=>done());
})

describe('POST /todos', ()=>{
    it("Should creat a new todo" , (done)=>{
        var text = "test todo text";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err , res)=>{
                if(err){
                    return done(err);
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            })
    })

    it("Should not creat todo with invalid body data" , (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err , res)=>{
                if(err){
                    return err
                }

                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e))
            })
    })
})

describe("GET /todos" , ()=>{
    it("Should get all todos" , (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.length).toBe(2)
            })
            .end(done)
    })
})

describe('GET /todo/:id' , ()=>{
    it("Should return todo doc" , (done)=>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    })

    it('Should return 404 if todo not found' , (done)=>{
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    })

    it('Should return non-object ids' , (done)=>{
        request(app)
            .get(`/todos/ljsd343`)
            .expect(404)
            .end(done);
    })

})

describe('Delete todos/:id', ()=>{
    it('Should delete a todos' , (done)=>{
        const hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body._id).toBe(hexId)
            })
            .end((err , res)=>{
                if(err){
                    return done(err)
                }
                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toBe(null)
                    done();
                })
            })
    })

    it('Should return 404 if todo not found' , (done)=>{
        var hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    })

    it('Should return non-object ids' , (done)=>{
        request(app)
            .delete(`/todos/ljsd343`)
            .expect(404)
            .end(done);
    })

})