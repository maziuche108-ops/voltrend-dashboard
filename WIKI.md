# Project Wiki - TechCronch Dashboard

## Button Enhancement System

The project uses a centralized `ui_sdk.js` to enhance standard HTML buttons with advanced functionality without cluttering the main logic.

### Features
- **Loading States**: Automatically shows a loading spinner and disables the button during async operations.
- **Tooltips**: Custom tooltip support via `data-ui-tooltip`.
- **Keyboard Shortcuts**: Bind keys (e.g., `Alt+S`) to button clicks.
- **Analytics**: specific events are logged when buttons are clicked.
- **Confirmation**: Native confirmation dialogs for destructive actions.
- **Accessibility**: Auto-injects ARIA attributes.

### Usage Guide

To enhance a button, simply add the `data-ui-enhance` attribute and any configuration attributes. The `UI_SDK` automatically initializes these buttons on page load.

#### Basic Example
```html
<button 
    onclick="saveData()" 
    data-ui-enhance 
    data-ui-tooltip="Save your changes"
>
    Save
</button>
```

#### Advanced Example (Loading + Shortcut + Analytics)
```html
<button 
    onclick="submitOrder()" 
    data-ui-enhance 
    data-ui-loading="true" 
    data-ui-tooltip="Submit Order" 
    data-ui-shortcut="Alt+Enter"
    data-ui-analytics-event="order_submit"
>
    Submit Order
</button>
```

#### Destructive Action (Confirmation)
```html
<button 
    onclick="deleteAccount()" 
    data-ui-enhance 
    data-ui-confirm="Are you sure you want to delete this?" 
    class="bg-red-500"
>
    Delete
</button>
```

### SDK Reference (`_sdk/ui_sdk.js`)

The `enhanceButton` function handles the logic:
1.  **Accessibility**: Sets `aria-label` if missing.
2.  **Tooltips**: Reads `data-ui-tooltip`.
3.  **Shortcuts**: Listens for keydown events matching `data-ui-shortcut`.
4.  **Click Handling**:
    -   Prevents default if needed.
    -   Checks for disabled/loading state.
    -   Shows confirmation dialog if `data-ui-confirm` is present.
    -   Adds `ui-btn-loading` class if `data-ui-loading="true"`.
    -   Executes the original `onclick` handler.
    -   Logs analytics if `data-ui-analytics-event` is set.
    -   Restores state after execution.

### WCAG 2.1 Compliance
-   All enhanced buttons automatically receive keyboard focus indicators.
-   Tooltips are accessible via hover and focus.
-   Loading states announce status changes (future improvement).

## Deployment

See `DEPLOY.md` for build and deployment instructions.
