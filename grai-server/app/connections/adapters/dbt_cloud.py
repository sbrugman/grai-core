from .base import BaseAdapter


class DbtCloudAdapter(BaseAdapter):
    def get_nodes_and_edges(self):
        from grai_source_dbt_cloud.base import get_nodes_and_edges
        from grai_source_dbt_cloud.loader import DbtCloudConnector

        secrets = self.run.connection.secrets
        namespace = self.run.connection.namespace

        conn = DbtCloudConnector(
            api_key=secrets.get("api_key"),
            namespace=namespace,
        )

        return get_nodes_and_edges(conn, "v1")