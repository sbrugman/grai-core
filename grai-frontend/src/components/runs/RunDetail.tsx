import React from "react"
import {
  Alert,
  AlertTitle,
  Card,
  Grid,
  Table,
  TableBody,
  Tooltip,
  Typography,
} from "@mui/material"
import { DateTime } from "luxon"
import {
  durationAgo,
  runDurationString,
  runQueuedString,
} from "helpers/runDuration"
import NodeDetailRow from "components/layout/NodeDetailRow"

interface RunMetadata {
  error: string
}

interface User {
  id: string
  first_name: string
}

interface Run {
  id: string
  user: User | null
  metadata: RunMetadata
  created_at: string
  started_at: string | null
  finished_at: string | null
}

type RunDetailProps = {
  run: Run
}

const RunDetail: React.FC<RunDetailProps> = ({ run }) => (
  <>
    <Grid container spacing={3}>
      <Grid item md={6}>
        <Card variant="outlined" sx={{ borderRadius: 0, borderBottom: 0 }}>
          <Table>
            <TableBody>
              <NodeDetailRow label="Started" right>
                <Tooltip
                  title={DateTime.fromISO(run.created_at).toLocaleString(
                    DateTime.DATETIME_FULL_WITH_SECONDS
                  )}
                >
                  <Typography variant="body2">
                    {durationAgo(run.created_at)} ago
                  </Typography>
                </Tooltip>
              </NodeDetailRow>
              <NodeDetailRow
                label="Queued"
                value={runQueuedString(run)}
                right
              />
              <NodeDetailRow
                label="Duration"
                value={runDurationString(run)}
                right
              />
            </TableBody>
          </Table>
        </Card>
      </Grid>
      <Grid item md={6}>
        <Card variant="outlined" sx={{ borderRadius: 0, borderBottom: 0 }}>
          <Table>
            <TableBody>
              <NodeDetailRow label="User" value={run.user?.first_name} />
            </TableBody>
          </Table>
        </Card>
      </Grid>
    </Grid>
    {run.metadata.error && (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {run.metadata.error.split("\n").map((line, index) => (
          <Typography variant="body2" key={index}>
            {line}
          </Typography>
        ))}
      </Alert>
    )}
  </>
)

export default RunDetail
