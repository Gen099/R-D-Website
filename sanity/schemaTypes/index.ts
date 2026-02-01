import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { feedbackType } from './feedbackType'
import { effectType } from './effectType'
import { promptType } from './promptType'
import { competitorType } from './competitorType'
import { resourceType } from './resourceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, feedbackType, effectType, promptType, competitorType, resourceType],
}
