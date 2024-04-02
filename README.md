# Tasteway flask app for food recipe

   * Basic system design
    ![Alt Design flask app](https://www.nginx.com/wp-content/uploads/2014/07/what-is-load-balancing-diagram-NGINX-640x324.png)
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
         export FLASK_APP=app.py
       ```
     - Run the app
       ``` flask run --debug ``` <strong><p style="color:red">Make sure it's --debug to enable hotreload<p></strong>