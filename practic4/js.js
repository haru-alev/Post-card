const STORAGE_KEY = 'my_postcards_history';

    const THEME_STAMPS = {
        min:       ['./fot/min.jpg'],
        minecraft: ['./fot/cat.jpg', './fot/creeper.png'],
        sea:       ['./fot/hcaik.jpg'],
        pink:      ['./fot/roze.png'],
        dark:      ['./fot/moon.jpg']
    };


    const THEME_DECO = {

        min: [
            ['✗', 56, 56, 14],  ['✗', 140, 56, 14], ['✗', 224, 56, 14],
            ['✗', 56, 140, 14], ['✗', 140, 140, 14], ['✗', 224, 140, 14],
            ['✗', 56, 224, 14], ['✗', 140, 224, 14], ['✗', 224, 224, 14],
            ['✗', 56, 448, 14], ['✗', 140, 448, 14], ['✗', 224, 448, 14],
            ['✗', 308, 448, 14], ['✗', 56, 532, 14], ['✗', 140, 532, 14],
            ['✗', 224, 532, 14], ['✗', 308, 532, 14], ['✗', 392, 532, 14],
            ['✗', 308, 56, 14], ['✗', 392, 140, 14], ['✗', 392, 224, 14],
            ['✗', 56, 308, 14], ['✗', 140, 308, 14], ['✗', 392, 308, 14],
            ['✗', 308, 308, 14]
        ],
   
        minecraft: [
            ['✦', 30, 50, 20],  ['⛏', 90, 70, 22],  ['⚔', 160, 40, 20],
            ['♥', 40, 150, 20], ['✦', 130, 130, 18], ['⛏', 60, 230, 22],
            ['♥', 200, 200, 18], ['⚔', 240, 100, 18], ['✦', 250, 260, 20],
            ['⛏', 30, 380, 20], ['♥', 90, 430, 22], ['⚔', 170, 410, 18],
            ['✦', 260, 430, 20], ['⛏', 330, 420, 22], ['♥', 40, 500, 20],
            ['⚔', 120, 540, 20], ['✦', 220, 540, 18], ['⛏', 310, 520, 20],
            ['♥', 370, 490, 20], ['⚔', 350, 580, 18]
        ],
    
        sea: [
            ['𓅭', 40, 40, 26], ['𓅭', 130, 30, 24], ['𓅭', 230, 50, 26],
            ['✧', 90, 80, 18], ['☼', 330, 40, 24], ['✧', 180, 90, 18],
            ['𓅭', 60, 130, 22], ['✧', 260, 130, 18], ['𓅭', 150, 160, 22],
            ['𓆝', 30, 440, 26], ['𓆟', 100, 460, 26], ['≋', 180, 440, 24],
            ['𓆝', 250, 460, 26], ['𓆟', 60, 510, 24], ['≋', 140, 530, 22],
            ['𓆝', 220, 510, 24], ['𓆟', 300, 540, 24], ['≋', 360, 460, 22],
            ['𓆝', 340, 580, 22], ['𓆟', 80, 590, 22]
        ],
      
        pink: [
            ['✿', 30, 50, 26],  ['❀', 130, 40, 24],  ['✽', 230, 60, 22],
            ['✻', 330, 90, 24], ['⚘', 50, 150, 22],  ['𓇬', 180, 140, 24],
            ['✿', 280, 180, 22], ['❀', 60, 380, 22], ['✽', 130, 420, 24],
            ['✻', 230, 400, 26], ['⚘', 320, 380, 22], ['𓇬', 50, 470, 24],
            ['✿', 130, 500, 22], ['❀', 240, 480, 24], ['✽', 320, 510, 22],
            ['✻', 60, 560, 24], ['⚘', 170, 580, 22], ['𓇬', 290, 560, 24],
            ['✿', 380, 480, 22], ['❀', 30, 250, 22]
        ],

        dark: [
            ['☾', 320, 60, 30],  ['☽', 40, 50, 24],   ['☆', 120, 80, 20],
            ['✧', 200, 60, 18],  ['✰', 240, 110, 22], ['⚝', 70, 180, 20],
            ['☆', 300, 200, 22], ['✧', 160, 230, 18], ['✰', 40, 300, 20],
            ['⚝', 340, 340, 22], ['☆', 80, 400, 20],  ['✧', 200, 420, 18],
            ['✰', 300, 430, 22], ['⚝', 50, 480, 20],  ['☆', 130, 500, 22],
            ['✧', 250, 490, 18], ['✰', 340, 550, 20], ['⚝', 90, 570, 22],
            ['☆', 210, 560, 20], ['✧', 300, 590, 18]
        ]
    };

    function renderDeco(container, theme) {
        container.innerHTML = '';
        const items = THEME_DECO[theme] || [];
        items.forEach(([emoji, x, y, size]) => {
            const el = document.createElement('div');
            el.className = 'deco';
            el.textContent = emoji;
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.fontSize = size + 'px';
            container.appendChild(el);
        });
    }

    const form = document.getElementById('postcardForm');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const messageInput = document.getElementById('message');
    const themeSelect = document.getElementById('theme-select');
    const sendBtn = document.getElementById('sendBtn');
    const historyContainer = document.getElementById('historyContainer');

    const previewCard = document.getElementById('previewCard');
    const previewDeco = document.getElementById('previewDeco');
    const previewStamps = document.getElementById('previewStamps');
    const previewFrom = document.getElementById('previewFrom');
    const previewTo = document.getElementById('previewTo');
    const previewMessage = document.getElementById('previewMessage');

    const ALL_THEMES = ['theme-min', 'theme-minecraft', 'theme-sea', 'theme-pink', 'theme-dark'];

    function updatePreview() {
        const theme = themeSelect.value;
        ALL_THEMES.forEach(t => previewCard.classList.remove(t));
        previewCard.classList.add('theme-' + theme);

        renderDeco(previewDeco, theme);

        const stamps = THEME_STAMPS[theme] || [];
        previewStamps.innerHTML = stamps.map(src => `
            <div class="pc-stamp"><img src="${src}" alt="stamp"></div>
        `).join('');

        previewFrom.textContent = fromInput.value.trim() || '—';
        previewTo.textContent = toInput.value.trim() || '—';

        const txt = messageInput.value.trim();
        if (txt === '') {
            previewMessage.textContent = 'Здесь появится ваш текст...';
            previewMessage.classList.add('placeholder');
        } else {
            previewMessage.textContent = txt;
            previewMessage.classList.remove('placeholder');
        }
    }

    function checkInputs() {
        const ok = fromInput.value.trim() !== ''
                && toInput.value.trim() !== ''
                && messageInput.value.trim() !== '';
        sendBtn.disabled = !ok;
        updatePreview();
    }

    fromInput.addEventListener('input', checkInputs);
    toInput.addEventListener('input', checkInputs);
    messageInput.addEventListener('input', checkInputs);
    themeSelect.addEventListener('change', checkInputs);

    function loadHistory() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
        catch (e) { return []; }
    }
    function saveHistory(h) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderCard(data, prepend = false) {
        const card = document.createElement('div');
        card.className = `postcard small theme-${data.theme}`;

        const stamps = THEME_STAMPS[data.theme] || [];
        const stampsHtml = stamps.map(src => `
            <div class="pc-stamp"><img src="${src}" alt="stamp"></div>
        `).join('');

        card.innerHTML = `
            <div class="deco-wrap"></div>
            <div class="pc-stamps">${stampsHtml}</div>
            <div class="pc-title">Post<br>Card</div>
            <div class="pc-fields">
                <div class="pc-field">
                    <span class="lbl">From:</span>
                    <span class="val">${escapeHtml(data.from)}</span>
                </div>
                <div class="pc-field">
                    <span class="lbl">To:</span>
                    <span class="val">${escapeHtml(data.to)}</span>
                </div>
            </div>
            <div class="pc-message">
                <div class="pc-message-text">${escapeHtml(data.message)}</div>
            </div>
        `;

        renderDeco(card.querySelector('.deco-wrap'), data.theme);

        if (prepend) historyContainer.prepend(card);
        else historyContainer.appendChild(card);
    }

    function renderAllHistory() {
        const history = loadHistory();
        historyContainer.innerHTML = '';
        if (history.length === 0) {
            historyContainer.innerHTML = '<p class="empty-msg">Здесь появятся ваши открытки...</p>';
            return;
        }
        history.forEach(item => renderCard(item, false));
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newCard = {
            from: fromInput.value.trim(),
            to: toInput.value.trim(),
            message: messageInput.value.trim(),
            theme: themeSelect.value
        };

        const history = loadHistory();
        history.push(newCard);
        saveHistory(history);

        const empty = historyContainer.querySelector('.empty-msg');
        if (empty) empty.remove();

        renderCard(newCard, true);

        form.reset();
        checkInputs();
    });

    window.addEventListener('DOMContentLoaded', () => {
        renderAllHistory();
        updatePreview();
    });