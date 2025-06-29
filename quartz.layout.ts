import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Footer({
      links: {
        "Théo Marchal": "https://theo.marchal.dev"
      }
    })
  ],
  footer: Component.Flex({
    components:[]
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],

  left: [
    Component.PageTitle(),

    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ]
    })),

    Component.Explorer( { folderDefaultState: "open" } ),
  ],

  right: [
    Component.DesktopOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.Search()),
    Component.TableOfContents(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {

    beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],

  left: [
    Component.PageTitle(),

    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ]
    })),

    Component.Explorer( { folderDefaultState: "open" } ),
  ],

  right: [
    Component.DesktopOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.Search()),
    Component.TableOfContents(),
  ],
}
