import React from "react"
import userEvent from "@testing-library/user-event"
import { GraphQLError } from "graphql"
import { act, render, screen, waitFor } from "testing"
import { input } from "testing/autocomplete"
import { destinationTable, sourceTable, spareTable } from "helpers/testNodes"
import { GET_FILTERS } from "components/graph/controls/FilterControl"
import Graph, { GET_TABLES_AND_EDGES } from "./Graph"

export const filtersMock = {
  request: {
    query: GET_FILTERS,
    variables: {
      organisationName: "default",
      workspaceName: "demo",
    },
  },
  result: {
    data: {
      workspace: {
        id: "1",
        filters: {
          data: [
            {
              id: "1",
              name: "test",
              metadata: [],
            },
          ],
        },
      },
    },
  },
}

const tablesMock = {
  request: {
    query: GET_TABLES_AND_EDGES,
    variables: {
      organisationName: "default",
      workspaceName: "demo",
      filters: { filter: null },
    },
  },
  result: {
    data: {
      workspace: {
        id: "1",
        graph: [sourceTable, destinationTable, spareTable],
        filters: {
          data: [
            {
              id: "1",
              name: "test",
              metadata: [],
            },
          ],
        },
      },
    },
    meta: {
      total: 100,
    },
  },
}

const tablesMockWithFilter = {
  request: {
    query: GET_TABLES_AND_EDGES,
    variables: {
      organisationName: "default",
      workspaceName: "demo",
      filters: { filter: "1" },
    },
  },
  result: {
    data: {
      workspace: {
        id: "1",
        graph: [sourceTable, destinationTable, spareTable],
        filters: {
          data: [
            {
              id: "1",
              name: "test",
              metadata: [],
            },
          ],
        },
      },
    },
  },
}

const mocks = [filtersMock, tablesMock, tablesMock]

jest.retryTimes(1)

