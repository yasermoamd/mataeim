# Tasteway flask app for food recipe
   * Clone the  Repository
      - T clone the repo
        ```
         git clone https://github.com/yasermoamd/tasteway
        ```
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
       ``` flask run --debug ``` <strong><p style="color:red">Make sure it's --debug to enable hotreload<p></strong>