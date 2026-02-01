import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('R&D Content')
    .items([
      S.documentTypeListItem('feedback').title('Feedback Analysis'),
      S.documentTypeListItem('effect').title('Effects Catalog'),
      S.documentTypeListItem('prompt').title('Prompt Library'),
      S.documentTypeListItem('competitor').title('Competition Analysis'),
      S.documentTypeListItem('resource').title('Resources'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['feedback', 'effect', 'prompt', 'competitor', 'resource'].includes(item.getId()!),
      ),
    ])
