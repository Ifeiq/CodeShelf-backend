import type { CollectionConfig } from 'payload'

export const TopHeaders: CollectionConfig = {
  slug: 'top-headers',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'site',
    defaultColumns: ['site', 'url', 'codigo'],
  },
  fields: [
    {
      name: 'site',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'code',
      type: 'text',
      label: 'code',
    },
  ],
}
