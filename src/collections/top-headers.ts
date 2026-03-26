import type { CollectionConfig } from 'payload'

export const TopHeaders: CollectionConfig = {
  slug: 'top-headers',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        // Backward compatibility: accept both "code" and "codigo" payloads.
        if (typeof data.codigo !== 'string' && typeof data.code === 'string') {
          data.codigo = data.code
        }
        if (typeof data.code === 'string') {
          delete data.code
        }
        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (!doc) return doc
        // Compatibility for old records persisted with "code" key.
        if (typeof doc.codigo !== 'string' && typeof doc.code === 'string') {
          doc.codigo = doc.code
        }
        return doc
      },
    ],
  },
  admin: {
    useAsTitle: 'site',
    defaultColumns: ['id', 'site', 'url', 'codigo'],
  },
  fields: [
    {
      name: 'id',
      type: 'number',
      required: true,
      unique: true,
      index: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'site',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'codigo',
      type: 'text',
      label: 'codigo',
    },
  ],
}
