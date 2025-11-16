# Sharif Assistant Extension

A powerful Persian/Farsi Chrome extension that serves as your personal productivity assistant with integrated calendar, quick access links, and note-taking capabilities.

## 📋 Features

### 🗓️ Dual Calendar System
- **Gregorian Calendar**: Standard international calendar
- **Solar Hijri Calendar**: Persian calendar support
- Easy toggle between calendar types
- Navigate months with intuitive controls
- Quick "Today" button to return to current date
- Daily notes for specific dates
- Visual indicators for days with notes

### 🔗 Quick Access Links
- Add frequently visited websites
- Custom titles and URLs
- Quick launch from new tab page
- Easy management (add/remove links)
- Persistent storage across sessions

### 📝 Note Taking
- **Daily Notes**: Attach notes to specific calendar dates
- **General Notes**: Create standalone notes
- Edit and delete functionality
- View all calendar notes in one place
- Rich text editing support

### 🎨 Theme Support
- Light mode for daytime productivity
- Dark mode for comfortable night-time use
- Smooth theme transitions
- Persistent theme preference

### 🔍 Integrated Search
- Quick Google search from new tab
- Keyboard shortcut support (Enter key)
- Clean and distraction-free interface

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables for theming
- **Vanilla JavaScript**: Pure JS with no dependencies
- **Chrome Storage API**: Data persistence
- **Chrome Extension Manifest V3**: Latest extension standards

## 📦 Installation

### Install from Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/koushamoeini/sharif-assistant-extension.git
   cd sharif-assistant-extension
   ```

2. **Load the extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the project folder

3. **Start using**
   - The extension will replace your new tab page
   - Click the extension icon to access the popup

### Install from Chrome Web Store
*Coming soon...*

## 💻 Usage

### Setting Up Quick Access Links
1. Click the **"+" button** in the Quick Access section
2. Enter the website title (e.g., "GitHub")
3. Enter the full URL (e.g., "https://github.com")
4. Click "Add Link"
5. Click any link to open it in a new tab

### Using the Calendar
1. **Switch Calendar Types**: Click "تغییر به شمسی" to toggle between Gregorian and Solar Hijri
2. **Navigate**: Use "ماه قبل" (Previous Month) and "ماه بعد" (Next Month) buttons
3. **Return to Today**: Click "امروز" (Today) button
4. **Add Daily Notes**: Click on any date to add a note for that day

### Managing Notes
1. **Create General Notes**: Click the "+" button in the Notes section
2. **Edit Notes**: Click the edit icon on any note
3. **Delete Notes**: Click the delete icon to remove a note
4. **View Calendar Notes**: Click "نمایش همه یادداشت‌های تقویم" to see all date-specific notes

### Changing Theme
- Click the **☀️/🌙 icon** in the top-left corner to toggle between light and dark modes

## 📁 Project Structure

```
sharif-assistant-extension/
├── src/
│   ├── index.html          # Main HTML structure
│   ├── app.js              # Application logic
│   └── styles.css          # Styling and themes
├── assets/
│   └── icons/
│       ├── icon16.png      # Extension icon (16x16)
│       └── icon48.png      # Extension icon (48x48)
├── docs/                   # Documentation
├── manifest.json           # Extension configuration
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
└── README.md              # This file
```

## ⚙️ Configuration

The extension uses Chrome's Storage API to persist data. No additional configuration needed!

### Manifest Configuration
- **Permissions**: `storage` - Required for saving user data
- **Chrome URL Override**: Replaces new tab page
- **Manifest Version**: 3 (Latest Chrome extension standard)

## 📸 Screenshots

### Light Mode
![Light Mode Screenshot](docs/screenshots/light-mode.png)

### Dark Mode
![Dark Mode Screenshot](docs/screenshots/dark-mode.png)

### Calendar View
![Calendar View](docs/screenshots/calendar.png)

*Note: Add actual screenshots to the `docs/screenshots/` directory*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention
This project follows [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Kousha Moeini**
- GitHub: [@koushamoeini](https://github.com/koushamoeini)

## 🙏 Acknowledgments

- Built as a project for Sharif University of Technology
- Inspired by the need for a Persian-friendly productivity tool
- Thanks to the Chrome Extensions community

## 📮 Contact & Support

If you have any questions, suggestions, or issues:
- Open an issue on [GitHub](https://github.com/koushamoeini/sharif-assistant-extension/issues)
- Contact: [GitHub Profile](https://github.com/koushamoeini)

---

Made with ❤️ for Persian-speaking Chrome users
