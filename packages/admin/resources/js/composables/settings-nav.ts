interface SettingsNav {
  label: string
  uri: string
  permission?: string
}

export const useSettingsNav: SettingsNav[] = [
  { label: 'General', uri: '/settings/general', permission: 'setting:general' },
  { label: 'Email', uri: '/settings/email', permission: 'setting:email' },
  { label: 'Labels', uri: '/labels', permission: 'label:view' },
  { label: 'Roles & Permissions', uri: '/roles', permission: 'role:view' },
//   { label: 'Updates', uri: '/settings/updates', permission: 'setting:updates' },
]
