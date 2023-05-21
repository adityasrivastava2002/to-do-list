from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://newroot:newroot@cluster0.wwqgm1y.mongodb.net/?retryWrites=true&w=majority'
mongo = PyMongo(app)


@app.route('/api/todo', methods=['POST'])
def create_todo():
    todo = request.json.get('name')
    if not todo:
        return jsonify({'error': 'Name field is required'}), 400
    new_todo = {'name': todo}
    result = mongo.db.todos.insert_one(new_todo)
    created_todo = mongo.db.todos.find_one({'_id': result.inserted_id})
    return jsonify(created_todo), 201


@app.route('/api/todo/<id>', methods=['PUT'])
def edit_todo(id):
    todo = mongo.db.todos.find_one({'_id': id})
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    new_todo_name = request.json.get('name')
    if not new_todo_name:
        return jsonify({'error': 'Name field is required'}), 400
    mongo.db.todos.update_one({'_id': id}, {'$set': {'name': new_todo_name}})
    updated_todo = mongo.db.todos.find_one({'_id': id})
    return jsonify(updated_todo)


@app.route('/api/todo/<id>', methods=['DELETE'])
def delete_todo(id):
    todo = mongo.db.todos.find_one({'_id': id})
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    mongo.db.todos.delete_one({'_id': id})
    return '', 204


@app.route('/api/todo', methods=['GET'])
def list_todos():
    sort_order = request.args.get('sort')
    if sort_order == 'asc':
        todos = mongo.db.todos.find().sort('name', 1)
    elif sort_order == 'desc':
        todos = mongo.db.todos.find().sort('name', -1)
    else:
        todos = mongo.db.todos.find()
    return jsonify(list(todos))


if __name__ == '__main__':
    app.run(debug=True)
