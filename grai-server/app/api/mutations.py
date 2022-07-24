
from strawberry_django_plus import gql
from lineage.models import Node, Edge

from api.types import NodeType, EdgeType, UserType


@gql.django.input(Node)
class NodeTypeInput:
    name: gql.auto


@gql.django.partial(Node)
class NodeTypeInputPartial(gql.NodeInput):
    display_name: gql.auto


@gql.type
class Mutation:
    # create_model: NodeType = gql.django.create_mutation(NodeTypeInput)
    update_model: NodeType = gql.django.update_mutation(NodeTypeInputPartial)
    # delete_model: NodeType = gql.django.delete_mutation(gql.NodeInput)