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

        if (typeof data.site === 'string') {
          data.site = data.site.trim()
        }

        if (typeof data.url === 'string') {
          const raw = data.url.trim()
          try {
            const parsed = new URL(raw)
            // Normalize to reduce accidental duplicates:
            // - lowercase protocol/host
            // - remove trailing slash in pathname
            parsed.protocol = parsed.protocol.toLowerCase()
            parsed.hostname = parsed.hostname.toLowerCase()
            parsed.pathname = parsed.pathname.replace(/\/+$/, '')
            data.url = parsed.toString()
          } catch {
            data.url = raw
          }
        }

        return data
      },
    ],
  },
  admin: {
    useAsTitle: 'site',
    defaultColumns: ['site', 'url', 'code'],
  },
  fields: [
    {
      name: 'site',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'code',
      type: 'text',
      label: 'code',
    },
  ],
}