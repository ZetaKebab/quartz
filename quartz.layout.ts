import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.DesktopOnly(
      Component.Footer({
        links: {
          "Théo Marchal": "https://theo.marchal.dev"
        }
      })
    )
  ],
  footer: 
    Component.MobileOnly(
      Component.Footer({
        links: {
          "Théo Marchal": "https://theo.marchal.dev"
        }
      })
    ),
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
    Component.Explorer( { folderDefaultState: "open" } ),
  ],

  right: [

    Component.MobileOnly(Component.Flex({
      components: [
        { Component: Component.Darkmode() },
        {
          Component: Component.Search(),
          grow: true,
        },
      ]
    })),

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
    Component.Explorer( { folderDefaultState: "open" } ),
  ],

  right: [

    Component.MobileOnly(Component.Flex({
      components: [
        { Component: Component.Darkmode() },
        {
          Component: Component.Search(),
          grow: true,
        },
      ]
    })),

    Component.DesktopOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.Search()),
    Component.TableOfContents(),
  ],
}