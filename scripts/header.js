
const staticHeader = `
<a class="centered-link is-active" href="index.html">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="">
    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
    <polygon points="12 15 17 21 7 21 12 15"></polygon>
    </svg>
    <span>Torneo Arena 2023</span>
</a>
<a class="centered-link is-active" href="duoQChallenge.html">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="">
    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
    <polygon points="12 15 17 21 7 21 12 15"></polygon>
    </svg>
    <span>DuoQ Challenge 2023</span>
</a>
<a class="centered-link is-active" href="soloQChallenge.html">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="">
    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
    <polygon points="12 15 17 21 7 21 12 15"></polygon>
    </svg>
    <span>soloQ Challenge 2022</span>
</a>
<a class="centered-link is-active" href="tournament.html">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="">
    <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
    <polygon points="12 15 17 21 7 21 12 15"></polygon>
    </svg>
    <span>Torneo 1vs1</span>
</a>`;

const staticFooter = `
<span style="color:#a2a5b9"> DiscordQChallenges. Todos los derechos reservados.</span>
`;

function getHeader() {
	return staticHeader;
}

function getFooter() {
    return staticFooter;
}

export function setHeader() {
    $("#webapp-navbar-menu").html(getHeader());
    $("#webapp-footer").html(getFooter());
}