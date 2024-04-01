# Tasteway flask app for food recipe
   * Clone the  Repository
     - Create virtual environment
       ```
        python -m venv .venv
       ```
     - Install all requirements
       ```
        pip install -r requirements.txt
       ```
     - Export your flask app to your bash
       ```
         export FLASK_APP=core/app.py
       ```
     - Run the app
       ``` flask run --debug ``` <strong>Make sure it's --debug to enable hotreload</strong>