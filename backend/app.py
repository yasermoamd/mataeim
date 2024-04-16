from flask import Flask, request, jsonify

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'Mka923jdjaj2ja'

    @app.route('/api')
    def api(): 
        return jsonify({
            'posts': [
                {
                    'id': '1cxxcsdfs22aaf324df1',
                    'content': 'Hello, Flask'
                },
                {
                    'id': '1cxxcsdfs22aaf324df1',
                    'content': 'Hello, Flask'
                },
                {
                    'id': '1najad14f214dfn13oadohfu14ahfa',
                    'content': 'Hello, Docker!',
                },
            ]
        })

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()