test("renders", async () => {
  class ResizeObserver {
    callback: globalThis.ResizeObserverCallback

    constructor(callback: globalThis.ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback([{ target } as globalThis.ResizeObserverEntry], this)
    }

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver

  render(<Graph alwaysShow />, {
    path: ":organisationName/:workspaceName/graph",
    route: "/default/demo/graph",
    mocks,
  })

  await waitFor(() => {
    expect(screen.getByText("N2 Node")).toBeInTheDocument()
  })
})

test("renders placeholder", async () => {
  class ResizeObserver {
    callback: globalThis.ResizeObserverCallback

    constructor(callback: globalThis.ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback([{ target } as globalThis.ResizeObserverEntry], this)
    }

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver

  render(<Graph />, {
    path: ":organisationName/:workspaceName/graph",
    route: "/default/demo/graph",
    mocks,
  })

  await waitFor(() => {
    expect(screen.queryByText("N2 Node")).not.toBeInTheDocument()
  })

  await waitFor(() => {
    expect(screen.getAllByTestId("placeholder")).toBeTruthy()
  })
})

test("renders empty", async () => {
  class ResizeObserver {
    callback: globalThis.ResizeObserverCallback

    constructor(callback: globalThis.ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback([{ target } as globalThis.ResizeObserverEntry], this)
    }

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver

  render(<Graph />, {
    path: ":organisationName/:workspaceName/graph",
    route: "/default/demo/graph",
    mocks: [
      filtersMock,
      {
        request: {
          query: GET_TABLES_AND_EDGES,
          variables: {
            organisationName: "default",
            workspaceName: "demo",
            filters: { filter: null },
          },
        },
        result: {
          data: {
            workspace: {
              id: "1",
              graph: [],
              filters: {
                data: [],
              },
            },
          },
        },
      },
    ],
  })

  await waitFor(() => {
    expect(screen.getByText("Your graph is empty!")).toBeInTheDocument()
  })
})

// test("expand", async () => {
//   const user = userEvent.setup()

//   window.ResizeObserver = jest.fn().mockImplementation(() => ({
//     disconnect: jest.fn(),
//     observe: jest.fn(),
//     unobserve: jest.fn(),
//   }))

//   renderWithMocks(<Graph />, [mock])

//   await waitFor(() => {
//     screen.getByText("N2 Node")
//   })

//   await user.click(screen.getByTestId("ArrowDropDownIcon"))
// })

test("renders with errors", async () => {
  class ResizeObserver {
    callback: globalThis.ResizeObserverCallback

    constructor(callback: globalThis.ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback([{ target } as globalThis.ResizeObserverEntry], this)
    }

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver

  render(<Graph alwaysShow />, {
    path: "/:organisationName/:workspaceName/graph",
    route:
      "/default/demo/graph?errors=%5B%7B%22source%22%3A%20%22a%22%2C%20%22destination%22%3A%20%22b%22%2C%20%22test%22%3A%20%22nullable%22%2C%20%22message%22%3A%20%22not%20null%22%7D%5D",
    mocks,
  })

  await waitFor(() => {
    expect(screen.getAllByText("N1")).toBeTruthy()
  })

  await waitFor(() => {
    expect(screen.getAllByText(/1/i)).toBeTruthy()
  })
})

test("renders with limitGraph", async () => {
  class ResizeObserver {
    callback: globalThis.ResizeObserverCallback

    constructor(callback: globalThis.ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback([{ target } as globalThis.ResizeObserverEntry], this)
    }

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver

  render(<Graph alwaysShow />, {
    path: ":organisationName/:workspaceName/graph",
    route:
      "/default/demo/graph?limitGraph=true&errors=%5B%7B%22source%22%3A%20%22N1%22%2C%20%22destination%22%3A%20%22N2%22%2C%20%22test%22%3A%20%22nullable%22%2C%20%22message%22%3A%20%22not%20null%22%7D%5D",
    mocks,
  })

  // const zoom = document.querySelector("#componentId")

  // if (zoom) {
  //   await act(async () => {
  //     await user.click(zoom)
  //     await user.click(zoom)
  //     await user.click(zoom)
  //     await user.click(zoom)
  //     await user.click(zoom)
  //   })
  // }

  // await waitFor(() => {
  //   expect(screen.getAllByTestId("placeholder")).toBeTruthy()
  // })

  await waitFor(() => {
    expect(screen.getByText("N2 Node")).toBeInTheDocument()
  })
})

test("error", async () => {
  const mocks = [
    {
      request: {
        query: GET_TABLES_AND_EDGES,
        variables: {
          organisationName: "",
          workspaceName: "",
          filters: { filter: null },
        },
      },
      result: {
        errors: [new GraphQLError("Error!")],
      },
    },
  ]

  render(<Graph alwaysShow />, { mocks, withRouter: true })

  await waitFor(() => {
    expect(screen.getByText("Error!")).toBeInTheDocument()
  })
})

test("no nodes", async () => {
  const mocks = [
    filtersMock,
    {
      request: {
        query: GET_TABLES_AND_EDGES,
        variables: {
          organisationName: "",
          workspaceName: "",
          filters: { filter: null },
        },
      },
      result: {
        data: {
          workspace: {
            id: "1",
            graph: [],
            filters: {
              data: [],
            },
          },
        },
      },
    },
  ]

  render(<Graph alwaysShow />, { mocks, withRouter: true })

  await waitFor(() => {
    expect(screen.getByText("Your graph is empty!")).toBeInTheDocument()
  })
})

test("search", async () => {
  const user = userEvent.setup()

  class ResizeObserver {
    callback: globalThis.ResizeObserverCallback

    constructor(callback: globalThis.ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback([{ target } as globalThis.ResizeObserverEntry], this)
    }

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver

  render(<Graph alwaysShow />, {
    path: ":organisationName/:workspaceName/graph",
    route: "/default/demo/graph",
    mocks,
  })

  await waitFor(() => {
    expect(screen.getByText("N2 Node")).toBeInTheDocument()
  })

  await act(
    async () => await user.type(screen.getByTestId("search-input"), "search")
  )
})

test("filter", async () => {
  class ResizeObserver {
    callback: globalThis.ResizeObserverCallback

    constructor(callback: globalThis.ResizeObserverCallback) {
      this.callback = callback
    }

    observe(target: Element) {
      this.callback([{ target } as globalThis.ResizeObserverEntry], this)
    }

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver

  render(<Graph alwaysShow />, {
    path: ":organisationName/:workspaceName/graph",
    route: "/default/demo/graph?filter=1",
    routes: ["/:organisationName/:workspaceName/filters"],
    mocks: [filtersMock, tablesMock, tablesMock, tablesMockWithFilter],
  })

  await waitFor(() => {
    expect(screen.getByText("N2 Node")).toBeInTheDocument()
  })

  input(screen.getByTestId("filter-control"))

  await waitFor(() => {
    expect(screen.getByText("New Page")).toBeInTheDocument()
  })
})
