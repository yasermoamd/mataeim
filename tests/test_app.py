import pytest
from core.app import create_app


@pytest.fixture
def app():
    app = create_app()
    app.config["TESTING"] = True
    with app.app_context():
        yield app


def test_app(app):
    assert app is not None


def test_blueprint_registration(app):
    assert "main" in app.blueprints


def test_database_connection(app):
    with app.app_context():
        # Access your database object here (e.g., db)
        # Assert connection status or perform basic queries
        pass  # Replace with your database testing logic


if __name__ == "__main__":
    app()
