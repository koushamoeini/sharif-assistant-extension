document.addEventListener('DOMContentLoaded', () => {

    const customAlert = (message) => window.alert(message);
    const customConfirm = (message) => window.confirm(message);

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    const applyTheme = () => {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            themeToggle.textContent = '🌙';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = '☀️';
        }
        localStorage.setItem('darkMode', isDarkMode);
    };

    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        applyTheme();
    });

    applyTheme();

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    const handleSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    const quickAccessGrid = document.getElementById('quick-access-grid');
    const addLinkButton = document.getElementById('add-link-button');
    const modal = document.getElementById('addLinkModal');
    const closeButton = document.querySelector('#addLinkModal .close-button');
    const addLinkForm = document.getElementById('add-link-form');

    const DEFAULT_LINKS = [
        { title: 'یوتیوب', url: 'https://www.youtube.com/', icon: '' },
        { title: 'جیمیل', url: 'https://mail.google.com/', icon: '' },
        { title: 'مخابرات', url: 'https://adsl.tci.ir/panel', icon: '' },
        { title: 'گوگل', url: 'https://google.com/', icon: '' }
    ];

    const getLinks = () => {
        const links = localStorage.getItem('quickAccessLinks');
        if (links) {
            return JSON.parse(links);
        }
        return DEFAULT_LINKS;
    };

    const saveLinks = (links) => {
        localStorage.setItem('quickAccessLinks', JSON.stringify(links));
    };

    const getFaviconUrl = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://s2.googleusercontent.com/s2/favicons?domain=${domain}`;
        } catch (e) {
            return '';
        }
    };

    const deleteLink = (index) => {
        let links = getLinks();
        links.splice(index, 1);
        saveLinks(links);
        renderLinks();
    };

    const renderLinks = () => {
        quickAccessGrid.innerHTML = '';
        const links = getLinks();

        links.forEach((link, index) => {
            const tile = document.createElement('a');
            tile.href = link.url;
            tile.target = '_blank';
            tile.className = 'quick-access-tile';

            const iconSrc = link.icon || getFaviconUrl(link.url);

            tile.innerHTML = `
                <img src="${iconSrc}" class="tile-icon" alt="${link.title} icon" onerror="this.onerror=null; this.src='https://placehold.co/30x30/FFFFFF/333333?text=${link.title.charAt(0)}';">
                <span>${link.title}</span>
                <button class="delete-tile" data-index="${index}">&times;</button>
            `;
            quickAccessGrid.appendChild(tile);
        });

        document.querySelectorAll('.delete-tile').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteLink(parseInt(e.target.dataset.index));
            });
        });
    };

    addLinkButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        addLinkForm.reset();
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            addLinkForm.reset();
        }
    });

    addLinkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('link-title').value;
        let url = document.getElementById('link-url').value;
        const icon = document.getElementById('link-icon').value;

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }

        const newLink = { title, url, icon };
        const links = getLinks();
        links.push(newLink);
        saveLinks(links);
        renderLinks();

        modal.style.display = 'none';
        addLinkForm.reset();
    });

    const generalNotesList = document.getElementById('general-notes-list');
    const addGeneralNoteButton = document.getElementById('add-general-note');
    const newNoteTitleInput = document.getElementById('new-note-title');
    const newNoteTextInput = document.getElementById('new-note-text');

    const editGeneralNoteModal = document.getElementById('editGeneralNoteModal');
    const closeEditGeneralNoteModalButton = document.getElementById('closeEditGeneralNoteModal');
    const editGeneralNoteForm = document.getElementById('edit-general-note-form');
    const editNoteIdInput = document.getElementById('edit-note-id');
    const editNoteTitleInput = document.getElementById('edit-note-title');
    const editNoteTextInput = document.getElementById('edit-note-text');

    const getGeneralNotes = () => {
        const notes = localStorage.getItem('generalNotes');
        return notes ? JSON.parse(notes) : [];
    };

    const saveGeneralNotes = (notes) => {
        localStorage.setItem('generalNotes', JSON.stringify(notes));
    };

    const openEditModal = (id) => {
        const notes = getGeneralNotes();
        const note = notes.find(n => n.id === id);

        if (note) {
            editNoteIdInput.value = note.id;
            editNoteTitleInput.value = note.title;
            editNoteTextInput.value = note.text;
            editGeneralNoteModal.style.display = 'flex';
        }
    };

    const renderGeneralNotes = () => {
        generalNotesList.innerHTML = '';
        const notes = getGeneralNotes();

        if (notes.length === 0) {
            generalNotesList.innerHTML = '<p style="text-align: center; color: var(--secondary-color);">یادداشت عمومی وجود ندارد.</p>';
            return;
        }

        notes.reverse().forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item panel';
            noteElement.style.marginBottom = '10px';

            const shortText = note.text.length > 100 ? note.text.substring(0, 100) + '...' : note.text;

            noteElement.innerHTML = `
                <h4>${note.title}</h4>
                <p>${shortText}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <small style="color: var(--secondary-color);">${new Date(note.date).toLocaleDateString('fa-IR')}</small>
                    <div>
                        <button class="edit-general-note-button" data-id="${note.id}" style="background: none; color: #1e88e5; border: none; cursor: pointer; padding: 0; margin-left: 10px;">ویرایش</button>
                        <button class="delete-general-note-button" data-id="${note.id}" style="background: none; color: var(--primary-color); border: none; cursor: pointer; padding: 0;">حذف</button>
                    </div>
                </div>
            `;
            generalNotesList.appendChild(noteElement);
        });

        document.querySelectorAll('.delete-general-note-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const noteId = parseInt(e.target.dataset.id);
                deleteGeneralNote(noteId);
            });
        });

        document.querySelectorAll('.edit-general-note-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const noteId = parseInt(e.target.dataset.id);
                openEditModal(noteId);
            });
        });
    };

    const addGeneralNote = () => {
        const title = newNoteTitleInput.value.trim();
        const text = newNoteTextInput.value.trim();

        if (!title || !text) {
            customAlert('عنوان و متن یادداشت نمی‌توانند خالی باشند.');
            return;
        }

        const newNote = {
            id: Date.now(),
            title: title,
            text: text,
            date: new Date().toISOString()
        };

        const notes = getGeneralNotes();
        notes.push(newNote);
        saveGeneralNotes(notes);

        newNoteTitleInput.value = '';
        newNoteTextInput.value = '';
        renderGeneralNotes();
    };

    const deleteGeneralNote = (id) => {
        if (!customConfirm('آیا مطمئن هستید که می‌خواهید این یادداشت را حذف کنید؟')) return;

        let notes = getGeneralNotes();
        notes = notes.filter(note => note.id !== id);
        saveGeneralNotes(notes);
        renderGeneralNotes();
    };

    addGeneralNoteButton.addEventListener('click', addGeneralNote);

    editGeneralNoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(editNoteIdInput.value);
        const title = editNoteTitleInput.value.trim();
        const text = editNoteTextInput.value.trim();

        if (!title || !text) {
            customAlert('عنوان و متن یادداشت نمی‌توانند خالی باشند.');
            return;
        }

        let notes = getGeneralNotes();
        const index = notes.findIndex(n => n.id === id);

        if (index !== -1) {
            notes[index].title = title;
            notes[index].text = text;
            saveGeneralNotes(notes);
            renderGeneralNotes();
            editGeneralNoteModal.style.display = 'none';
            editGeneralNoteForm.reset();
        }
    });

    closeEditGeneralNoteModalButton.addEventListener('click', () => {
        editGeneralNoteModal.style.display = 'none';
        editGeneralNoteForm.reset();
    });

    window.addEventListener('click', (event) => {
        if (event.target == editGeneralNoteModal) {
            editGeneralNoteModal.style.display = 'none';
            editGeneralNoteForm.reset();
        }
    });

    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('month-year-display');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const todayButton = document.getElementById('today-button');
    const dailyNoteModal = document.getElementById('dailyNoteModal');
    const closeDailyNoteModalButton = document.getElementById('closeDailyNoteModal');
    const dailyNoteDateTitle = document.getElementById('dailyNoteDateTitle');
    const dailyNotesListView = document.getElementById('daily-notes-list-view');
    const addDailyNoteForm = document.getElementById('add-daily-note-form');
    const dailyNoteTitleInput = document.getElementById('daily-note-title');
    const dailyNoteTextInput = document.getElementById('daily-note-text');
    const calendarTypeTitle = document.getElementById('calendar-type-title');
    const toggleCalendarButton = document.getElementById('toggle-calendar-button');

    let current_date = new Date();
    const today = new Date();
    let selectedDate = null;
    let isSolar = false;

    const gregorianMonthNames = [
        'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
        'ژوئیه', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
    ];
    const solarMonthNames = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];

    const toPersianDigits = (num) => {
        const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(num).replace(/[0-9]/g, (digit) => persian[digit]);
    };

    const getDailyNotes = () => {
        const notes = localStorage.getItem('dailyNotes');
        return notes ? JSON.parse(notes) : {};
    };



    const saveDailyNotes = (notes) => {
        localStorage.setItem('dailyNotes', JSON.stringify(notes));
    };

    const getFormattedDate = (date, isSolar) => {
        const calendarType = isSolar ? 'persian' : 'gregory';
        const options = { day: 'numeric', month: 'long', year: 'numeric', calendar: calendarType };
        return new Intl.DateTimeFormat('fa-IR', options).format(date);
    };

    const getJalaliDateParts = (date) => {
        const jalaliDateString = new Intl.DateTimeFormat('fa-IR', {
            calendar: 'persian',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);

        const englishDigitsString = jalaliDateString.replace(/[\u06F0-\u06F9]/g, function (match) {
            return String.fromCharCode(match.charCodeAt(0) - 0x06F0 + 0x30);
        });

        const parts = englishDigitsString.split('/');

        if (parts.length === 3) {
            return {
                day: parseInt(parts[2]),
                month: parseInt(parts[1]),
                year: parseInt(parts[0])
            };
        }

        return { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() };
    };

    const isJalaliLeapYear = (jYear) => {
        const mod = jYear % 33;
        return mod === 1 || mod === 5 || mod === 9 || mod === 13 || mod === 17 || mod === 22 || mod === 26 || mod === 30;
    };

    const getJalaliDaysInMonth = (jYear, jMonth) => {
        if (jMonth >= 1 && jMonth <= 6) return 31;
        if (jMonth >= 7 && jMonth <= 11) return 30;
        if (jMonth === 12) return isJalaliLeapYear(jYear) ? 30 : 29;
        return 0;
    };


    const renderCalendar = () => {
        calendarGrid.innerHTML = '';

        const daysOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

        daysOfWeek.forEach(day => {
            const dayNameElement = document.createElement('div');
            dayNameElement.className = 'day-name';
            dayNameElement.textContent = day;
            calendarGrid.appendChild(dayNameElement);
        });

        const dailyNotes = getDailyNotes();

        let targetDate = new Date(current_date);
        let daysInMonth = 0;
        let targetMonthName = '';
        let targetYear = '';
        let startPosition = 0;

        if (isSolar) {
            const { year: jYear, month: jMonth } = getJalaliDateParts(targetDate);
            targetMonthName = solarMonthNames[jMonth - 1];
            targetYear = jYear;
            daysInMonth = getJalaliDaysInMonth(jYear, jMonth);

            calendarTypeTitle.textContent = 'تقویم شمسی';
            toggleCalendarButton.textContent = 'تغییر به میلادی';

            let firstDayOfMonth = new Date(targetDate);
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - (getJalaliDateParts(firstDayOfMonth).day - 1));

            let startDayOfWeek = firstDayOfMonth.getDay();
            startPosition = (startDayOfWeek === 6) ? 0 : startDayOfWeek + 1;

        } else {
            targetMonthName = gregorianMonthNames[targetDate.getMonth()];
            targetYear = targetDate.getFullYear();
            daysInMonth = new Date(targetYear, targetDate.getMonth() + 1, 0).getDate();

            calendarTypeTitle.textContent = 'تقویم میلادی';
            toggleCalendarButton.textContent = 'تغییر به شمسی';

            const firstDayOfMonth = new Date(targetYear, targetDate.getMonth(), 1);
            startPosition = (firstDayOfMonth.getDay() === 6) ? 0 : firstDayOfMonth.getDay() + 1;
        }

        monthYearDisplay.textContent = `${toPersianDigits(targetYear)} ${targetMonthName}`;

        for (let i = 0; i < startPosition; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty-day';
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let dayElement = document.createElement('div');
            dayElement.className = 'calendar-day current-month';

            dayElement.textContent = isSolar ? toPersianDigits(day) : day;

            let gregorianDateString;
            let dateObj;

            if (isSolar) {
                let tempDate = new Date(targetDate);
                tempDate.setDate(tempDate.getDate() - (getJalaliDateParts(tempDate).day - 1));
                tempDate.setDate(tempDate.getDate() + (day - 1));

                dateObj = tempDate;
                gregorianDateString = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;

            } else {
                dateObj = new Date(targetYear, targetDate.getMonth(), day);
                gregorianDateString = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
            }

            dayElement.dataset.date = gregorianDateString;

            if (dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth() === today.getMonth() && dateObj.getDate() === today.getDate()) {
                dayElement.classList.add('today');
            }

            if (dailyNotes[gregorianDateString] && dailyNotes[gregorianDateString].length > 0) {
                const indicator = document.createElement('span');
                indicator.className = 'note-indicator';
                dayElement.appendChild(indicator);
            }

            calendarGrid.appendChild(dayElement);
        }
    };

    const changeMonth = (delta) => {
        if (isSolar) {
            let targetJMonth = getJalaliDateParts(current_date).month + delta;

            if (targetJMonth < 1) {
                current_date.setFullYear(current_date.getFullYear() - 1);
                current_date.setMonth(11);
                current_date.setDate(15);
            } else if (targetJMonth > 12) {
                current_date.setFullYear(current_date.getFullYear() + 1);
                current_date.setMonth(0);
                current_date.setDate(15);
            } else {
                current_date.setMonth(current_date.getMonth() + delta);
            }

            current_date.setDate(current_date.getDate() - (getJalaliDateParts(current_date).day - 1));

        } else {
            current_date.setMonth(current_date.getMonth() + delta);
        }
        renderCalendar();
    };

    const goToToday = () => {
        current_date = new Date();
        renderCalendar();
    };

    toggleCalendarButton.addEventListener('click', () => {
        isSolar = !isSolar;
        current_date = new Date();

        renderCalendar();
    });

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));
    todayButton.addEventListener('click', goToToday);

    const renderDailyNotesList = (dateString) => {
        dailyNotesListView.innerHTML = '';
        const allNotes = getDailyNotes();
        const notesForDay = allNotes[dateString] || [];

        if (notesForDay.length === 0) {
            dailyNotesListView.innerHTML = '<p style="text-align: center; color: var(--secondary-color);">یادداشتی برای این روز وجود ندارد.</p>';
            return;
        }

        notesForDay.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item panel';
            noteElement.style.marginBottom = '10px';
            noteElement.style.position = 'relative';

            noteElement.innerHTML = `
                <h4>${note.title} <small style="float: left; color: var(--secondary-color);">${note.time}</small></h4>
                <p>${note.text}</p>
                <button class="delete-daily-note-button" data-id="${note.id}" style="background: none; color: var(--primary-color); border: none; cursor: pointer; padding: 0; margin-top: 10px;">حذف</button>
            `;
            dailyNotesListView.appendChild(noteElement);
        });

        document.querySelectorAll('.delete-daily-note-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const noteId = parseInt(e.target.dataset.id);
                deleteDailyNote(dateString, noteId);
            });
        });
    };

    const deleteDailyNote = (dateString, id) => {
        if (!customConfirm('آیا مطمئن هستید که می‌خواهید این یادداشت را حذف کنید؟')) return;

        let allNotes = getDailyNotes();
        if (allNotes[dateString]) {
            allNotes[dateString] = allNotes[dateString].filter(note => note.id !== id);
            if (allNotes[dateString].length === 0) {
                delete allNotes[dateString];
            }
            saveDailyNotes(allNotes);
            renderDailyNotesList(selectedDate);
            renderCalendar();
        }
    };

    const handleDayClick = (e) => {
        const dayElement = e.target.closest('.calendar-day');
        if (!dayElement || dayElement.classList.contains('empty-day')) return;

        selectedDate = dayElement.dataset.date;

        const [y, m, d] = selectedDate.split('-');
        const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));

        const formattedDate = getFormattedDate(dateObj, isSolar);

        dailyNoteDateTitle.textContent = `یادداشت‌های روز ${formattedDate}`;

        renderDailyNotesList(selectedDate);
        dailyNoteModal.style.display = 'flex';
    };

    calendarGrid.addEventListener('click', handleDayClick);

    closeDailyNoteModalButton.addEventListener('click', () => {
        dailyNoteModal.style.display = 'none';
        addDailyNoteForm.reset();
        selectedDate = null;
    });

    window.addEventListener('click', (event) => {
        if (event.target == dailyNoteModal) {
            dailyNoteModal.style.display = 'none';
            addDailyNoteForm.reset();
            selectedDate = null;
        }
    });

    addDailyNoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = dailyNoteTitleInput.value.trim();
        const text = dailyNoteTextInput.value.trim();

        if (!title || !text || !selectedDate) {
            customAlert('عنوان و متن یادداشت نمی‌توانند خالی باشند.');
            return;
        }

        const newNote = {
            id: Date.now(),
            title: title,
            text: text,
            time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        };

        const allNotes = getDailyNotes();
        if (!allNotes[selectedDate]) {
            allNotes[selectedDate] = [];
        }
        allNotes[selectedDate].push(newNote);
        saveDailyNotes(allNotes);

        dailyNoteTitleInput.value = '';
        dailyNoteTextInput.value = '';

        renderDailyNotesList(selectedDate);
        renderCalendar();
    });

    renderLinks();
    renderGeneralNotes();
    renderCalendar();

    const showAllDailyNotesButton = document.getElementById('show-all-daily-notes');

    showAllDailyNotesButton.addEventListener('click', () => {
        const allNotes = getDailyNotes();
        const allNoteKeys = Object.keys(allNotes);

        allNoteKeys.sort((a, b) => new Date(b) - new Date(a));

        dailyNoteDateTitle.textContent = 'همه یادداشت‌های تقویم';
        dailyNotesListView.innerHTML = '';

        if (allNoteKeys.length === 0) {
            dailyNotesListView.innerHTML = '<p style="text-align: center; color: var(--secondary-color);">هیچ یادداشتی در تقویم وجود ندارد.</p>';
            dailyNoteModal.style.display = 'flex';
            return;
        }

        allNoteKeys.forEach(dateString => {
            const notesForDay = allNotes[dateString];
            if (!notesForDay || notesForDay.length === 0) return;

            const [y, m, d] = dateString.split('-');
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            const formattedDate = getFormattedDate(dateObj, isSolar);

            const dateHeader = document.createElement('h4');
            dateHeader.textContent = formattedDate;
            dateHeader.style.borderBottom = '1px solid var(--border-color)';
            dateHeader.style.paddingBottom = '5px';
            dateHeader.style.marginTop = '15px';
            dailyNotesListView.appendChild(dateHeader);

            notesForDay.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = 'note-item panel';
                noteElement.style.marginBottom = '10px';
                noteElement.style.position = 'relative';

                noteElement.innerHTML = `
                    <h4>${note.title} <small style="float: left; color: var(--secondary-color);">${note.time}</small></h4>
                    <p>${note.text}</p>
                    <button class="delete-daily-note-button" data-id="${note.id}" data-datestring="${dateString}" style="background: none; color: var(--primary-color); border: none; cursor: pointer; padding: 0; margin-top: 10px;">حذف</button>
                `;
                dailyNotesListView.appendChild(noteElement);
            });
        });

        document.querySelectorAll('.delete-daily-note-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const noteId = parseInt(e.target.dataset.id);
                const dateString = e.target.dataset.datestring;

                if (!customConfirm('آیا مطمئن هستید که می‌خواهید این یادداشت را حذف کنید؟')) return;

                let allNotes = getDailyNotes();
                if (allNotes[dateString]) {
                    allNotes[dateString] = allNotes[dateString].filter(note => note.id !== noteId);
                    if (allNotes[dateString].length === 0) {
                        delete allNotes[dateString];
                    }
                    saveDailyNotes(allNotes);

                    showAllDailyNotesButton.click();

                    renderCalendar();
                }
            });
        });

        dailyNoteModal.style.display = 'flex';
    });
});