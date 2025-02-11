import React from "react"
import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import NotFound from "pages/NotFound"
import useWorkspace from "helpers/useWorkspace"
import PageContent from "components/layout/PageContent"
import PageHeader from "components/layout/PageHeader"
import PageLayout from "components/layout/PageLayout"
import PullRequestTable from "components/reports/pull_request/PullRequestTable"
import ReportBreadcrumbs from "components/reports/ReportBreadcrumbs"
import TypeReportTabs from "components/reports/TypeReportTabs"
import GraphError from "components/utils/GraphError"
import {
  GetPullRequests,
  GetPullRequestsVariables,
} from "./__generated__/GetPullRequests"

export const GET_PULL_REQUESTS = gql`
  query GetPullRequests(
    $organisationName: String!
    $workspaceName: String!
    $type: String!
    $owner: String!
    $repo: String!
  ) {
    workspace(organisationName: $organisationName, name: $workspaceName) {
      id
      repository(type: $type, owner: $owner, repo: $repo) {
        id
        owner
        repo
        pull_requests {
          data {
            id
            reference
            title
            last_commit {
              id
              reference
              created_at
              last_successful_run {
                id
                metadata
              }
            }
            branch {
              id
              reference
            }
          }
        }
      }
    }
  }
`

const PullRequests: React.FC = () => {
  const { organisationName, workspaceName } = useWorkspace()
  const params = useParams()

  const type = params.type ?? ""

  const { loading, error, data } = useQuery<
    GetPullRequests,
    GetPullRequestsVariables
  >(GET_PULL_REQUESTS, {
    variables: {
      organisationName,
      workspaceName,
      type,
      owner: params.owner ?? "",
      repo: params.repo ?? "",
    },
  })

  if (error) return <GraphError error={error} />
  if (loading) return <PageLayout loading />

  const repository = data?.workspace.repository

  if (!repository) return <NotFound />

  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={<ReportBreadcrumbs type={type} repository={repository} />}
      >
        <TypeReportTabs
          currentTab="pulls"
          type={type}
          repository={repository}
        />
      </PageHeader>
      <PageContent>
        <PullRequestTable
          pull_requests={repository.pull_requests.data}
          type={type}
          repository={repository}
        />
      </PageContent>
    </PageLayout>
  )
}

export default PullRequests
