import pytest

from grai_source_mysql.base import get_nodes_and_edges
from grai_source_mysql.loader import MySQLConnector


@pytest.fixture
def connection() -> MySQLConnector:
    """

    Args:

    Returns:

    Raises:

    """
    test_credentials = {
        "host": "localhost",
        "dbname": "grai",
        "user": "grai",
        "password": "grai",
        "namespace": "test",
    }

    connection = MySQLConnector(**test_credentials)
    return connection


@pytest.fixture
def nodes_and_edges(connection):
    """

    Args:
        connection:

    Returns:

    Raises:

    """
    nodes, edges = get_nodes_and_edges(connection, "v1")
    return nodes, edges
