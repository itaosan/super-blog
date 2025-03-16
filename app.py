from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Temporary in-memory storage for demonstration
posts = [
    {'id': 1, 'title': 'First Post', 'content': 'This is my first post'},
    {'id': 2, 'title': 'Second Post', 'content': 'Another interesting post'}
]

@app.route('/')
def post_list():
    return render_template('post_list.html', posts=posts)

@app.route('/api/posts/<int:post_id>')
def api_post_detail(post_id):
    post = next((p for p in posts if p['id'] == post_id), None)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(post)

@app.route('/post/<int:post_id>/edit', methods=['GET', 'POST'])
def edit_post(post_id):
    post = next((p for p in posts if p['id'] == post_id), None)
    if not post:
        return "Post not found", 404

    if request.method == 'POST':
        post['title'] = request.form['title']
        post['content'] = request.form['content']
        return redirect(url_for('post_detail', post_id=post_id))

    return render_template('edit_post.html', post=post)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
