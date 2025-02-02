---
sidebar_position: 3
---

# User roles and permissions

Users in your Lightdash project can be given different roles and permissions that limit which actions they can take in your project.

---

## User roles

The user roles that we have at Lightdash are [Viewer](#viewer), [Editor](#editor), and [Admin](#admin).

### Viewer
✅ Can explore tables  
✅ Can see saved charts  
✅ Can see dashboards  

❌ Can't create saved content  
❌ Can't edit saved content  
❌ Can't edit project settings  
❌ Can't edit user settings  

![screenshot-viewer-settings](./assets/screenshot-viewer-settings.png)

### Editor
✅ All Viewer permissions  
✅ Can create saved content  
✅ Can edit saved content  
✅ Can edit project settings  

❌ Can't edit user settings  
❌ Can't edit organization settings  

![screenshot-editor-settings](./assets/screenshot-editor-settings.png)


### Admin
✅ All Editor permissions  
✅ Can edit user settings  
✅ Can edit organization settings

![screenshot-editor-settings](./assets/screenshot-admin-settings.png)

## Updating a user's role and permissions

:::info
Only users with an `Admin` role can update users' roles and permissions in your Lightdash project.
:::

Head over to the `settings` for your project. Then click on `user management`.

Within `user management` you can update each user's roles and permissions.

![user-management](./assets/screenshot-user-management.png)
