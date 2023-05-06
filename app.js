// როუტების განსაზღვრა
const routes = [
    { path: '/', templateId: 'home-template' },
    { path: '/about', templateId: 'about-template' },
    { path: '/contact', templateId: 'contact-template' },
    { path: '*', templateId: 'home-template' }, // default route
];

// ფუნქცია, რომელიც როუტის ჩატვირთვის მიხედვით აჩვენებს შაბლონს
function renderTemplate() {
    const { pathname } = window.location;
    const route = routes.find(route => route.path === pathname) || routes.find(route => route.path === '*');

    const template = document.getElementById(route.templateId);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));
}

// ფუნქცია, რომელიც ინახავს ისტორიაში როუტის შევლის მომენტს
function handleHistoryChange() {
    renderTemplate();
}

// ფუნქცია, რომელიც არჩევს კონკრტულ როუტზე გადასვლას
function navigateTo(path) {
    window.history.pushState({}, '', path);
    handleHistoryChange();
}

// ლინკის ცვლილების დაფიქსირება ევენთ ლისთენერით
window.addEventListener('popstate', handleHistoryChange);
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        navigateTo(event.target.getAttribute('href'));
    }
});

// ინიციალიზაცია
renderTemplate();

